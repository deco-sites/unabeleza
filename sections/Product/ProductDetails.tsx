import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import { ShareProps } from "../../components/ui/Share.tsx";
import Tabs from "../../components/product/Tabs/index.tsx";
import { ProductShelfComponent } from "../../sections/Product/ProductShelf.tsx";
import { type Section as SectionType } from "@deco/deco/blocks";
import ReviewForm from "../../components/product/ProductReview/ReviewForm.tsx";
import Reviews from "../../components/product/ProductReview/Reviews.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  itemsShare: ShareProps
  productShelf: SectionType<ProductShelfComponent>;
}

export default function ProductDetails(props: Props) {
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

  const { productID, aggregateRating, review } = props?.page?.product
  console.log(review)
  console.log(aggregateRating)

  return (
    <>
      <Section.Container class="mobile:mt-[60px]">
        <Breadcrumb itemListElement={props.page.breadcrumbList.itemListElement} />
        <div class={clx(
            "flex gap-5",
            "mobile:flex-col w-full"
          )}
        >
          <div class="desktop:w-[45.13vw]">
            <ImageGallerySlider page={props.page} />
          </div>
          <div class="desktop:w-[45.13vw]">
            <ProductInfo {...props} />
          </div>
        </div>
        <div class="w-full desktop:max-w-[calc(100%_-_8.33%)] mx-auto">
          <Tabs page={props.page} />
        </div>
      </Section.Container>
      <Section.Container class="bg-[#F5F5F5] desktop:!h-[507px] !py-12">
        <div class={clx(
          "flex gap-20 mobile:gap-[26px] items-center w-full desktop:max-w-[calc(100%_-_8.33%)] h-full mx-auto",
          "mobile:flex-col-reverse"
        )}>
          <ReviewForm 
            productVariantId={Number(productID)}
            reviewCount={aggregateRating?.reviewCount}
            ratingValue={aggregateRating?.ratingValue} 
          />
          <Reviews reviews={review} aggregateRating={aggregateRating}/>
        </div>
      </Section.Container>
      <props.productShelf.Component {...props.productShelf.props} />
    </>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
