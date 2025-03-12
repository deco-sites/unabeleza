import { type RichText } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";

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
      <div class="w-fit max-w-[96rem] flex justify-between desktop:gap-[6.59vw] items-center overflow-auto no-scrollbar mx-auto px-[min(4.16vw,63.89px)] py-[10px] mobile:p-0 ">
        {items &&
          items.map((item) => (
            <div class="flex gap-[10px] items-center justify-center mobile:py-[10px] mobile:min-w-[100vw]">
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
            </div>
          ))}
      </div>
    </div>
  );
}
