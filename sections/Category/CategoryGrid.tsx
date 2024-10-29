import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useDevice } from "@deco/deco/hooks";
import { type LoadingFallbackProps } from "@deco/deco";
import Icon from "../../components/ui/Icon.tsx";

/** @titleBy label */
export interface Item {
  href: string;
  label: string;
  icon: string;
}
export interface Props extends SectionHeaderProps {
  title: string;
  items: Item[];
}
function Card({ icon, href, label }: Item) {
  return (
    <a href={href} class="flex flex-col items-center justify-center gap-4 max-w-[134px] mobile:w-[100px]">
      <div class={clx(
        "w-[120px] h-[120px] rounded-full bg-neutral-100 flex justify-center items-center",
        "mobile:w-[90px] mobile:h-[90px]",
        "hover:bg-info"
        )}>
        <Icon
              id={icon}
              width={57}
              height={57}
              class="object-contain w-full h-auto max-w-[57px] max-h-[57px]"
            />
      </div>
      <span class="font-bold text-black text-center text-sm w-full">{label}</span>
    </a>
  );
}
function CategoryGrid({ title, items }: Props) {
  const device = useDevice();
  return (
    <Section.Container>
      <Section.Header title={title} />

      {device === "desktop"
        ? (
          <div class="flex flex-nowrap justify-between w-full">
            {items.map((i) => <Card {...i} />)}
          </div>
        )
        : (
          <Slider class="carousel carousel-center sm:carousel-end gap-5 w-full">
            {items.map((i, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  "first:pl-5 first:mobile:pl-0",
                  "last:pr-5 last:mobile:pr-0",
                )}
              >
                <Card {...i} />
              </Slider.Item>
            ))}
          </Slider>
        )}
    </Section.Container>
  );
}
export const LoadingFallback = (
  { title }: LoadingFallbackProps<Props>,
) => (
  <Section.Container>
    <Section.Header title={title} />
    <Section.Placeholder height="212px" />;
  </Section.Container>
);
export default CategoryGrid;
