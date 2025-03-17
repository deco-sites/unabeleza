import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { useDevice } from "@deco/deco/hooks";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;

  /** @description mobile otimized image */
  mobile: ImageWidget;

  /** @description Image's alt text */
  alt: string;

  /** @description when user clicks on the image, go to this link */
  linkImage?: string;
}

export interface Props {
  images?: Banner[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;

  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean },
) {
  const {
    alt,
    mobile,
    desktop,
    linkImage,
  } = image;
  const params = { promotion_name: image.alt };

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  const viewPromotionEvent = useSendEvent({
    on: "view",
    event: { name: "view_promotion", params },
  });

  return (
    <a
      {...selectPromotionEvent}
      href={linkImage ?? "#"}
      aria-label={alt}
      class="relative block overflow-y-hidden w-full"
    >
      <Picture preload={lcp} {...viewPromotionEvent}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={412}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1440}
        />
        <img
          class="object-fill w-full h-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

function Carousel({ images = [], preload, interval }: Props) {
  const id = useId();
  const device = useDevice();

  return (
    <div
      id={id}
      class={clx(
        "relative grid",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-[32px_1fr_32px] h-fit max-w-full",
        "mobile:grid-cols-[112px_1fr_112px] mobile:min-h-min",
        "w-screen mobile:mt-[96px]",
      )}
    >
      <div class="col-span-full row-span-full">
        <Slider class="carousel carousel-center w-full gap-6 h-full">
          {images.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full h-full">
              <BannerItem image={image} lcp={index === 0 && preload} />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <div class="absolute top-1/2 transform -translate-y-1/2 left-5 flex items-center justify-center z-10">
        <Slider.PrevButton
          class={clx(
            "flex justify-center items-center w-[50px] h-[50px] bg-white btn btn-sm btn-circle no-animation shadow-custom",
            "disabled:invisible mobile:w-8 mobile:h-8 hover:bg-info",
          )}
          disabled={false}
        >
          <Icon
            id="chevron-right"
            width={device === "desktop" ? 12 : 8}
            height={device === "desktop" ? 22 : 16}
            stroke="#8F2AED"
            class="rotate-180"
          />
        </Slider.PrevButton>
      </div>

      <div class="absolute top-1/2 transform -translate-y-1/2 right-5 flex items-center justify-center z-10">
        <Slider.NextButton
          class={clx(
            "flex justify-center items-center w-[50px] h-[50px] bg-white btn btn-sm btn-circle no-animation shadow-custom",
            "disabled:invisible mobile:w-8 mobile:h-8 hover:bg-info",
          )}
          disabled={false}
        >
          <Icon
            id="chevron-right"
            width={device === "desktop" ? 12 : 8}
            height={device === "desktop" ? 22 : 16}
            stroke="#8F2AED"
          />
        </Slider.NextButton>
      </div>

      <ul
        class={clx(
          "col-span-full row-start-4 z-10",
          "carousel justify-center gap-[10px] items-end mb-8",
        )}
      >
        {images.map((_, index) => (
          <li class="carousel-item">
            <Slider.Dot
              index={index}
              class={clx(
                "bg-white h-1 w-8 no-animation rounded-[1px]",
                "disabled:bg-secondary disabled:opacity-100 transition-[width]",
              )}
            >
            </Slider.Dot>
          </li>
        ))}
      </ul>

      <Slider.JS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default Carousel;
