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
function AddQuantityToCart(props: Props) {
  const { product, item, text } = props;
  const platformProps = useAddToCart(props);
  const id = useId();
  return (
    <div
      id={id}
      class="flex desktop:gap-2 mobile:w-full"
      data-item-id={product.productID}
      data-cart-item={encodeURIComponent(
        JSON.stringify({ item, platformProps }),
      )}
    >

          <div class={clx("bg-white")}>
            <QuantitySelector
              min={1}
              max={100}
              id="quantitySelectorItems"
            />
          </div>
          <button
            class={clx("flex-1 bg-primary text-black desktop:rounded-[5px] text-sm font-bold hover:bg-[#C493EF]")}
            hx-on:click={useScript(onClick)}
          >
            {text ? text : "COMPRAR"}
          </button>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
      />
    </div>
  );
}
export default AddQuantityToCart;
