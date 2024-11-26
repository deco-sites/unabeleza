import { ProductListingPage } from "apps/commerce/types.ts";
import { useScript } from "@deco/deco/hooks";
import { clx } from "../../sdk/clx.ts";
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
const labels: Record<string, string> = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Lançamento",
  "discount:desc": "Maior desconto",
};

const onClick = (value: string) => {
  window.location.href = value;
}

function Sort({ sortOptions, url }: Props) {
  const current = getUrl(
    url,
    new URL(url).searchParams.get(SORT_QUERY_PARAM) ?? "",
  );
  const options = sortOptions?.map(({ value, label }) => ({
    value: getUrl(url, value),
    label,
  }));

  const currentLabel = options?.find((option) => option.value === current)?.label ?? "Selecione"

  return (
    <>
      <details className="dropdown collapse-arrow2 w-full desktop:max-w-[14.58vw]">
        <summary
          className="btn my-1 collapse-title min-h-0 h-10 py-0 px-10 hover:!border hover:!border-[#363B4B] rounded-[5px] border border-[#363B4B]" 
        >
            <span class="w-full text-start font-normal text-sm">
            {currentLabel} 
            </span>
        </summary>
        <ul className="menu dropdown-content w-full bg-white rounded-box z-[1] w-52 px-[14.5px] py-5 space-y-[10px] shadow">
        {options.map(({ value, label }) => (
          <li key={label} hx-on:click={useScript(onClick, value)} 
            class={clx(
              "cursor-pointer !h-10 border rounded-[5px] text-sm", 
              "hover:border-[#363B4B] hover:bg-[#F0F0F0] hover:font-bold",
              "flex w-full justify-center items-center",
              label === currentLabel ? "border-[#363B4B] bg-[#F0F0F0] font-bold" : "border-[#F0F0F0]"
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
