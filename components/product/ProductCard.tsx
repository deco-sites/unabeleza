import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
// import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
// import { Ring } from "./ProductVariantSelector.tsx";
// import { useId } from "../../sdk/useId.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
}

const WIDTH = 290.66;
const HEIGHT = 293.13;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  class: _class,
}: Props) {
  // const id = useId();

  const { url, image: images, offers, isVariantOf } = product;
  // const hasVariant = isVariantOf?.hasVariant ?? [];
  const title = isVariantOf?.name ?? product.name;
  const [front, back] = images ?? [];

  const { listPrice, price, seller = "1", availability, installments } = useOffer(offers);

  const inStock = availability === "https://schema.org/InStock";
  // const possibilities = useVariantPossibilities(hasVariant, product);
  // const firstSkuVariations = Object.entries(possibilities)?.[0];
  // const variants = Object.entries(firstSkuVariations?.[1] ?? {});
  const relativeUrl = relative(url);
  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  //Added it to check the variant name in the SKU Selector later, so it doesn't render the SKU to "shoes size" in the Product Card
  // const firstVariantName = firstSkuVariations?.[0]?.toLowerCase();
  // const shoeSizeVariant = "shoe size";

  if (!price || price <= 0) return null

  return (
    <div
      {...event}
      class={clx("card card-compact group text-sm px-[15px] py-4 mobile:px-2 mobile:py-[8.94px]", _class)}
    >
      <figure
        class={clx(
          "relative bg-base-200",
          "rounded border border-transparent",
        )}
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        {/* Product Images */}
        <a
          href={relativeUrl}
          aria-label="view product"
          class={clx(
            "absolute top-0 left-0",
            "grid grid-cols-1 grid-rows-1",
            "w-full",
            !inStock && "opacity-70",
          )}
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "object-cover",
              "rounded w-full",
              "col-span-full row-span-full",
              "group-hover:scale-125 transition-all duration-500"
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class={clx(
              "object-cover",
              "rounded w-full",
              "col-span-full row-span-full",
              "transition-opacity opacity-0 lg:group-hover:opacity-100",
            )}
            sizes="(max-width: 640px) 50vw, 20vw"
            loading="lazy"
            decoding="async"
          />
        </a>

        {/* Wishlist button */}
        <div class="absolute top-0 left-0 w-full flex items-center justify-between">
          {/* Notify Me */}
          <span
            class={clx(
              "text-sm/4 font-normal text-black bg-error bg-opacity-15 text-center rounded-badge px-2 py-1",
              inStock && "opacity-0",
            )}
          >
            Notify me
          </span>

          {/* Discounts */}
          <span
            class={clx(
              "text-sm/4 font-normal text-black bg-primary bg-opacity-15 text-center rounded-badge px-2 py-1",
              (percent < 1 || !inStock) && "opacity-0",
            )}
          >
            {percent} % off
          </span>
        </div>

        <div class="absolute top-[9.79px] right-[2.85px] mobile:top-[5.22px] mobile:right-[3.88px]">
          <WishlistButton item={item} variant="icon" />
        </div>
        <div class="absolute top-[10.29px] left-[8.81px] mobile:top-[7.72px] mobile:right-[3.88px]">
          <span class={clx(
            "font-bold text-xs text-black mobile:text-[10px] mobile:leading-[15px]",
            "bg-info max-w-[98px] max-h-[30px] px-[14px] py-[6px] rounded-full",
            "mobile:max-w-[86px] mobile:max-h-[27px] mobile:px-[14px] mobile:py-[6px]"
            )}>
            NOVIDADE
          </span>
        </div>
      </figure>

      <a href={relativeUrl} class="pt-5 gap-4">
        <span class="text-sm texy-black">
          {title}
        </span>

        <div class="flex gap-2 pt-2">
          {listPrice && (
            <span class="line-through font-normal text-gray-400">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
          )}
          <span class="font-bold text-black">
            {formatPrice(price, offers?.priceCurrency)}
          </span>
          {installments && (
            <span class="line-through font-normal text-gray-400">
              {installments}
            </span>
          )}
        </div>
      </a>

      {/* SKU Selector */}
      {/* {variants.length > 1 && firstVariantName !== shoeSizeVariant && (
        <ul class="flex items-center justify-start gap-2 pt-4 pb-1 pl-1 overflow-x-auto">
          {variants.map(([value, link]) => [value, relative(link)] as const)
            .map(([value, link]) => (
              <li>
                <a href={link} class="cursor-pointer">
                  <input
                    class="hidden peer"
                    type="radio"
                    name={`${id}-${firstSkuVariations?.[0]}`}
                    checked={link === relativeUrl}
                  />
                  <Ring value={value} checked={link === relativeUrl} />
                </a>
              </li>
            ))}
        </ul>
      )} */}

      <div class="flex-grow" />

      <div class="mt-4">
        {inStock
          ? (
            <AddToCartButton
              product={product}
              seller={seller}
              item={item}
              text="COMPRAR"
              class={clx(
                "btn btn-primary !bg-primary btn-outline justify-center items-center border-none px-10 py-3 w-full !text-black uppercase",
                "hover:!bg-[#C493EF] !min-h-0 mobile:h-8 font-bold rounded-[5px] text-sm mobile:text-xs mobile:py-0",
                "disabled:!bg-transparent disabled:!opacity-50 disabled:!text-primary",
              )}
            />
          )
          : (
            <a
              href={relativeUrl}
              class={clx(
                "btn",
                "btn-outline justify-start border-none !text-sm !font-medium px-0 no-animation w-full",
                "hover:!bg-transparent",
                "disabled:!bg-transparent disabled:!opacity-75",
                "btn-error hover:!text-error disabled:!text-error",
              )}
            >
              Sold out
            </a>
          )}
      </div>
    </div>
  );
}

export default ProductCard;
