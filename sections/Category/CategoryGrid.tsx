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
  const device = useDevice();
  return (
    <a
      href={href}
      class="flex flex-col items-center justify-center gap-4 w-[var(--categoryCard-width)] mobile:w-[26.93vw]"
      style={{
        "--categoryCard-width": `min(9.30vw, calc(96rem * 0.0930))`,
      }}
    >
      <div
        class={clx(
          "w-[var(--categoryCardCircle-size)] h-[var(--categoryCardCircle-size)] rounded-full bg-neutral-100 flex justify-center items-center",
          "mobile:w-[23.96vw] mobile:h-[23.96vw]",
          "hover:bg-info"
        )}
        style={{
          "--categoryCardCircle-size": `min(8.33vw, calc(96rem * 0.0833))`
        }}
      >
        {device === "desktop"
          ? (<Icon
            id={icon}
            width="3.95vw"
            height="3.95vw"
            class="object-contain w-full h-auto max-w-[60.79px] max-h-[60.79px]"
          />)
          : (<Icon
            id={`${icon}Mobile`}
            width="11.25vw"
            height="11.25vw"
            class="object-contain w-full h-auto max-w-[11.25vw] max-h-[11.25vw]"
          />)
        }

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
          <div class="flex flex-nowrap justify-between w-full max-w-[96rem] mx-auto items-start">
            {items.map((i) => <Card {...i} />)}
          </div>
        )
        : (
          <Slider class="carousel carousel-center mobile:carousel-end gap-[4.26vw] w-full items-start">
            {items.map((i, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item last:pr-3",
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
