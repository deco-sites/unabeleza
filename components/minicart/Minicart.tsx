import { AppContext } from "../../apps/site.ts";
import { MINICART_DRAWER_ID, MINICART_FORM_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useComponent } from "../../sections/Component.tsx";
import CartItem, { Item } from "./Item.tsx";
import { useScript } from "@deco/deco/hooks";
import Icon from "../ui/Icon.tsx";
export interface Minicart {
  /** Cart from the ecommerce platform */
  platformCart: Record<string, unknown>;
  /** Cart from storefront. This can be changed at your will */
  storefront: {
    items: Item[];
    total: number;
    subtotal: number;
    discounts: number;
    coupon?: string;
    locale: string;
    currency: string;
    enableCoupon?: boolean;
    freeShippingTarget: number;
    checkoutHref: string;
  };
}
const onLoad = (formID: string) => {
  const form = document.getElementById(formID) as HTMLFormElement;
  window.STOREFRONT.CART.dispatch(form);
  // view_cart event
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver((items, observer) => {
      for (const item of items) {
        if (item.isIntersecting && item.target === form) {
          window.DECO.events.dispatch({
            name: "view_cart",
            params: window.STOREFRONT.CART.getCart(),
          });
          observer?.unobserve(item.target);
        }
      }
    }).observe(form);
  }
  // Disable form interactivity while cart is being submitted
  document.body.addEventListener(
    "htmx:before-send", // deno-lint-ignore no-explicit-any
    ({ detail: { elt } }: any) => {
      if (elt !== form) {
        return;
      }
      // Disable addToCart button interactivity
      document.querySelectorAll("div[data-cart-item]").forEach((container) => {
        container?.querySelectorAll("button")
          .forEach((node) => node.disabled = true);
        container?.querySelectorAll("input")
          .forEach((node) => node.disabled = true);
      });
    },
  );
};
const sendBeginCheckoutEvent = () => {
  window.DECO.events.dispatch({
    name: "being_checkout",
    params: window.STOREFRONT.CART.getCart(),
  });
};
export const action = async (_props: unknown, req: Request, ctx: AppContext) =>
  req.method === "PATCH"
    ? ({ cart: await ctx.invoke("site/loaders/minicart.ts") }) // error fallback
    : ({ cart: await ctx.invoke("site/actions/minicart/submit.ts") });
export function ErrorFallback() {
  return (
    <div class="flex flex-col flex-grow justify-center items-center overflow-hidden w-full gap-2">
      <div class="flex flex-col gap-1 p-6 justify-center items-center">
        <span class="font-semibold">
          Error while updating cart
        </span>
        <span class="text-sm text-center">
          Click in the button below to retry or refresh the page
        </span>
      </div>

      <button
        class="btn btn-primary"
        hx-patch={useComponent(import.meta.url)}
        hx-swap="outerHTML"
        hx-target="closest div"
      >
        Retry
      </button>
    </div>
  );
}
export default function Cart(
  {
    cart: {
      platformCart,
      storefront: {
        items,
        total,
        subtotal,
        coupon,
        discounts,
        locale,
        currency,
        checkoutHref,
      },
    },
  }: {
    cart: Minicart;
  },
) {
  const count = items.length;
  return (
    <>
      <form
        class="contents w-full"
        id={MINICART_FORM_ID}
        hx-sync="this:replace"
        hx-trigger="submit, change delay:300ms"
        hx-target="this"
        hx-indicator="this"
        hx-disabled-elt="this"
        hx-post={useComponent(import.meta.url)}
        hx-swap="outerHTML"
      >
        {/* Button to submit the form */}
        <button hidden autofocus />

        {/* Add to cart controllers */}
        <input name="add-to-cart" type="hidden" />
        <button hidden name="action" value="add-to-cart" />

        {/* This contains the STOREFRONT cart. */}
        <input
          type="hidden"
          name="storefront-cart"
          value={encodeURIComponent(
            JSON.stringify({ coupon, currency, value: total, items }),
          )}
        />

        {/* This contains the platformCart cart from the commerce platform. Integrations usually use this value, like GTM, pixels etc */}
        <input
          type="hidden"
          name="platform-cart"
          value={encodeURIComponent(JSON.stringify(platformCart))}
        />

        <div
          class={clx(
            "flex flex-col flex-grow justify-center items-center w-full divide-y divide-[#F5F5F5]",
            "[.htmx-request_&]:pointer-events-none [.htmx-request_&]:opacity-60 [.htmx-request_&]:cursor-wait transition-opacity duration-300",
          )}
        >
          {count === 0
            ? (
              <div class="flex flex-col items-center justify-center">
                <Icon id="cart" size={96} />
                <span class="text-center w-[275px] mt-[26px] mb-[39px]">
                  Sacola Vazia. Adicione produtos para finalizar uma compra!
                </span>
                <label
                  for={MINICART_DRAWER_ID}
                  class={clx(
                    "btn bg-[#fff] no-animation w-full border-2 border-[#8F2AED] rounded-[5px]",
                    "text-sm font-bold text-[#8F2AED] hover:bg-[#8F2AED] hover:text-white  hover:border-[#8F2AED]",
                  )}
                >
                  CONTINUAR COMPRANDO
                </label>
              </div>
            )
            : (
              <>
                {/* Cart Items */}
                <ul
                  role="list"
                  class="px-5 pb-[33px] flex-grow overflow-y-auto flex flex-col gap-[22px] w-full"
                >
                  {items.map((item, index) => (
                    <li class="h-[115px] pb-6 border-b border-[#F5F5F5]">
                      <CartItem
                        item={item}
                        index={index}
                        locale={locale}
                        currency={currency}
                      />
                    </li>
                  ))}
                </ul>

                {/* Cart Footer */}
                <footer class="w-full p-5">
                  {/* Subtotal and Total */}
                  <div class="flex flex-col gap-4">
                    {discounts > 0 && (
                      <div class="flex justify-between items-center">
                        <span class="text-sm">Discounts</span>
                        <span class="text-sm">
                          {formatPrice(discounts, currency, locale)}
                        </span>
                      </div>
                    )}
                    <div class="w-full flex justify-between text-sm text-[#060D21]">
                      <span>Subtotal</span>
                      <output form={MINICART_FORM_ID}>
                        {formatPrice(subtotal, currency, locale)}
                      </output>
                    </div>
                    <div class="flex justify-between items-center w-full font-bold text-base text-[#060D21]">
                      <span>Total</span>
                      <output
                        form={MINICART_FORM_ID}
                      >
                        {formatPrice(total, currency, locale)}
                      </output>
                    </div>
                  </div>

                  <div class="flex flex-col gap-2 mt-6">
                    <label
                      for={MINICART_DRAWER_ID}
                      class={clx(
                        "btn bg-[#fff] no-animation w-full border-2 border-[#8F2AED] rounded-[5px]",
                        "text-sm font-bold text-[#8F2AED] hover:bg-[#8F2AED] hover:text-white  hover:border-[#8F2AED]",
                      )}
                    >
                      CONTINUAR COMPRANDO
                    </label>
                    <a
                      class="btn btn-primary w-full no-animation boder-0 rounded-[5px] hover:bg-[#C493EF] hover:border-0"
                      href={checkoutHref}
                      hx-on:click={useScript(sendBeginCheckoutEvent)}
                    >
                      <span class="[.htmx-request_&]:hidden text-sm font-bold text-black">
                        FINALIZAR COMPRA
                      </span>
                      <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                    </a>
                  </div>
                </footer>
              </>
            )}
        </div>
      </form>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, MINICART_FORM_ID),
        }}
      />
    </>
  );
}
