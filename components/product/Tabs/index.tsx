import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useDevice, useScript } from "@deco/deco/hooks";
import TabsDesktop from "./TabsDesktop.tsx";
import TabsMobile from "./TabsMobile.tsx";
import ReviewForm from "../ProductReview/ReviewForm.tsx";

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
    newTable.classList.add('w-[44.44vw]', 'table-auto', 'mx-auto', 'mobile:w-full');

    for (let col = 0; col < numCols; col++) {
        const newRow = document.createElement('tr');
        newRow.classList.add(col % 2 === 0 ? 'bg-[#FBFBFB]' : 'bg-[#F5F5F5]');

        for (let row = 0; row < numRows; row++) {
            const cell = rows[row].cells[col].cloneNode(true) as HTMLTableCellElement;
            cell.classList.add(
                'px-5', 'py-4', 'text-black', 'text-sm', 'mobile:text-xs', 'text-start', row === 0 ? 'w-[186px]' : 'flex-grow', 'mobile:w-1/2'
            );
            newRow.appendChild(cell);
        }

        newTable.appendChild(newRow);
    }

    table.parentNode.replaceChild(newTable, table);
}

export default function Tabs({ page }: TabsProps) {
    const product = page.product
    const requiredContent = ['Descrição', 'Dados Técnicos']
    const productInformations: any[] = product.additionalProperty?.filter(
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
                device === "desktop" 
                ? (
                    <TabsDesktop productInformations={productInformations}/>
                ) : (
                    <TabsMobile productInformations={productInformations}/>
                )
            }
            <script
                type="module"
                dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
            />
        </>
    )

}