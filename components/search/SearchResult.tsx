import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import { type Section as SectionType } from "@deco/deco/blocks";
import { ProductShelfComponent } from "../../sections/Product/ProductShelf.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import Breadcrumb from "../ui/Breadcrumb.tsx";
import Drawer from "../ui/Drawer.tsx";
import Sort from "./Sort.tsx";
import { useDevice, useScript, useSection } from "@deco/deco/hooks";
import { type SectionProps } from "@deco/deco";
import { RichText } from "apps/admin/widgets.ts";
import { COMMON_HTML_TAGS_TO_ALLOW } from "../../constants.ts";
import { sanitizeHTMLCode } from "../../sdk/htmlSanitizer.ts";
import Carousel, {Props as CarouselProps} from '../../sections/Images/Carousel.tsx'
export interface Layout {
  /**
   * @title Pagination
   * @description Format of the pagination
   */
  pagination?: "show-more" | "pagination";
}

interface ContentProps {
  carousel?: CarouselProps
  description?: RichText
}

export interface Props {
  /** @title Integration */
  page?: ProductListingPage | null;
  layout?: Layout;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  /** @hidden */
  partial?: "hideMore" | "hideLess";

  searchbar: SearchbarProps;

  productShelf: SectionType<ProductShelfComponent>;

  searchParams?: string | null;

  content?: ContentProps
}

function NotFound({ searchbar, productShelf, searchParams }: Props) {
  return (
    <>
      {searchParams
        ? (
          <div class="w-full flex flex-col gap-[30px] mobile:gap-6 justify-center items-center">
            <div class="w-full flex flex-col gap-10 mobile:gap-6 justify-center items-center ">
              <Icon
                id="faceIcon"
                width="70"
                height="69"
                class="mt-[87px]"
              />
              <span class="font-[PP-Hatton] text-center text-[24px] mobile:text-[20px] w-[526px] mobile:w-[333px]">
                OPS... Não encontramos nenhum resultado para:
              </span>
            </div>
            <div class="w-[526px] mobile:w-[89.4%]">
              <Searchbar {...searchbar} placeholder="Faça sua busca aqui" />
            </div>
            <div class="flex justify-start ml-[-120px] mobile:ml-[0px] flex-col font-[Montserrat] text-[14px]">
              <li class="marker:text-[#BD87ED]">
                Verifique se a palavra foi digitada corretamente;
              </li>
              <li class="marker:text-[#BD87ED]">
                Tente palavras menos específicas;
              </li>
              <li class="marker:text-[#BD87ED]">
                Tente palavras-chave diferentes;
              </li>
              <li class="marker:text-[#BD87ED]">Faça buscas relacionadas.</li>
            </div>
          </div>
        )
        : (
          <div class="w-full flex justify-around items-center py-[120px] phone:flex-col">
            <div>
              <h1 class="font-[PP-Hatton] text-[200px] phone:text-[127px] text-[#A3E3FF]">
                404
              </h1>
            </div>
            <div class="flex flex-col justify-start phone:ml-[20px] gap-6">
              <div class="flex flex-col ">
                <span class="font-[PP-Hatton] font-bold text-[30px] phone:text-[20px] mb-[20px]">
                  Página não encontrada
                </span>
                <span class="font-[Montserrat] text-[16px] phone:text-[14px] phone:w-[335px]">
                  A página que você procura não existe ou não está disponível
                </span>
              </div>
              <div class="flex justify-start flex-col font-[Montserrat] text-[14px]">
                <span class="font-bold text-[16px] mb-[20px]">
                  Causas possíveis
                </span>
                <li class="marker:text-[#BD87ED] mb-[16px]">
                  O conteúdo não está mais no ar;
                </li>
                <li class="marker:text-[#BD87ED] mb-[16px]">
                  A página mudou de lugar;
                </li>
                <li class="marker:text-[#BD87ED] mb-[16px]">
                  O servidor está fora do ar;
                </li>
                <li class="marker:text-[#BD87ED] mb-[16px]">
                  Você digitou o endereço errado
                </li>
              </div>
              <a
                href="/"
                class="btn no-animation w-[335px] h-[45px] uppercase text-[#8F2AED] border-[1px] border-[#8F2AED] bg-none hover:bg-[#8F2AED] hover:text-[#FFF]"
              >
                Voltar para o início
              </a>
            </div>
          </div>
        )}
      <productShelf.Component {...productShelf.props} />
    </>
  );
}

