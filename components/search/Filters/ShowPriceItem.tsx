import { FilterRange } from "apps/commerce/types.ts";
import { useCallback } from "preact/hooks";
import MultiRange from "../../ui/MultiRange.tsx";

export interface Props {
    filterToogle: FilterRange;
    url: string;
}

export default function ShowPriceItem(props: Props) {
    const { filterToogle: { values }, url: currentUrl } = props;

    const minPrice = values.min.toString();
    const maxPrice = values.max.toString();

    const currentUrlObject = new URL(currentUrl);
    const currentPrice = currentUrlObject.searchParams.get("precoPor");
    const min = currentPrice ? currentPrice.split(";")[0] : minPrice;
    const max = currentPrice ? currentPrice.split(";")[1] : maxPrice;

    const changeUrl = useCallback((min: number, max: number) => {
        window.FILTER_LOGICS.updatePriceFilter(min, max);
    }, [values]);

    return (
        <div>
            <MultiRange
                maxVal={max}
                minVal={min}
                max={maxPrice}
                min={minPrice}
                step="0.01"
                onChange={changeUrl}
            />
        </div>
    );
}