import { FilterToggle } from "apps/commerce/types.ts";
import Icon from "../../ui/Icon.tsx";

interface SelectedFiltersProps {
  filters: FilterToggle[];
}

export default function SelectedFilters(props: SelectedFiltersProps) {
  const values = props.filters.map((filter) => {
    const values = filter.values.filter((value) => value.selected);
    return values;
  }).flat();

  return (
    <li class="hidden desktop:flex flex-col py-5 px-[17.5px] py-5 px-10 bg-[#f9f9f9] desktop:pl-[60px] w-full">
      <span class="text-sm text-[#060D21] font-bold uppercase">
        Você filtrou por:
      </span>
      <ul class="flex flex-wrap gap-2.5 mt-2.5">
        {values.map((value) => (
          <li>
            <a
              href={value.url}
              class="text-xs font-semibold leading-[14.4px] text-black bg-[#DBB9F9] px-2.5 py-1.5 flex items-center gap-1.5 rounded"
            >
              {value.label}
              <Icon
                id="close"
                width={15}
                height={15}
                class="text-primary"
              />
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
