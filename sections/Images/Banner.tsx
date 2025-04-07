import { type ImageWidget, type RichText } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

interface ImageProps {
  title?: string;
  description?: RichText;
  mobile: { img: ImageWidget; w?: number; h?: number };
  desktop: { img: ImageWidget; w?: number; h?: number };
  contentPosition?: "start" | "end";
  cta?: {
    href?: string;
    label?: string;
  };
  link?: string;
}

export interface Props {
  title: string;
  images: ImageProps[];
}

function Banner({ images }: Props) {
  return (
    <div class="flex desktop:gap-4 mobile:flex-col">
      {images.map((image) => (
        image.link ? (
          <a href={image.link} target="_blank" class="relative bg-base-200 flex-auto w-full">
            <Picture>
              <Source
                media="(max-width: 1025px)"
                src={image.mobile.img}
                width={image.mobile.w ?? 375}
                height={image.mobile.h}
              />
              <Source
                media="(min-width: 1026px)"
                src={image.desktop.img}
                width={image.desktop.w ?? 712}
                height={image.desktop.h}
              />
              <img
                src={image.desktop.img}
                alt={image.title}
                class="w-full h-full object-contain"
              />
            </Picture>

            <div
              class={clx(
                "absolute top-[44.07%] -translate-y-1/2 flex flex-col gap-8 h-fit max-w-[250px]",
                "mobile:gap-5 mobile:-translate-y-0",
                image.contentPosition === "end"
                  ? "right-[60px] mobile:top-auto mobile:bottom-10 mobile:left-10 mobile:max-w-[298px]"
                  : "left-[60px] mobile:top-10 mobile:left-10 mobile:max-w-[235px]",
              )}
            >
              {image.title && (
                <h2
                  class={clx(
                    "font-bold font-[PP-Hatton] text-[28px] leading-[34px] text-black w-full",
                    "mobile:text-xl mobile:leading-6",
                  )}
                >
                  {image.title}
                </h2>
              )}
              {image.description && (
                <span
                  class={clx(
                    "font-normal text-lg leading-7 text-black w-full",
                    "mobile:text-base mobile:leading-6",
                    image.contentPosition === "end" && "mobile:whitespace-nowrap",
                  )}
                  dangerouslySetInnerHTML={{ __html: image.description }}
                />
              )}
              {image.cta?.label && (
                <div class="">
                  <a
                    href={image.cta.href}
                    class={clx(
                      "btn bg-black text-[#A3E3FF] no-animatio w-fit border-0 rounded-[5px] min-h-[45px] min-w-[165px] hover:bg-[#1A1A1A]",
                      "mobile:max-w-[165px] mobile:h-[45px] mobile:py-3 mobile:px-10 mobile:text-sm",
                    )}
                  >
                    {image.cta.label}
                  </a>
                </div>
              )}
            </div>
          </a>
        ) : (
          <div class="relative bg-base-200 flex-auto w-full">
            <Picture>
              <Source
                media="(max-width: 1025px)"
                src={image.mobile.img}
                width={image.mobile.w ?? 375}
                height={image.mobile.h}
              />
              <Source
                media="(min-width: 1026px)"
                src={image.desktop.img}
                width={image.desktop.w ?? 712}
                height={image.desktop.h}
              />
              <img
                src={image.desktop.img}
                alt={image.title}
                class="w-full h-full object-contain"
              />
            </Picture>

            <div
              class={clx(
                "absolute top-[44.07%] -translate-y-1/2 flex flex-col gap-8 h-fit max-w-[250px]",
                "mobile:gap-5 mobile:-translate-y-0",
                image.contentPosition === "end"
                  ? "right-[60px] mobile:top-auto mobile:bottom-10 mobile:left-10 mobile:max-w-[298px]"
                  : "left-[60px] mobile:top-10 mobile:left-10 mobile:max-w-[235px]",
              )}
            >
              {image.title && (
                <h2
                  class={clx(
                    "font-bold font-[PP-Hatton] text-[28px] leading-[34px] text-black w-full",
                    "mobile:text-xl mobile:leading-6",
                  )}
                >
                  {image.title}
                </h2>
              )}
              {image.description && (
                <span
                  class={clx(
                    "font-normal text-lg leading-7 text-black w-full",
                    "mobile:text-base mobile:leading-6",
                    image.contentPosition === "end" && "mobile:whitespace-nowrap",
                  )}
                  dangerouslySetInnerHTML={{ __html: image.description }}
                />
              )}
              {image.cta?.label && (
                <div class="">
                  <a
                    href={image.cta.href}
                    class={clx(
                      "btn bg-black text-[#A3E3FF] no-animatio w-fit border-0 rounded-[5px] min-h-[45px] min-w-[165px] hover:bg-[#1A1A1A]",
                      "mobile:max-w-[165px] mobile:h-[45px] mobile:py-3 mobile:px-10 mobile:text-sm",
                    )}
                  >
                    {image.cta.label}
                  </a>
                </div>
              )}
            </div>
          </div>)
      ))}
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="405px" />;

export default Banner;