const useUrlRebased = (overrides: string | undefined, base: string) => {
  let url: string | undefined = undefined;
  if (overrides) {
    const temp = new URL(overrides, base);
    const final = new URL(base);
    final.pathname = temp.pathname;
    for (const [key, value] of temp.searchParams.entries()) {
      final.searchParams.set(key, value);
    }
    url = final.href;
  }
  return url;
};

function PageResult(props: SectionProps<typeof loader>) {
  const { layout, startingPage = 1, url, partial } = props;
  const page = props.page!;
  const { products, pageInfo } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const nextPage = `?page=${pageInfo.currentPage + 1}`
  const nextPageUrl = useUrlRebased(nextPage, url);
  const prevPageUrl = useUrlRebased(pageInfo.previousPage, url);
  const partialNext = useSection({
    href: nextPageUrl,
    props: { partial: "hideLess" },
  });
  const infinite = layout?.pagination !== "pagination";
  return (
    <div class="grid grid-flow-row grid-cols-1 place-items-stretch ">
      <div
        data-product-list
        class={clx(
          "grid grid-cols-3",
          "gap-5 justify-items-center",
          "mobile:grid-cols-2 mobile:gap-4",
          "w-full",
        )}
      >
        {products?.map((product, index) => (
          <ProductCard
            key={`product-card-${product.productID}`}
            product={product}
            preload={index === 0}
            index={offset + index}
            class="h-full "
          />
        ))}
      </div>

      <div class={clx("pt-2 mb-5 w-full")}>
        {infinite
          ? (
            <div class="flex justify-center [&_section]:contents">
              <a
                rel="next"
                class={clx(
                  "btn btn-ghost",
                  (!nextPageUrl || partial === "hideMore") && "hidden",
                )}
                hx-swap="outerHTML show:parent:top"
                hx-get={partialNext}
              >
                <span class="inline [.htmx-request_&]:hidden">
                  Ver Mais
                </span>
                <span class="loading loading-spinner hidden [.htmx-request_&]:block" />
              </a>
            </div>
          )
          : (
            <div class={clx("join", infinite && "hidden")}>
              <a
                rel="prev"
                aria-label="previous page link"
                href={prevPageUrl ?? "#"}
                disabled={!prevPageUrl}
                class="btn btn-ghost join-item"
              >
                <Icon id="chevron-right" class="rotate-180" />
              </a>
              <span class="btn btn-ghost join-item">
                Page {zeroIndexedOffsetPage + 1}
              </span>
              <a
                rel="next"
                aria-label="next page link"
                href={nextPageUrl ?? "#"}
                disabled={!nextPageUrl}
                class="btn btn-ghost join-item"
              >
                <Icon id="chevron-right" />
              </a>
            </div>
          )}
      </div>
    </div>
  );
}
const setPageQuerystring = (page: string, id: string) => {
  const element = document.getElementById(id)?.querySelector(
    "[data-product-list]",
  );
  if (!element) {
    return;
  }
  new IntersectionObserver((entries) => {
    const url = new URL(location.href);
    const prevPage = url.searchParams.get("page");
    for (let it = 0; it < entries.length; it++) {
      if (entries[it].isIntersecting) {
        url.searchParams.set("page", page);
      } else if (
        typeof history.state?.prevPage === "string" &&
        history.state?.prevPage !== page
      ) {
        url.searchParams.set("page", history.state.prevPage);
      }
    }
    history.replaceState({ prevPage }, "", url.href);
  }).observe(element);
};

function Content({ carousel, description }: ContentProps) {
  return (
    <div>
      {carousel?.images?.length && (
        <div class="[&>div]:!mt-0">
          <Carousel images={carousel?.images} />
        </div>
      )}
      {description && (
        <>
          <div
            class="relative mt-6 [&>h1]:font-[PP-Hatton] [&>h1]:text-2xl [&>h1]:mb-3 [&>p]:text-xs mobile:max-h-36 mobile:overflow-hidden before:content-[''] desktop:before:content-none before:absolute before:bottom-0 before:left-0 before:w-full before:h-10 custom-linear-gradient"
            data-is-all-content-visible={false}
            dangerouslySetInnerHTML={{
              __html: sanitizeHTMLCode(description, {
                removeEmptyTags: false,
                allowedTags: [...COMMON_HTML_TAGS_TO_ALLOW, 'br', 'h1'],
                removeWrapperTag: false,
              }),
            }}
          ></div>
          <button
            type="button"
            class="desktop:hidden flex items-center gap-2 text-[#BD87ED] text-xs underline ml-auto mt-2 mr-2"
          >
            Mais sobre a marca
            <Icon id="drawerArrowRight" width={8} height={16} class="rotate-90 custom-force-svg-primary-color"/>
          </button>
        </>
      )}
    </div>
  )
}

