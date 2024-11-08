import { AnalyticsItem, Product } from "apps/commerce/types.ts";
import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";
import { useScript } from "@deco/deco/hooks";
export interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  product: Product;
  seller: string;
  item: AnalyticsItem;
  text?: string;
  quantityButton?: boolean;
}
const onClick = () => {
  const button = event?.currentTarget as HTMLButtonElement | null;
  const container = button!.closest<HTMLDivElement>("div[data-cart-item]")!;
  const { item, platformProps } = JSON.parse(
    decodeURIComponent(container.getAttribute("data-cart-item")!),
  );
  const input = document.querySelector('#quantitySelectorItems') as HTMLInputElement;
  const quantity = Number(input.value ? input.value : 1)
  platformProps.quantity = quantity;
  window.STOREFRONT.CART.addToCart(item, platformProps);
};

// Copy cart form values into AddToCartButton
const onLoad = (id: string) => {
  window.STOREFRONT.CART.subscribe((sdk) => {
    const container = document.getElementById(id);
    const checkbox = container?.querySelector<HTMLInputElement>(
      'input[type="checkbox"]',
    );
    const input = container?.querySelector<HTMLInputElement>(
      'input[type="number"]',
    );
    const itemID = container?.getAttribute("data-item-id")!;
    const quantity = sdk.getQuantity(itemID) || 0;
    if (!input || !checkbox) {
      return;
    }
    input.value = quantity.toString();
    checkbox.checked = quantity > 0;
    // enable interactivity
    container?.querySelectorAll<HTMLButtonElement>("button").forEach((node) =>
      node.disabled = false
    );
    container?.querySelectorAll<HTMLButtonElement>("input").forEach((node) =>
      node.disabled = false
    );
  });
};
const useAddToCart = ({ product }: Props) => {
  const platform = usePlatform();
  if (platform === "wake") {
    return {
      productVariantId: Number(product.productID),
      quantity: 1,
    };
  }
  return null;
};
function AddToCartButton(props: Props) {
  const { product, item, text } = props;
  const platformProps = useAddToCart(props);
  const id = useId();
  return (
    <div
      id={id}
      class="flex"
      data-item-id={product.productID}
      data-cart-item={encodeURIComponent(
        JSON.stringify({ item, platformProps }),
      )}
    >

          <div class={clx("flex-grow")}>
            <QuantitySelector
              min={1}
              max={100}
              id="quantitySelectorItems"
            />
          </div>
          <button
            class={clx("flex-grow")}
            hx-on:click={useScript(onClick)}
          >
            {text ? text : "Add to Cart"}
          </button>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}
export default AddToCartButton;
