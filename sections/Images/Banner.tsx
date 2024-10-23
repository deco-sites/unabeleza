import { type RichText, type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";


interface ImageProps {
  title?: string;
  description?: RichText;
  mobile: {img: ImageWidget, w?: number, h?: number};
  desktop: {img: ImageWidget, w?: number, h?: number};
  contentPosition?: "start" | "end";
  cta?: {
    href?: string;
    label?: string;
  };

}

export interface Props {
  title: string;
  images: ImageProps[]
}

function Banner({ images }: Props) {
  return (

      <div class="flex desktop:gap-4 mobile:flex-col">
        {
          images.map(image => (
            <div class="relative bg-base-200 flex-auto w-full">
              <Picture>
                <Source
                  media="(max-width: 1025px)"
                  src={image.mobile.img}
                  width={image.mobile.w ?? 375}
                  height={image.mobile.h ?? 469}
                />
                <Source
                  media="(min-width: 1026px)"
                  src={image.desktop.img}
                  width={image.desktop.w ?? 712}
                  height={image.desktop.h ?? 405}
                />
                <img src={image.desktop.img} alt={image.title} class="w-full h-full object-contain" />
              </Picture>

              <div
                class={clx(
                  "absolute top-[44.07%] -translate-y-1/2 flex flex-col gap-8 h-fit max-w-[250px]",
                  image.contentPosition === "end" ? "right-[60px]" : "left-[60px]"
              )}
              >
                {image.title && <h2 class="font-bold font-[PP-Hatton] text-[28px] leading-[34px] text-black w-full">{image.title}
                </h2>}
                {image.description && (
                  <span
                    class="font-normal text-[18px] leading-[27px] text-black w-full"
                    dangerouslySetInnerHTML={{ __html: image.description }}
                  />
                )}
                <div class="">
                  {image.cta && (
                    <a
                      href={image.cta.href}
                      class="btn bg-black text-[#A3E3FF] no-animatio w-fit border-0 rounded-[5px] min-h-[45px] min-w-[165px]"
                    >
                      {image.cta.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        }
      </div>

  );
}

export const LoadingFallback = () => <Section.Placeholder height="405px" />;

export default Banner;
