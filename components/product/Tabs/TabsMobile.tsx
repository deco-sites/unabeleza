import { PropertyValue } from "apps/commerce/types.ts";
import AccordionProps from "../../../islands/Accordion.tsx"

interface TabsMobileProps {
    productInformations: PropertyValue[]
}

export default function TabsMobile({ productInformations }: TabsMobileProps) {
    if (productInformations?.length === 0) return null

    return (
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