function Result(props: SectionProps<typeof loader>) {
  const container = useId();
  const controls = useId();
  const device = useDevice();
  const { startingPage = 1, url, partial, content } = props;
  const page = props.page!;
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        // TODO: get category name from search or cms setting
        item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
        item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
        items: page.products?.map((product, index) =>
          mapProductToAnalyticsItem({
            ...(useOffer(product.offers)),
            index: offset + index,
            product,
            breadcrumbList: page.breadcrumb,
          })
        ),
      },
    },
  });

  const sortBy = sortOptions.length > 0 && (
    <Sort sortOptions={sortOptions} url={url} />
  );

  return (
    <>
      <div
        id={container}
        {...viewItemListEvent}
        class={clx(
          "w-full mt-10 max-w-[96rem]  mx-auto mobile:px-5 mobile:py-8",
          partial ?? "pr-[60px]",
        )}
      >
        {partial
          ? <PageResult {...props} />
          : (
            <div class="container flex flex-col gap-4 w-full">
              <div class="pl-[60px] mobile:pl-0">
                <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
              </div>

              {device === 'mobile' && (
                <Content
                  carousel={content?.carousel}
                  description={content?.description}
                />
              )}

              {device === "mobile" && (
                <Drawer
                  id={controls}
                  class="drawer-end"
                  aside={
                    <div class="bg-base-100 flex flex-col h-full w-[79.73vw] divide-y overflow-y-hidden">
                      <div class="flex justify-center items-center relative p-5 border-b border-[#F5F5F5]">
                        <label
                          class="btn btn-ghost p-0 absolute left-5 top-1/2 -translate-y-1/2"
                          for={controls}
                        >
                          <Icon id="closeFilter" width={15} height={15} />
                        </label>

                        <h1 class="font-bold text-lg font-[PP-Hatton]">
                          Filtrar por
                        </h1>
                      </div>

                      <div class="flex-grow overflow-auto">
                        <Filters filters={filters} url={url} />
                      </div>
                    </div>
                  }
                >
                  <div class="flex justify-between items-center">
                    <label
                      class={clx(
                        "btn w-full max-w-[41.86vw] pl-[31.5px] pr-[22.5px] py-[10px]",
                        "flex justify-between h-[45px] min-h-0",
                        "hover:!border hover:!border-[#363B4B] rounded-[5px] border border-[#363B4B]",
                      )}
                      for={controls}
                    >
                      <Icon id="filterMobile" width={23} height={15.33} />
                      <span class="font-bold">
                        FILTRO
                      </span>
                    </label>

                    <div class="flex flex-col w-full max-w-[41.86vw]">
                      {sortBy}
                    </div>
                  </div>
                </Drawer>
              )}

              <div class="flex gap-10 justify-between sm:grid-cols-[250px_1fr]">
                {device === "desktop" && (
                  <aside class="sticky h-full place-self-start flex flex-col gap-9 desktop:w-[calc((100%_+_60px)_*_0.2402)]">
                    <span class="text-2xl font-[PP-Hatton] font-bold h-12 flex items-center flex gap-4 pl-[60px]">
                      Filtros <Icon id="filter" width={18} height={18} />
                    </span>
                    <Filters filters={filters} url={url} />
                  </aside>
                )}

                <div class="flex flex-col gap-9 w-full desktop:max-w-[calc((100%_+_60px)_*_0.69027)]">
                  {device === 'desktop' && (
                    <Content
                      carousel={content?.carousel}
                      description={content?.description}
                    />
                  )}

                  {device === "desktop" && (
                    <div class="flex justify-end items-center gap-[10px]">
                      <span class="font-bold">ORDENAR POR</span>
                      {sortBy}
                    </div>
                  )}
                  <PageResult {...props} />
                </div>
              </div>
            </div>
          )}
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            setPageQuerystring,
            `${pageInfo.currentPage}`,
            container,
          ),
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: SectionProps<typeof loader>) {
  if (!page?.pageInfo.records) {
    return <NotFound {...props} />;
  }
  return <Result {...props} page={page} />;
}

export const loader = (props: Props, req: Request) => {
  const url = new URL(req.url);
  const searchParams = url.search ?? null;
  return {
    ...props,
    url: url.href,
    searchParams,
  };
};

export default SearchResult;
