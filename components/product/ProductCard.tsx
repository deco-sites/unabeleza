import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import WishlistButton from "../../islands/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import ReviewRating from "./ReviewRating.tsx";
import { useDevice } from "@deco/deco/hooks";

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
  const { url, image: images, offers, isVariantOf, aggregateRating } = product;
  const title = isVariantOf?.name ?? product.name;
  const [front, back] = images ?? [];

  const { listPrice, price, seller = "1", availability, installments } =
    useOffer(offers);

  if (!price || price <= 0) return null;

  const inStock = availability === "https://schema.org/InStock";
  const relativeUrl = relative(url);

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */ }
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

  const device = useDevice();

  return (
    <div
      {...event}
      class={clx(
        "card card-compact group text-sm px-[15px] py-4 w-[var(--productCard-width)] h-fit",
        "mobile:px-2 mobile:py-[8.94px] mobile:w-[42.66vw]",
        _class,
      )}
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
              "group-hover:scale-125 transition-all duration-500",
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
        <div class="absolute top-[9.79px] right-[2.85px] mobile:top-[5.22px] mobile:right-[3.88px] z-30">
          <WishlistButton
            item={item}
            variant="icon"
            stroke="#BD87ED"
            device={device}
          />
        </div>
        <div class="absolute top-[10.29px] left-[8.81px] mobile:top-[7.72px] mobile:right-[3.88px]">
          <span
            class={clx(
              "font-bold text-xs text-black mobile:text-[10px] mobile:leading-[15px]",
              "bg-info max-w-[98px] max-h-[30px] px-[14px] py-[6px] rounded-full",
              "mobile:max-w-[86px] mobile:max-h-[27px] mobile:px-[14px] mobile:py-[6px]",
              inStock && "opacity-0",
            )}
          >
            NOVIDADE
          </span>
        </div>
      </figure>

      <a href={relativeUrl} class="flex flex-col pt-5 gap-[9px]">
        <ReviewRating
          ratingValue={aggregateRating?.ratingValue ?? 0}
          reviewCount={0}
        />

        <span class="text-sm texy-black h-[41px] line-clamp-2">
          {title}
        </span>

        <div class="flex flex-col gap-[6px]">
          <span class="text-sm text-gray-600 line-through">
            {price !== listPrice && (
              <p>De: {formatPrice(listPrice, offers?.priceCurrency)}</p>
            )}
          </span>

          <span class="font-bold text-base text-black">
            Por: {formatPrice(price, offers?.priceCurrency)}
          </span>
          {installments && (
            <span class="text-sm texy-black">
              Ou {installments.replace(".", ",")}
            </span>
          )}
        </div>
      </a>
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
              indisponível
            </a>
          )}
      </div>
    </div>
  );
}

export default ProductCard;
