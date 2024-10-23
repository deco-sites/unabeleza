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
    <div class="w-full flex px-[60px] py-[10px] justify-between bg-primary mobile:p-0 mobile:overflow-auto no-scrollbar">
      {items &&
        items.map((item) => (
          <div class="flex gap-[10px] items-center mobile:px-[57px] mobile:py-[10px]">
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
  );
}
