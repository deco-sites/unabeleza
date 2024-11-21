import type { Product } from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import { relative } from "../../sdk/url.ts";
import { useId } from "../../sdk/useId.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import { useSection } from "@deco/deco/hooks";
import Icon from "../ui/Icon.tsx";
interface Props {
  product: Product;
}

const useStyles = (checked: boolean) => {
  return clx(
    "btn shadow-custom-2 w-12 h-12",
    "hover:border hover:border-[#8F2AED] hover:bg-transparent",
    checked ? "border border-[#8F2AED]" : "border-0"
  );
};
export const Ring = ({ value, checked = false, class: _class }: {
  value: string;
  checked?: boolean;
  class?: string;
}) => {

  const [colorName, color] = value.split(" ");

  const styles = clx(useStyles(checked), _class);
  return (

    <div style={{ backgroundColor: color }} class={clx(
      "w-[4.44vw] mobile:w-16 max-w-16 flex flex-col justify-end items-center rounded-[5px] overflow-hidden p-0",
      color && "h-[6.04vw] mobile:h-[87px] max-h-[87px]",
      styles
    )}>

      <span class={clx(
        "bg-white h-[42px] w-full flex justify-center items-center p-[6.5px]",
        "font-normal text-[10px]"
      )}>
        {colorName ? colorName : null}
      </span>
    </div>
  );
};
function VariantSelector({ product }: Props) {
  const { url, isVariantOf } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant, product);
  const relativeUrl = relative(url);
  const id = useId();
  const filteredNames = Object.keys(possibilities).filter((name) =>
    name.toLowerCase() === "cor"
  );
  if (filteredNames.length === 0) {
    return null;
  }

  return (
    <ul
      class="flex flex-col gap-4"
      hx-target="closest section"
      hx-swap="outerHTML"
      hx-sync="this:replace"
    >
      {filteredNames.map((name) => (
        <li class="space-y-2 collapse">
          <input type="checkbox" className="peer max-w-[134px] h-[30px] !row-start-[last] mt-6" />
          <button
            className={clx(
              "collapse-title btn flex justify-between items-center border-2 !row-start-[last] max-w-[134px] h-[30px] top-6", 
              "min-h-0 border-primary rounded-[5px] py-[6px] px-4 font-bold text-primary text-xs whitespace-nowrap"
              )}>
            Mostrar mais <Icon id="chevron-bottom" stroke="#8F2AED" width={5} height={10} />
          </button>
          <span class="text-sm">{name}</span>
          <ul class={clx(
              "grid grid-cols-6 desktop-lg:grid-cols-7 desktop-sm:grid-cols-5 mobile:grid-cols-4 mobile-lg:grid-cols-6",
               "gap-4 h-[110px] overflow-hidden peer-checked:h-full"
            )}>
            {Object.entries(possibilities[name])
              .filter(([value]) => value)
              .map(([value, link]) => {
                const relativeLink = relative(link);
                const checked = relativeLink === relativeUrl;
                return (
                  <li>
                    <label
                      class="cursor-pointer grid grid-cols-1 grid-rows-1 place-items-center"
                      hx-get={useSection({ href: relativeLink })}
                    >
                      <input
                        class="hidden peer"
                        type="radio"
                        name={`${id}-${name}`}
                        checked={checked}
                      />
                      <div
                        class={clx(
                          "col-start-1 row-start-1 col-span-1 row-span-1",
                          "[.htmx-request_&]:opacity-0 transition-opacity",
                        )}
                      >
                        <Ring value={value} checked={checked} />
                      </div>
                      {/* Loading spinner */}
                      <div
                        class={clx(
                          "col-start-1 row-start-1 col-span-1 row-span-1",
                          "opacity-0 [.htmx-request_&]:opacity-100 transition-opacity",
                          "flex justify-center items-center",
                        )}
                      >
                        <span class="loading loading-sm loading-spinner" />
                      </div>
                    </label>
                  </li>
                );
              })}
          </ul>


        </li>
      ))}
    </ul>
  );
}
export default VariantSelector;
