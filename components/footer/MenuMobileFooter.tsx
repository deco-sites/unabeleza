import Image from "apps/website/components/Image.tsx";
import SocialMedia from "./components/SocialMedia.tsx";
import Developer from "./components/Developer.tsx";
import { Props } from "./types.ts";
import Accordion from "../../islands/Accordion.tsx";

export default function MenuMobileFooter(
  { logo, menus, social, paymentMethods, developerLogo }: Props,
) {
  return (
    <div class="bg-primary px-5 pt-6 pb-[31px] flex flex-col gap-6 items-center">
      {logo && <Image loading="lazy" src={logo} width={130} height={38} />}
      <div class="w-full">
        {menus?.map(({ title, items }) => (
          <Accordion title={title}>
            <ul class="flex flex-col gap-2 max-w-[174px]">
              {items.map(({ title, href }) => (
                <li>
                  <a
                    class="text-sm font-medium text-base-400"
                    href={href ?? "#"}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </Accordion>
        ))}
        {paymentMethods && (
          <Accordion title={paymentMethods?.title}>
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
          </Accordion>
        )}
      </div>
      <SocialMedia social={social} />
      <Developer {...developerLogo} />
    </div>
  );
}
