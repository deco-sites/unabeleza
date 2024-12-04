import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import Icon from "../ui/Icon.tsx";
import QuantitySelectorMinicart from "../ui/QuantitySelectorMinicart.tsx";
import { useScript } from "@deco/deco/hooks";
export type Item = AnalyticsItem & {
  listPrice: number;
  image: string;
};
export interface Props {
  item: Item;
  index: number;
  locale: string;
  currency: string;
}
const QUANTITY_MAX_VALUE = 100;
const removeItemHandler = () => {
  const itemID = (event?.currentTarget as HTMLButtonElement | null)
    ?.closest("fieldset")
    ?.getAttribute("data-item-id");
  if (typeof itemID === "string") {
    window.STOREFRONT.CART.setQuantity(itemID, 0);
  }
};
function CartItem({ item, index, locale, currency }: Props) {
  const { image, listPrice, price = Infinity, quantity } = item;
  const isGift = price < 0.01;
  // deno-lint-ignore no-explicit-any
  const name = (item as any).item_name;
  return (
    <fieldset
      // deno-lint-ignore no-explicit-any
      data-item-id={(item as any).item_id}
      class="grid grid-rows-1 gap-2 !h-[91px] max-h-[91px] pb-6 border-b border-[#F5F5F5]"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >

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
          <legend class="h-[41px] w-[118px] text-ellipsis overflow-hidden font-normal text-sm line-clamp-2 leading-5">
            {name}
          </legend>
          <button
            class={clx(
              isGift && "hidden",
              "btn btn-ghost btn-square no-animation w-[30px] h-[30px] min-h-0",
            )}
            hx-on:click={useScript(removeItemHandler)}
          >
            <Icon id="trash" size={18} />
          </button>
        </div>

        {/* Price Block */}
        <div class="flex gap-[22px] justify-between">
          <div class="flex flex-col items-start w-[118px]">
            <span class="line-through text-sm">
              {formatPrice(listPrice, currency, locale)}
            </span>
            <span class="text-sm text-secondary">
              {isGift ? "Grátis" : formatPrice(price, currency, locale)}
            </span>
          </div>

          {/* Quantity Selector */}
          <div class={clx(
            "w-[97px]",
            isGift && "hidden"
          )}>
            <QuantitySelectorMinicart
              min={0}
              max={QUANTITY_MAX_VALUE}
              value={quantity}
              name={`item::${index}`}
            />
          </div>
        </div>
      </div>
    </fieldset>
  );
}
export default CartItem;
