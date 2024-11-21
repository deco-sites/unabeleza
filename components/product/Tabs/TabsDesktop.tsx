import { PropertyValue } from "apps/commerce/types.ts";
import { clx } from "../../../sdk/clx.ts";

interface TabsDesktopProps {
    productInformations: PropertyValue[]
}

export default function TabsDesktop({ productInformations }: TabsDesktopProps) {
    if (productInformations?.length === 0) return null

    return (
        <div role="tablist" class="tabs tabs-bordered !w-full mx-auto !max-w-[82.36%]  justify-items-stretch">
            {
                productInformations?.map(item => (
                    <>
                        <input
                            type="radio"
                            name="my_tabs_1"
                            defaultChecked={item.name === "Descrição"}
                            role="tab" aria-label={item.name}
                            class={clx(
                                "tab justify-self-center !w-[calc(82.36vw_/_3)] max-w-[421px] py-4 px-[10px] !max-h-full !h-[53px]",
                                "!border-b border-[#F5F5F5] checked:!border-b-[5px] checked:!border-primary",
                                "font-bold text-sm checked:text-primary text-black uppercase flex-1"
                            )}
                        />
                        <div
                            role="tabpanel"
                            class="tab-content p-10 text-sm text-black w-full"
                            dangerouslySetInnerHTML={{ __html: item.value ?? '' }}
                        />
                    </>
                ))
            }
        </div>
    )
}