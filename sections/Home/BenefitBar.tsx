import { type RichText } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import Slider from "../../components/ui/Slider.tsx";

/** @title {{title}} */
export interface ItemBenefitBar {
  title?: string;
  icon?: string;
  text: RichText;
}

export interface BenefitBarProps {
  items: ItemBenefitBar[];
  /** @hide true */
  class?: string;
}

export default function BenefitBar({ items, class: _class }: BenefitBarProps) {
  return (
    <div
      class={clx(
        "w-full bg-[#DBB9F9]",
        _class,
      )}
    >
      <Slider class="carousel carousel-center w-full gap-[1.11vw] h-full mx-auto mobile mobile:gap-6 max-w-[96rem] flex desktop:gap-[6.59vw] items-center overflow-auto no-scrollbar px-[min(4.16vw,63.89px)] py-[10px] mobile:p-0 desktop:justify-center">
        {items &&
          items.map((item, index) => (
            <Slider.Item
              index={index}
              class="carousel-item mobile:w-full h-full flex gap-[10px] items-center justify-center mobile:py-[10px] mobile:min-w-[100vw]"
            >
              <Icon
                id={item?.icon!}
                width={30}
                height={30}
                class="object-contain"
              />
              <span
                class="text-sm whitespace-nowrap "
                dangerouslySetInnerHTML={{ __html: item.text }}
              />
            </Slider.Item>
          ))}
      </Slider>
    </div>
  );
}
