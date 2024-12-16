import { AnalyticsItem } from "apps/commerce/types.ts";
import { clx } from "../sdk/clx.ts";
import Icon from "../components/ui/Icon.tsx";
import { useCallback, useEffect } from "preact/hooks";
import { invoke } from "../runtime.ts";

interface Props {
    variant?: "full" | "icon";
    item: AnalyticsItem;
    stroke: string
    fill?: string
    typeTwo?: boolean
}

function WishlistButton({ item, stroke, fill, typeTwo }: Props) {
    // deno-lint-ignore no-explicit-any
    const productID = (item as any).item_id.toString() ?? "";
    const productGroupID = item.item_group_id?.toString() ?? "";

    const handleResults = useCallback(
        async () => {
            const user = await invoke.wake.loaders.user();
            if (user?.email) {
                const button = document.getElementById(productID) as HTMLButtonElement;
                button.classList.add("htmx-request");
                const inWishlist = await invoke.wake.loaders.wishlist();
                inWishlist.some(obj => obj.productId === Number(productGroupID))
                    ? await invoke.wake.actions.wishlist.removeProduct({ productId: Number(productGroupID) })
                    : await invoke.wake.actions.wishlist.addProduct({ productId: Number(productGroupID) })

                const svg = button.querySelector("svg");
                if(svg) {
                    svg.classList.toggle("text-[#BD87ED]") 
                    button.disabled = false;
                    button.classList.remove("htmx-request");
                }

            } else {
                window.alert(`Faça login para adicionar o produto à sua lista de desejos`);
            }
        }, [item]
    )

    useEffect(() => {
        const updateButton = async () => {
            const user = await invoke.wake.loaders.user();
            const button = document.getElementById(productID) as HTMLButtonElement;
            button.disabled = false;
            button.classList.remove("htmx-request");

            if (user?.email) {
                const inWishlist = await invoke.wake.loaders.wishlist();
                const svg = button.querySelector("svg");

                inWishlist.some(obj => obj.productId === Number(productGroupID))
                    ? svg?.classList.add("text-[#BD87ED]")
                    : svg?.classList.remove("text-[#BD87ED]")

                const span = button.querySelector("span");
                if (span) {
                    span.innerHTML = inWishlist ? "Remover da lista de desejos" : "Adicionar à lista de desejos";
                }
            }
        };

        updateButton();

    }, [productID, productGroupID]);

    return (
        <>
            <button
                id={productID}
                data-wishlist-button
                disabled
                aria-label="Add to wishlist"
                onClick={handleResults}
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
                    width={26}
                    height={23}
                    stroke={stroke}
                />
                <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
            </button>
        </>
    );
}
export default WishlistButton;
