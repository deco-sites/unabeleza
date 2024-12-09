import { type RichText } from "apps/admin/widgets.ts";
import Icon from "../../components/ui/Icon.tsx";

/** @title {{title}} */
interface item {
  title?: string;
  icon?: string;
  text: RichText;
}

interface BenefitBarProps {
  items: item[];
}

export default function BenefitBar({ items }: BenefitBarProps) {
  return (
    <div class="w-full bg-primary">
      <div class="w-full max-w-[96rem] flex justify-between desktop:gap-[6.59vw] items-center overflow-auto no-scrollbar mx-auto px-[60px] py-[10px] mobile:p-0 ">
        {items &&
          items.map((item) => (
            <div class="flex gap-[10px] items-center justify-center mobile:py-[10px] mobile:min-w-[100vw]">
              <Icon
                id={item?.icon}
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
