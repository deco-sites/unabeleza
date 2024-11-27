import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import ShowPriceItem from "../../islands/ShowPriceItem.tsx";
import SelectedFilters from "./Filters/SelectedFilters.tsx";
import { useScript } from "@deco/deco/hooks";
import BottomFilterBar from "./Filters/BottomFilterBar.tsx";

interface Props {
  filters: ProductListingPage["filters"];
  url: string
}

interface ValuteItem extends FilterToggleValue {
  kei: string
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

const onClick = (kei: string, value: string, selected: boolean) => {
  window.FILTER_LOGICS.filterChange(kei, value, selected);

  const button = event?.currentTarget as HTMLElement
  const firstChild = button?.firstElementChild  as HTMLElement

  if (firstChild?.classList.contains("checkbox")) {
    const isChecked = firstChild.getAttribute("aria-checked") === "true";
    firstChild.setAttribute("aria-checked", (!isChecked).toString());
  } else {
    const avatar = button.querySelector("#checkAvatar") as HTMLElement
    avatar.classList.toggle("ring-1");
    avatar.classList.toggle("ring-offset-2");
    avatar.classList.toggle("ring-[#707070]");
    avatar.classList.toggle("border");
    avatar.classList.toggle("border-[#707070]");
  }
  
}

function ValueItem(
  { kei, selected, label, quantity, value }: ValuteItem,
) {
  return (
    <a hx-on:click={useScript(onClick, kei, value, selected)} rel="nofollow" class="flex items-center gap-2" >
      <div aria-checked={selected} class="checkbox" />
      <span class="text-sm">{label}</span>
      {quantity > 0 && <span class="text-sm text-base-400">({quantity})</span>}
    </a>
  );
}

function FilterValues({ key, label, values }: FilterToggle) {

  const avatars = key === "Atributos" || key === "Atributos";
  const flexDirection = avatars ? "flex-row items-center" : "flex-col";

  return (
    <ul class={clx(`flex flex-wrap gap-[10px]`, flexDirection)}>
      {values.map((item) => {
        const { selected, value } = item;

        if (avatars) {
          const [content, color] = value.split(" ");
          return (
            <a hx-on:click={useScript(onClick, label, value, selected)} rel="nofollow">
              <div class="avatar placeholder">
                  <div id="checkAvatar"
                    class={clx(
                      "h-[30px] w-[30px]",
                      "rounded-[5px]",
                      "border border-[#707070]"
                    )}
                    style={color && { backgroundColor: color }}
                  >
                    <span class="uppercase">
                      {color ? "" : content.substring(0, 2)}
                    </span>
                  </div>
                </div>
            </a>
          );
        }

        return <ValueItem {...item} kei={label}/>;
      })}
    </ul>
  );
}

const filtersToRename: Record<string, string> = {
  "cor": "cor principal",
  "marcas": "marca",
  "preço": "valor"
}

function Filters({ filters, url }: Props) {
  console.log(filters)
  const selectedFilters = filters
  .filter(isToggle)
  .filter((filter) => {
    const selectedValue = filter.values.find((value) => value.selected);
    return selectedValue ? true : false;
  });

  const filtred = filters
  .filter((obj) => obj.key !== "precoPor" || obj["@type"] !== "FilterToggle")

  return (
    <div class="mobile:flex mobile:flex-col mobile:justify-between mobile:h-full">
    <ul class="flex flex-col max-w-full mobile:mt-10 desktop:gap-6 pl-[60px] pr-8 mobile:px-5">
      <li class="w-full">
        {selectedFilters.length > 0 && (
          <SelectedFilters filters={selectedFilters} />
        )}
      </li>
      {filtred
        .map((filter) => (
          <li class="flex flex-col gap-4 border-b border-[#F5F5F5] w-full" key={filter.label}>
            <div tabIndex={0} className="collapse collapse-arrow2 mobile:p-0">
              <input type="checkbox" className="peer" />
              <div className="collapse-title text-sm font-bold uppercase mobile:py-4 mobile:pr-2 mobile:px-0">{filtersToRename[filter.label.toLocaleLowerCase()] || filter.label}</div>
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
    <BottomFilterBar />
    </div>
  );
}

export default Filters;
