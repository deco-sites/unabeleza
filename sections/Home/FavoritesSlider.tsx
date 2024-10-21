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
      class="relative max-w-[318px] max-h-[500px]"
      aria-label={props?.alt}
    >
      <div class="absolute bottom-10 right-1/2 translate-x-1/2 z-20 w-[70.12%]">
        <h2 class="font-[PP-Hatton] font-bold text-xl text-white mb-2">
          {props.title}
        </h2>
        <p class="text-sm text-white">{props.text}</p>
      </div>
      <div class="absolute bottom-0 z-10 w-full h-full bg-gradient-to-t from-[#1F1F1F80] to-transparent" />
      <Image
        src={props.image}
        alt={props.alt ?? props?.title}
        width={318}
        height={500}
        loading="lazy"
        class="w-full h-full object-cover"
      />
    </a>
  );
}

export default function FavoritesSlider(
  { items, title }: FavoritesSliderProps,
) {
  return (
    <div class="px-[60px] py-16 w-full">
      <h2 class="font-[PP-Hatton] font-bold text-[30px] text-black mb-[34px] text-center">
        {title}
      </h2>
      <Slider class="carousel carousel-center w-full gap-4 h-full mx-auto justify-center">
        {items.map((item, index) => (
          <Slider.Item index={index} class="carousel-item">
            <SliderItem {...item} />
          </Slider.Item>
        ))}
      </Slider>
    </div>
  );
}
