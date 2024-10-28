import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { clx } from "../../sdk/clx.ts";

/** @title {{title}} */
interface ItemProps {
    title?: string;
    image: ImageWidget;
    alt?: string;
    href?: string;
    btn?: boolean
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
            class="relative w-full h-hull max-w-[var(--custom-width)] mobile:w-full mobile:max-w-[var(--mobile-max-width)] group overflow-hidden"
            style={{
                "--custom-width": `min(429px, calc((100vw - 120px - 32px) / 3))`,
                "--mobile-max-width": "calc(100vw - 40px)"
            }}
        >
            <div class="absolute bottom-10 left-10 z-20 w-4/5 mobile:bottom-[60px] mobile:left-[60px]">
                <h2 class="font-[PP-Hatton] font-bold text-[28px] text-white mb-3 mobile:text-xl">
                    {props.title}
                </h2>
                {
                    btn && (
                        <a class={clx(
                            "btn bg-black text-info text-sm whitespace-nowrap border-0 font-bold rounded-[5px] py-3 px-10 max-w-[187px] w-full h-[45px] !min-h-0",
                            "hover:bg-[#1A1A1A] "
                        )}
                        href={props.href}
                        aria-label={props?.alt}
                        >
                            VER COLEÇÃO
                        </a>
                    )
                }

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
    return (
        <div class="px-[60px] py-16 w-full mobile:px-5 mobile:py-6">
            <h2 class="font-[PP-Hatton] font-bold text-[30px] text-black mb-[34px] text-center mobile:hidden">
                {title}
            </h2>
            <Slider class="carousel carousel-center w-full !justify-between h-full mx-auto mobile mobile:gap-4">
                {items.map((item, index) => (
                    <Slider.Item index={index} class="carousel-item">
                        <SliderItem {...item} />
                    </Slider.Item>
                ))}
            </Slider>
        </div>
    );
}
