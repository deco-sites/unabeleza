 import { AnalyticsItem, Product } from "apps/commerce/types.ts";
import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";
import { useScript } from "@deco/deco/hooks";
import { relative } from "../../sdk/url.ts";
import { MINICART_DRAWER_ID } from "../../constants.ts";

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
  platformProps.quantity = 1;
  window.STOREFRONT.CART.addToCart(item, platformProps);
};

const onChange = () => {
  const input = event!.currentTarget as HTMLInputElement;
  const productID = input!
    .closest("div[data-cart-item]")!
    .getAttribute("data-item-id")!;
  const quantity = Number(input.value);
  if (!input.validity.valid) {
    return;
  }
  window.STOREFRONT.CART.setQuantity(productID, quantity);
};
// Copy cart form values into AddToCartButton
const onLoad = (id: string) => {
  window.STOREFRONT.CART.subscribe((_) => {
    const container = document.getElementById(id);

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
  const { product, item, class: _class, text, quantityButton } = props;
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
      {quantityButton
        ? (
          <div class={clx("flex-grow", _class?.toString())}>
            <QuantitySelector
              min={0}
              max={100}
              hx-on:change={useScript(onChange)}
            />
          </div>
        )
        : (
          <label
            hx-on:click={useScript(onClick)}
            for={MINICART_DRAWER_ID}
            class={clx("flex-grow", _class?.toString())}
          >
            {text ?? "Add to Cart"}
          </label>
        )}

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}
export default AddToCartButton;
