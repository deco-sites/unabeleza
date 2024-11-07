import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import SocialMedia from "./components/SocialMedia.tsx";
import Developer from "./components/Developer.tsx";
import { Props } from "./types.ts";

export default function MenuDesktopFooter(
  { logo, menus, social, paymentMethods, developerLogo }: Props,
) {
  return (
    <div class="bg-primary pt-[57.63px] pb-[39.2px]">
      <div
        class={clx(
          "px-[60px] flex flex-col gap-12",
          "mobile:px-5",
        )}
      >
        <div class="flex justify-between">
          <div class="flex flex-col flex-[1] gap-[38px]">
            {logo && (
              <Image
                loading="lazy"
                src={logo}
                width={130}
                height={38}
              />
            )}
            <SocialMedia social={social} />
          </div>

          <div class="flex flex-[3]">
            <ul class="flex justify-evenly w-full">
              {menus?.map(({ title, items }) => (
                <li class="flex flex-col gap-4">
                  <h3 class="font-[PP-Hatton] text-sm font-bold">{title}</h3>
                  <ul class="flex flex-col gap-2 max-w-[174px]">
                    {items.map(({ title, href }) => {
                      const newTitle = title.includes("strong") ? title : title.replace(/<\/?p>/g, "") ;
                      return (
                        <li>
                        <a
                          class="text-sm font-medium text-base-400 flex gap-[5px]"
                          href={href}
                          dangerouslySetInnerHTML={{ __html: newTitle }}
                        />
                      </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div class="flex flex-col flex-[1] gap-4">
            <h3 class="font-[PP-Hatton] text-sm font-bold">
              {paymentMethods?.title}
            </h3>
            <ul class="grid grid-cols-5 auto-rows-auto gap-x-[6px] gap-y-[10px] w-fit">
              {paymentMethods?.items?.map(({ image, alt }) => (
                <li class="h-5 w-[35px] border border-base-100 bg-white rounded flex justify-center items-center">
                  <Image
                    src={image}
                    alt={alt}
                    width={20}
                    height={20}
                    loading="lazy"
                    class="max-w-[26px] w-auto max-h-4 h-auto"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div class="flex justify-center">
          <Developer {...developerLogo} />
        </div>
      </div>
    </div>
  );
}
