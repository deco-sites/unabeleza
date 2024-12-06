import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";

/** @title {{title}} */
interface ItemProps {
  title?: string;
  image: ImageWidget;
  alt?: string;
  href?: string;
  btn?: boolean;
}

interface FavoritesSliderProps {
  items: ItemProps[];
  title?: string;
}

function SliderItem({ btn = false, ...props }: ItemProps) {
  const params = { promotion_name: props.alt };
  const WIDTH = 429;
  const HEIGHT = 565;
  const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  return (
    <div
      {...selectPromotionEvent}
      class="relative desktop:max-w-[var(--bannerSlider-width)] desktop:max-h-[var(--bannerSlider-heigh)] w-full h-full max-w-[calc(100vw_-_40px)] group overflow-hidden"
      style={{
        "--bannerSlider-width": `min(29.79vw, calc(96rem * 0.2979))`,
        "--bannerSlider-heigh": `min(39.23vw, calc(96rem * 0.3923))`,
      }}
    >
      <div class="absolute bottom-10 left-10 z-20 w-4/5 mobile:bottom-[60px] mobile:left-[60px]">
        <h2 class="font-[PP-Hatton] font-bold text-[28px] text-white mb-3 mobile:text-xl">
          {props.title}
        </h2>
        {btn && (
          <a
            class={clx(
              "btn bg-black text-info text-sm whitespace-nowrap border-0 font-bold rounded-[5px] py-3 px-10 max-w-[187px] w-full h-[45px] !min-h-0",
              "hover:bg-[#1A1A1A] ",
            )}
            href={props.href}
            aria-label={props?.alt}
          >
            VER COLEÇÃO
          </a>
        )}
      </div>
      <div class="absolute bottom-0 z-10 w-full h-full bg-gradient-to-t from-[#1F1F1F80] to-transparent" />
      <Image
        src={props.image}
        alt={props.alt ?? props?.title}
        width={WIDTH}
        height={HEIGHT}
        style={{ aspectRatio: ASPECT_RATIO }}
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-125 transition-all duration-500"
      />
    </div>
  );
}

export default function BannerSlider(
  { items, title }: FavoritesSliderProps,
) {
  const id = useId();

  return (
    <div id={id} class={clx(
      "px-[60px] py-16 w-full mobile:px-5 mobile:py-6 max-w-[96rem] mx-auto",
      "mobile:grid",
      "mobile:grid-rows-[1fr_32px_1fr_64px]",
      "w-screen",
    )}>
      {title && (
        <h2 class="font-[PP-Hatton] font-bold text-[30px] text-black mb-[34px] text-center mobile:hidden">
          {title}
        </h2>
      )}
      <div class="col-span-full row-span-full">
        <Slider class="carousel carousel-center w-full desktop:!justify-between gap-[1.11vw] h-full mx-auto mobile mobile:gap-6">
          {items.map((item, index) => (
            <Slider.Item index={index} class="carousel-item mobile:w-full h-full">
              <SliderItem {...item} />
            </Slider.Item>
          ))}
        </Slider>
      </div>
      <ul
        class={clx(
          "col-span-full row-start-4 z-10 desktop:hidden",
          "carousel justify-center gap-[10px] items-end mb-8",
        )}
      >
        {items.map((_, index) => (
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

      <Slider.JS rootId={id} infinite />
    </div>
  );
}
