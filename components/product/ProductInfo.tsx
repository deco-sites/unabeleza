import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import ShippingSimulationForm from "../shipping/Form.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import AddQuantityToCart from "./AddQuantityToCart.tsx";
import ReviewRating from "./ReviewRating.tsx";
import Share, { ShareProps } from "../ui/Share.tsx";
import { useDevice } from "@deco/deco/hooks";
import Modal from "../../islands/Modal.tsx";
import PaymentMethods from "./PaymentMethods.tsx";

interface Props {
  page: ProductDetailsPage | null;
  itemsShare: ShareProps
}

function ProductInfo({ page, itemsShare }: Props) {
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf, aggregateRating } = product;
  const title = isVariantOf?.name ?? product.name;

  const priceSpecification = offers?.offers[0].priceSpecification

  const {
    price = 0,
    listPrice,
    installments,
    seller = "1",
    availability
  } = useOffer(offers);

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [item],
      },
    },
  });

  //Checks if the variant name is "title"/"default title" and if so, the SKU Selector div doesn't render
  const hasValidVariants = isVariantOf?.hasVariant?.some(
    (variant) =>
      variant?.name?.toLowerCase() !== "title" &&
      variant?.name?.toLowerCase() !== "default title",
  ) ?? false;

  const device = useDevice();

  return (
    <div class={clx("flex desktop:gap-[52px]")}>
      <div {...viewItemEvent} class="flex flex-col gap-6 desktop:max-w-[38.75vw] mobile:w-full" id={id}>

        {/* Product Name */}
        <span class={clx("text-2xl font-bold")}>
          {title}
        </span>

        <div class="space-y-[7px]">
          <span class={clx("text-xs text-[#252429]")}>
            REF: {productID}
          </span>
          <ReviewRating reviewCount={aggregateRating?.reviewCount} ratingValue={aggregateRating?.ratingValue} />
        </div>


        {/* Prices */}
        <div class="flex flex-col gap-1">
          <div class="flex gap-2.5 items-center">
            {listPrice && (
              <span class="line-through text-base text-black">
                {formatPrice(listPrice, offers?.priceCurrency)}
              </span>
            )}
            <span class="text-xl font-bold text-secondary">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>

          {installments && (
            <span class="text-xs font-semibold texy-black">
              Até {installments}
            </span>
          )}

          <Modal title="Opções de pagamento" cta="Formas de pagamento">
            <PaymentMethods methods={priceSpecification} />
          </Modal>
        </div>

        {/* Sku Selector */}
        {hasValidVariants && (
          <div className="desktop:mt-4 sm:mt-8">
            <ProductSelector product={product} />
          </div>
        )}

        {/* Add to Cart and Favorites button */}
        <div class="desktop:mt-4 mobile:fixed mobile:bottom-0 mobile:left-0 mobile:w-screen mobile:z-50">
          {availability === "https://schema.org/InStock"
            ? (
              <AddQuantityToCart item={item} seller={seller} product={product} disabled={false} />
            )
            : <OutOfStock productID={productID} />}
        </div>

        {/* Shipping Simulation */}
        <div class="desktop:mt-8">
          <ShippingSimulationForm
            items={[{ id: Number(product.sku), quantity: 1, seller: seller }]}
          />
        </div>

      </div>
      {
        device === "desktop" && (
          <div class="space-y-3">
            <WishlistButton item={item} stroke="#707070" typeTwo={true} />
            <Share {...itemsShare} />
          </div>
        )
      }
    </div>
  );
}

export default ProductInfo;
