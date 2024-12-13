import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductImageZoom from "./ProductImageZoom.tsx";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const WIDTH = 820;
const HEIGHT = 615;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();
  const zoomId = `${id}-zoom`;

  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }

  const { page: { product: { name, isVariantOf, image: pImages } } } = props;

  // Filter images when image's alt text matches product name
  // More info at: https://community.shopify.com/c/shopify-discussions/i-can-not-add-multiple-pictures-for-my-variants/m-p/2416533
  const groupImages = isVariantOf?.image ?? pImages ?? [];
  const filtered = groupImages.filter((img) =>
    name?.includes(img.alternateName || "")
  );
  const images = filtered.length > 0 ? filtered : groupImages;
  const device = useDevice();

  return (
    <>
      <div
        id={id}
        class="grid grid-flow-col grid-cols-[min-content_1fr] gap-5 mobile:flex mobile:flex-col"
      >
        {/* Image Slider */}
        <div class={clx(
          "col-span-1 col-start-2",
        )}>
          <div class="relative h-min flex-grow">
            <Slider class="carousel carousel-center gap-6 w-full">
              {images.map((img, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-full"
                >
                  <Image
                    class="w-full object-contain"
                    sizes="(max-width: 640px) 100vw, 40vw "
                    style={{ aspectRatio: ASPECT_RATIO }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={WIDTH}
                    height={HEIGHT}
                    // Preload LCP image for better web vitals
                    preload={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </Slider.Item>
              ))}
            </Slider>

            <div class="absolute top-2 right-2 bg-base-100 rounded-full">
              <label class="btn btn-ghost hidden sm:inline-flex" for={zoomId}>
                <Icon id="pan_zoom" />
              </label>
            </div>
          </div>
        </div>


        {/* Dots */}
        <div class={clx(
          "col-start-1 col-span-1 mobile:flex mobile:justify-center flex flex-col desktop:gap-10 desktop:items-center",
        )}>

          <Slider.PrevButton class="mobile:hidden no-animation btn btn-circle hover:bg-transparent hover:border-[#8F2AED] border border-[#8F2AED]">
            <Icon id="arrow-top" stroke="#8F2AED" width={20} height={12} />
          </Slider.PrevButton>

          <ul
            class={clx(
              "carousel carousel-center",
              "desktop:carousel-vertical",
              "gap-2 desktop:gap-10",
              "max-w-full items-center mobile:justify-center",
              "overflow-x-auto",
              "overflow-y-auto",
            )}
            style={{ maxHeight: "600px" }}
          >
            {images.map((img, index) => (
              <li class="carousel-item desktop:w-16 desktop:h-16">
                {
                  device === "desktop"
                    ? (
                      <Slider.Dot index={index}>
                        <Image
                          style={{ aspectRatio: "1 / 1" }}
                          class="group-disabled:border-primary border-2 border-[#F5F5F5] rounded object-cover w-full h-full"
                          width={64}
                          height={64}
                          src={img.url!}
                          alt={img.alternateName}
                        />
                      </Slider.Dot>
                    )
                    : (
                      <Slider.Dot
                        index={index}
                        class={clx(
                          "bg-[#EBECF0] h-1 w-8 no-animation rounded-[1px]",
                          "disabled:bg-primary disabled:opacity-100 transition-[width]"
                        )}
                      />
                    )
                }
              </li>
            ))}
          </ul>
          <Slider.NextButton class="mobile:hidden no-animation btn btn-circle hover:bg-transparent hover:border-[#8F2AED] border border-[#8F2AED]">
            <Icon id="arrow-bottom" stroke="#8F2AED" width={20} height={12} />
          </Slider.NextButton>
        </div>

        <Slider.JS rootId={id} />
      </div>
      <ProductImageZoom
        id={zoomId}
        images={images}
        width={700}
        height={Math.trunc(700 * HEIGHT / WIDTH)}
      />
    </>
  );
}
