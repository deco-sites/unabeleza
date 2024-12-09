import type { Product } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../../sdk/clx.ts";
import { formatPrice, formatInstallments } from "../../../sdk/format.ts";
import { useOffer } from "../../../sdk/useOffer.ts";
import { relative } from "../../../sdk/url.ts";

export interface Props {
  product: Product;
}

function SearchItem({ product }: Props) {
    const { url, image: images, offers, name } = product;
    const { listPrice, price, installments } = useOffer(offers);
    const relativeUrl = relative(url);
    const image = images ? images[0].url : undefined;
    const parcel = formatInstallments(installments)

  return (
    <fieldset
      class="grid grid-rows-1 gap-[10px] !h-[91px] max-h-[91px] relative"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
        <a
          href={relativeUrl}
          aria-label="view product"
          class={clx(
            "absolute inset-0",
            "grid grid-cols-1 grid-rows-1",
            "w-full"
          )}
        />

      <div class="w-[88px] h-[88px] border border-[#F1F1F1] rounded-sm flex justify-center items-center">
        <Image
                alt={name}
                src={image}
                style={{ aspectRatio: "4 / 4" }}
                width={80}
                height={80}
                class="h-full object-contain"
              />
      </div>
            

      {/* Info */}
      <div class="flex flex-col">
        {/* Name and Remove button */}
        <div class="flex gap-[22px] justify-between items-center max-h-[41px]">
          <legend class="h-[41px] w-full text-ellipsis overflow-hidden font-normal text-sm line-clamp-2 leading-5">
            {name}
          </legend>
        </div>

        {/* Price Block */}
        <div class="flex gap-[22px] justify-between">
          <div class="flex flex-col items-start w-[118px] justify-end">
            <span class="line-through text-xs text-[#999999]">
              {formatPrice(listPrice, offers?.priceCurrency)}
            </span>
            <span class="text-sm text-secondary font-bold text-base text-primary">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>

          {/* Quantity Selector */}
          <div class={clx(
            "w-[97px]",
          )}>
            {installments && (
            <span class="text-xs whitespace-nowrap">
              Ou <strong>{parcel.times}</strong> de <strong>{parcel.price}</strong>
            </span>
          )}
          </div>
        </div>
      </div>
    </fieldset>
  );
}
export default SearchItem;
