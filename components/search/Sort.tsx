import { ProductListingPage } from "apps/commerce/types.ts";
import { useDevice, useScript } from "@deco/deco/hooks";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";
const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";
export type Props = Pick<ProductListingPage, "sortOptions"> & {
  url: string;
};
const getUrl = (href: string, value: string) => {
  const url = new URL(href);
  url.searchParams.delete(PAGE_QUERY_PARAM);
  url.searchParams.set(SORT_QUERY_PARAM, value);
  return url.href;
};

const onClick = (value: string) => {
  window.location.href = value;
};

function Sort({ sortOptions, url }: Props) {
  const current = getUrl(
    url,
    new URL(url).searchParams.get(SORT_QUERY_PARAM) ?? "",
  );
  const options = sortOptions?.map(({ value, label }) => ({
    value: getUrl(url, value),
    label,
  }));

  const currentLabel =
    options?.find((option) => option.value === current)?.label ?? "ORDENAR";

  const device = useDevice();

  return (
    <>
      <details
        className={clx(
          "dropdown w-full desktop:max-w-[14.58vw]",
          device === "desktop" && "collapse-arrow2",
        )}
      >
        <summary
          className={clx(
            "btn flex justify-between items-center min-h-0 h-10 mobile:h-[45px] py-0",
            "hover:!border hover:!border-[#363B4B] rounded-[5px] border border-[#363B4B]",
            "mobile:pl-[19.5px] mobile:pr-[7.5px] mobile:py-[10px] mobile:shadow-md",
            "pl-[42.5px]  pr-[30px]",
            device === "desktop" && "collapse-title",
          )}
        >
          {device === "mobile" && <Icon id="sort" width={23} height={15.33} />}
          <span class="desktop:w-fit text-start font-normal mobile:font-bold desktop:text-sm">
            {device === "desktop" ? currentLabel : "ORDENAR"}
          </span>
        </summary>
        <ul
          className={clx(
            "menu dropdown-content top-8 w-full bg-white rounded-box -z-[1]",
            "px-[14.5px] pt-[30px] pb-5 space-y-[10px] shadow",
            "mobile:px-[11px] mobile:pt-7 mobile:pb-[18px]",
          )}
        >
          {options.map(({ value, label }) => (
            <li
              key={label}
              hx-on:click={useScript(onClick, value)}
              class={clx(
                "cursor-pointer !h-10 border rounded-[5px] text-sm",
                "hover:border-[#363B4B] hover:bg-[#F0F0F0] hover:font-bold",
                "flex w-full justify-center items-center mobile:px-2 text-center",
                label === currentLabel
                  ? "border-[#363B4B] bg-[#F0F0F0] font-bold"
                  : "border-[#F0F0F0]",
              )}
            >
              {label}
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
export default Sort;
