import { AnalyticsItem } from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import Icon from "../ui/Icon.tsx";
import { useDevice, useScript } from "@deco/deco/hooks";
interface Props {
  variant?: "full" | "icon";
  item: AnalyticsItem;
  stroke: string
  fill?: string
  typeTwo?: boolean
}
const onLoad = (id: string, productID: string) =>
  window.STOREFRONT.WISHLIST.subscribe((sdk) => {
    const button = document.getElementById(id) as HTMLButtonElement;
    const inWishlist = sdk.inWishlist(productID);
    button.disabled = false;
    button.classList.remove("htmx-request");
    
    const svg = button.querySelector("svg");

    inWishlist 
    ? svg.classList.add("text-[#8F2AED]") 
    : svg.classList.remove("text-[#8F2AED]") 

    console.log(inWishlist)
    console.log(productID)
    const span = button.querySelector("span");
    if (span) {
      span.innerHTML = inWishlist ? "Remove from wishlist" : "Add to wishlist";
    }
  });
const onClick = (productID: string, productGroupID: string) => {
  const button = event?.currentTarget as HTMLButtonElement;
  const user = window.STOREFRONT.USER.getUser();
  if (user?.email) {
    button.classList.add("htmx-request");
    window.STOREFRONT.WISHLIST.toggle(productID, productGroupID);
  } else {
    window.alert(`Please login to add the product to your wishlist`);
  }
};
function WishlistButton({ item, stroke, fill, typeTwo }: Props) {
  // deno-lint-ignore no-explicit-any
  const productID = (item as any).item_id;
  const productGroupID = item.item_group_id.toString() ?? "";
  const id = useId();
  const device = useDevice();
  const addToWishlistEvent = useSendEvent({
    on: "click",
    event: {
      name: "add_to_wishlist",
      params: { items: [item] },
    },
  });
  return (
    <>
      <button
        id={id}
        data-wishlist-button
        disabled
        {...addToWishlistEvent}
        aria-label="Add to wishlist"
        hx-on:click={useScript(onClick, productID, productGroupID)}
        class={clx(
          "btn btn-circle no-animation w-[49px] h-[49px] mobile:w-8 mobile:h-8",
           `btn-ghost btn-sm hover:bg-info`,
           fill ? `text-[${fill}]` : "text-transparent",
           typeTwo ? "shadow-custom-2" : "border border-[#E3EBED]"
        )}
      >
            <Icon
              id="favorite"
              class="[.htmx-request_&]:hidden"
              width={device === "desktop" ? 26 : 17}
              height={device === "desktop" ? 23 : 15}
              stroke={stroke}
            />
        <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
      </button>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id, productGroupID) }}
      />
    </>
  );
}
export default WishlistButton;
