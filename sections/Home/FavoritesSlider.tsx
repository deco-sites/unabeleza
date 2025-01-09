import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

/** @title {{title}} */
interface ItemProps {
  title?: string;
  text?: string;
  image: ImageWidget;
  alt?: string;
  href?: string;
}

interface FavoritesSliderProps {
  items: ItemProps[];
  title?: string;
}

function SliderItem(props: ItemProps) {
  const params = { promotion_name: props.alt };

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  return (
    <a
      {...selectPromotionEvent}
      href={props.href}
      class="relative desktop:max-w-[var(--favoriteSlider-width)] desktop:max-h-[var(--favoriteSlider-heigh)] w-full h-hull max-w-[calc(100vw_-_40px)]group overflow-hidden"
      style={{
        "--favoriteSlider-width": `min(22.08vw, calc(96rem * 0.2208))`,
        "--favoriteSlider-heigh": `min(34.72vw, calc(96rem * 0.3472))`,
      }}
      aria-label={props?.alt}
    >
      <div class="absolute bottom-10 right-1/2 translate-x-1/2 z-20 w-[70.12%]">
        <h2 class="font-[PP-Hatton] font-bold text-xl text-white mb-2 mobile:text-lg">
          {props.title}
        </h2>
        <p class="text-sm text-white font-normal">{props.text}</p>
      </div>
      <div class="absolute bottom-0 z-10 w-full h-full bg-gradient-to-t from-[#1F1F1F80] to-transparent" />
      <Image
        src={props.image}
        alt={props.alt ?? props?.title}
        width={318}
        height={500}
        loading="lazy"
        class="w-full h-full object-cover group-hover:scale-125 transition-all duration-500"
      />
    </a>
  );
}

export default function FavoritesSlider(
  { items, title }: FavoritesSliderProps,
) {
  return (
    <div class="px-[min(4.16vw,63.89px)] py-16 w-full mobile:px-5 mobile:py-6 max-w-[96rem] mx-auto">
      <h2 class="font-[PP-Hatton] font-bold text-[30px] text-black mb-[34px] text-center mobile:hidden">
        {title}
      </h2>
      <Slider class="carousel carousel-center w-full gap-[1.11vw] h-full mx-auto desktop:justify-center mobile mobile:gap-0">
        {items.map((item, index) => (
          <Slider.Item index={index} class="carousel-item mobile:w-full">
            <SliderItem {...item} />
          </Slider.Item>
        ))}
      </Slider>
    </div>
  );
}
