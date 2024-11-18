import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useDevice, useScript } from "@deco/deco/hooks";
import { clx } from "../../sdk/clx.ts";
import AccordionProps from "../../islands/Accordion.tsx"

interface TabsProps {
    page: ProductDetailsPage
}

const onLoad = () => {
    const table = document.querySelector('table') as HTMLTableElement;

    if (!table || !table.parentNode) return;

    const rows = table.rows;
    const numRows = rows.length;
    const numCols = rows[0].cells.length;

    const newTable = document.createElement('table');
    newTable.classList.add('w-[44.44vw]', 'table-auto', 'mx-auto');

    for (let col = 0; col < numCols; col++) {
        const newRow = document.createElement('tr');
        newRow.classList.add(col % 2 === 0 ? 'bg-[#FBFBFB]' : 'bg-[#F5F5F5]');

        for (let row = 0; row < numRows; row++) {
            const cell = rows[row].cells[col].cloneNode(true) as HTMLTableCellElement;
            cell.classList.add('px-5', 'py-4', 'text-black', 'text-sm', row === 0 ? 'w-[186px]' : 'flex-grow');
            newRow.appendChild(cell);
        }

        newTable.appendChild(newRow);
    }

    table.parentNode.replaceChild(newTable, table);
}

export default function Tabs({ page }: TabsProps) {
    const product = page.product
    const requiredContent = ['Descrição', 'Dados Técnicos']
    const productInformations = product.additionalProperty?.filter(
        item => item.name && item.value && requiredContent.includes(item.name)
    ).sort((a, b) => {
        if (a.name === 'Descrição') return -1;
        if (b.name === 'Descrição') return 1;
        if (a.name === 'Dados Técnicos') return -1;
        if (b.name === 'Dados Técnicos') return 1;
        return 0;
    }) ?? [];

    if (productInformations?.length === 0) return null

    const device = useDevice();

    return (
        <>
            {
                device === "desktop" ? (
                    <div role="tablist" class="tabs tabs-bordered w-[82.36vw] mx-auto">
                        {
                            productInformations?.map(item => (
                                <>
                                    <input
                                        type="radio"
                                        name="my_tabs_1"
                                        defaultChecked={item.name === "Descrição"}
                                        role="tab" aria-label={item.name}
                                        class={clx(
                                            "tab !w-[calc(82.36vw_/_3)] max-w-full py-4 px-[10px] !max-h-full !h-[53px]",
                                            "!border-b border-[#F5F5F5] checked:!border-b-[5px] checked:!border-primary",
                                            "font-bold text-sm checked:text-primary text-black uppercase"
                                        )}
                                    />
                                    <div
                                        role="tabpanel"
                                        class="tab-content p-10 text-sm text-black"
                                        dangerouslySetInnerHTML={{ __html: item.value ?? '' }}
                                    />
                                </>
                            ))
                        }
                    </div>
                ) : (
                    <>
                        {
                            productInformations?.map(item => (
                                <AccordionProps title={item.name ?? ''}>
                                    <div
                                        class=""
                                        dangerouslySetInnerHTML={{ __html: item.value ?? '' }}
                                    />
                                </AccordionProps>
                            ))
                        }
                    </>
                )
            }
            <script
                type="module"
                dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
            />
        </>
    )

}