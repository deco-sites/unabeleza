import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
// import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

/** @titleBy title */
interface Item {
  title: string;
  href?: string;
}

/** @titleBy title */
interface Link extends Item {
  children: Item[];
}

/** @titleBy alt */
interface Social {
  alt?: string;
  href?: string;
  image: ImageWidget;
}

interface Props {
  links?: Link[];
  social?: Social[];
  paymentMethods?: Social[];
  policies?: Item[];
  logo?: ImageWidget;
  trademark?: string;
}

function Footer({
  links = [],
  social = [],
  paymentMethods = [],
  logo,
}: Props) {

  return (
    <footer class="bg-primary pt-[57.63px] pb-[39.2px]">
      <div class={clx(
        "px-[60px] flex flex-col",
        "mobile:px-5"
      )}>
        <div class="flex justify-between">

          <div class="flex flex-col flex-[1]">
            {logo && (<Image loading="lazy" src={logo} width={130} height={38} />) }
            <div>
              <span class="">Redes sociais</span>
              <ul class="flex gap-4">
                {social.map(({ image, href, alt }) => (
                  <li>
                    <a href={href}>
                      <Image
                        src={image}
                        alt={alt}
                        loading="lazy"
                        width={25}
                        height={25}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div class="flex flex-[3]">
            <ul class="flex justify-evenly w-full">
              {links.map(({ title, children }) => (
                <li class="flex flex-col gap-4">
                  <h3 class="text-base font-semibold" >{title}</h3>
                  <ul class="flex flex-col gap-2 max-w-[174px]">
                    {children.map(({ title, href }) => (
                      <li>
                        <a class="text-sm font-medium text-base-400" href={href}>
                          {title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div class="flex flex-col flex-[1]">
            <h3 class="text-base font-semibold">Formas de pagamento</h3>
            <ul class="grid grid-cols-5 auto-rows-auto gap-x-[6px] gap-y-[10px] w-fit">
              {paymentMethods.map(({ image, alt }) => (
                <li class="h-8 w-10 border border-base-100 rounded flex justify-center items-center">
                  <Image
                    src={image}
                    alt={alt}
                    width={20}
                    height={20}
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div class="flex justify-center">
          logo econverse
        </div>
      </div>
    </footer>
  )
}

export const LoadingFallback = () => <Section.Placeholder height="1145px" />;

export default Footer;
