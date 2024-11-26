import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import ShowPriceItem from "../../islands/ShowPriceItem.tsx";
import SelectedFilters from "./Filters/SelectedFilters.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  url: string
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-400">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {

  const avatars = key === "Atributos" || key === "Atributos";
  const flexDirection = avatars ? "flex-row items-center" : "flex-col";

  return (
    <ul class={clx(`flex flex-wrap gap-[10px]`, flexDirection)}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (avatars) {
          const [content, color] = value.split(" ");
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={color ? color : content}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}


function Filters({ filters, url }: Props) {
  const filtersSanitized = filters.filter(isToggle)
  const selectedFilters = filtersSanitized.filter((filter) => {
    const selectedValue = filter.values.find((value) => value.selected);
    return selectedValue ? true : false;
  });

  const filtred = filters.filter((obj) => obj.key !== "precoPor" || obj["@type"] !== "FilterToggle")
  return (
    <ul class="flex flex-col gap-6 pl-[60px] pr-8">
      <li>
        {selectedFilters.length > 0 && (
          <SelectedFilters filters={selectedFilters} />
        )}
      </li>
      {filtred
        .map((filter) => (
          <li class="flex flex-col gap-4" key={filter.label}>
            <div tabIndex={0} className="collapse collapse-arrow2">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-sm font-bold uppercase">{filter.label}</div>
              <div className="collapse-content">
                {
                  filter.key === "precoPor" && filter["@type"] === "FilterRange"
                    ? (
                      <ShowPriceItem url={url} filterToogle={filter} />
                    )
                    : filter["@type"] === "FilterToggle" &&
                    (
                      <FilterValues {...filter} />
                    )
                }
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default Filters;
