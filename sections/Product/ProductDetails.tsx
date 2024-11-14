import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
// import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import { ShareProps } from "../../components/ui/Share.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  itemsShare: ShareProps
}

export default function ProductDetails(props: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!props.page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Page not found</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <Section.Container class="">
      {/* <Breadcrumb itemListElement={props.page.breadcrumbList.itemListElement} /> */}

      <div
        class={clx(
          "flex gap-5"
        )}
      >
        <div class="desktop:w-[45.13vw]">
          <ImageGallerySlider page={props.page} />
        </div>
        <div class="desktop:w-[45.13vw]">
          <ProductInfo {...props}/>
        </div>
      </div>
    </Section.Container>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
