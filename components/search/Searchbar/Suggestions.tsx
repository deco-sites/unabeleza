import { Suggestion } from "apps/commerce/types.ts";
import type { AppContext } from "../../../apps/site.ts";
import { clx } from "../../../sdk/clx.ts";
import { ComponentProps } from "../../../sections/Component.tsx";
import { slot } from "./Form.tsx";
import SearchItem from "./SearchItem.tsx";
import { ACTION, NAME } from "./Form.tsx";
import { type Resolved } from "@deco/deco";
import { useDevice, useScript } from "@deco/deco/hooks";
import Icon from "../../ui/Icon.tsx";

export interface Props {
  /**
   * @title Suggestions Integration
   * @todo: improve this typings ({query: string, count: number}) => Suggestions
   */
  loader: Resolved<Suggestion | null>;
  query: string;
}
export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;
  const form = await req.formData();
  const query = `${form.get(NAME ?? "busca")}`;

  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;
  return { suggestion, query };
};

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { loader: { __resolveType, ...loaderProps } } = props;
  const query = new URL(req.url).searchParams.get(NAME ?? "busca");
  // @ts-expect-error This is a dynamic resolved loader
  const suggestion = await ctx.invoke(__resolveType, {
    ...loaderProps,
    query,
  }) as Suggestion | null;
  return { suggestion };
};

const onClick = (id: string) => {
  document.querySelector(`#${id}`).innerHTML = "";
};



const searchElement = () => {
  const suggestionsPopup = document.getElementById("suggestions-popup");
  if (!suggestionsPopup || suggestionsPopup.classList.contains("hidden")) return;
  
  const handleClickOutside = (e: MouseEvent) => {
    if (!findParentWithId(e.target, ["searchbar-popup", "suggestions-popup"])) {
      suggestionsPopup.classList.add("hidden");
      document.body.removeEventListener("click", handleClickOutside);
    }
  };

  document.body.addEventListener('click', handleClickOutside)

  const memo = new WeakMap<EventTarget, boolean>();

  const findParentWithId = (element: EventTarget | null, targetIds: string[]): boolean => {
    if (!element || !(element instanceof HTMLElement)) return false;

    if (memo.has(element)) return memo.get(element)!;

    let currentElement: HTMLElement = element;

    while (currentElement && currentElement !== document.body) {
      if (targetIds.includes(currentElement.id)) {
        memo.set(element, true);
        return true;
      }
      currentElement = currentElement.parentElement;
    }

    memo.set(element, false);
    return false;
  }
} 

function Suggestions(
  { suggestion, query }: ComponentProps<typeof loader, typeof action>,
) {
  const { products = [], searches = [] } = suggestion ?? {};
  const hasProducts = Boolean(products?.length);
  const hasTerms = Boolean(searches.length);
  const device = useDevice();
  const openSuggestions = hasProducts && hasTerms;

  if(!hasProducts && !hasTerms) return null

  return (
    <div
      id="suggestions-popup"
      class={clx(
        "fixed desktop:right-[calc(60px_+_((100vw_-_min(96rem,100vw))_/_2))] mobile:left-0 desktop:-z-10 z-50 desktop:mt-6 bg-white",
        "w-[min(54.30vw,834px)] mobile:w-screen h-[611px] mobile:h-[72.33vh] mobile:max-h-[596px] mobile:top-[172px] overflow-y-auto",
      )}
    >
      <script type="module" dangerouslySetInnerHTML={{__html: useScript(searchElement)}} />
      <div class="gap-4 grid grid-cols-2 mobile:grid-cols-1 mobile:gap-8 p-[30px] mobile:px-5 mobile:pt-5 relative">
        {device === "mobile" && (
          <button
            class="absolute top-5 right-5"
            hx-on:click={useScript(onClick, slot)}
          >
            <Icon id="closeCart" size={15} />
          </button>
        )}
        <div class="flex flex-col gap-5">
          <span
            class="font-[PP-Hatton] font-bold"
            role="heading"
            aria-level={3}
          >
            Sugestões
          </span>
          <ul class="flex flex-col gap-4">
            {(device === "mobile" ? searches.slice(0, 4) : searches).map(
              ({ term }) => {
                const highlightedTerm = term.replace(
                  new RegExp(`(${query})`, "gi"), // Busca case-insensitive
                  '<span class="text-primary">$1</span>', // Envolve o texto buscado em um span
                );

                return (
                  <li>
                    {/* TODO @gimenes: use name and action from searchbar form */}
                    <a
                      href={`${ACTION}?${NAME}=${term}`}
                      class="flex gap-4 items-center cursor-pointer"
                    >
                      <span
                        class="text-sm uppercase"
                        dangerouslySetInnerHTML={{ __html: highlightedTerm }}
                      />
                    </a>
                  </li>
                );
              },
            )}
          </ul>
        </div>
        <div class="flex flex-col gap-5">
          <span
            class="font-[PP-Hatton] font-bold"
            role="heading"
            aria-level={3}
          >
            Produtos sugeridos
          </span>
          <ul
            role="list"
            class="flex-grow flex flex-col gap-[22px] w-full"
          >
            {products?.slice(0, device === "desktop" ? 3 : 2).map((product) => (
              <li class="h-[115px] pb-6 border-b border-[#F5F5F5]">
                <SearchItem
                  product={product}
                />
              </li>
            ))}
          </ul>
          {products?.length > (device === "desktop" ? 3 : 2) && (
            <a
              href={`${ACTION}?${NAME}=${query}`}
              class="text-center underline text-xs cursor-pointer"
            >
              Veja todos os {products?.length} produtos
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
export default Suggestions;
