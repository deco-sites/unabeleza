import type { BreadcrumbList } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";
import Icon from "./Icon.tsx";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <div class="py-0 text-xs font-normal text-base-400 w-full">
      <ul class="flex gap-[6px] items-end">
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => {
            if (name === "Home") {
              return (
                <li>
                  <a href={relative(item)}>
                    <Icon id="home" width="14" height="15" />
                  </a>
                </li>
              );
            }
            return (
              <li class="group overflow-hidden text-ellipsis">
                <a
                  class="group-last:font-bold breadcrumb-item text-xs whitespace-nowrap"
                  href={relative(item)}
                >
                  {name}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Breadcrumb;
