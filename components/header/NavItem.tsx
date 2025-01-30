import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { HEADER_HEIGHT_DESKTOP } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";

function NavItem({ item }: { item: SiteNavigationElement }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];
  const uniqueIdentifiers = [
    ...new Set(children.map((node) => node.identifier)),
  ];

  if (children && children.length > 0) {
    const seeAll = {
      name: "ver todos",
      url: url,
    };

    const exists = children.some((leaf) => leaf.name === seeAll.name);

    if (!exists) {
      children.push(seeAll);
    }
  }

  return (
    <li class="group flex items-center hover:border-b-2 last:hover:border-b-0 border-black mb-[1px] justify-center last:bg-[#DBB9F9] h-[29px] last:rounded-[5px] last:py-1 last:px-3">
      <a
        href={url}
        class="group-last:font-bold group-hover:font-bold text-sm font-normal leading-[21px]"
      >
        {name}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={clx(
              "fixed hidden shadow-custom max-h-[calc(100vh-186.2px)] max-w-[96rem] overflow-y-auto hover:flex group-hover:flex",
              "bg-base-100 z-40 items-start justify-between gap-6 border-t-2 border-b-2 border-base-200 w-screen px-[min(4.16vw,63.89px)] py-6 h-fit",
            )}
            style={{
              top: "10.2px",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: HEADER_HEIGHT_DESKTOP,
            }}
          >
            {uniqueIdentifiers.map((uniIdentifier) => (
              <ul class="grid grid-cols-[repeat(auto-fit,_minmax(18%,_1fr))] gap-x-6 gap-y-2 container w-full m-0">
                {children.filter((node) => node.identifier === uniIdentifier)
                  .map((node) => (
                    <li class="flex flex-col gap-3 group">
                      <a class="cursor-pointer" href={node.url}>
                        <span class="font-bold text-xs group-last:text-primary group-last:font-bold group-last:underline">
                          {node.name}
                        </span>
                      </a>
                      {node.children && node.children.length > 0 && (
                           <ul class="flex flex-col gap-2">
                           {node.children?.map((leaf) => (
                             <li class="group">
                               <a
                                 class="hover:underline cursor-pointer"
                                 href={leaf.url}
                               >
                                 <span class="text-xs group-last:text-primary group-last:font-bold group-last:underline">
                                   {leaf.name}
                                 </span>
                               </a>
                             </li>
                           ))}
                         </ul>
                      )}
                    </li>
                  ))}
              </ul>
            ))}

            {image?.url && (
              <Image
                class="h-auto max-h-[420px] w-auto max-w-[32.65%] object-contain"
                src={image.url}
                alt={image.alternateName}
                width={231}
                height={220}
                loading="lazy"
              />
            )}
          </div>
        )}
    </li>
  );
}

export default NavItem;
