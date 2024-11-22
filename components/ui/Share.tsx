import { useDevice, useScript } from "@deco/deco/hooks";
import { clx } from "../../sdk/clx.ts";
import Icon from "./Icon.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/** @title {{name}} */
interface ShareItem {
    name: string;
    image: ImageWidget;
    url: string;
}

export interface ShareProps {
    items?: ShareItem[]
}

const onClick = (shareURL: string) => {
    const pageUrl = window.location.href

    const href = shareURL
      .replace('{{url}}', pageUrl)
      .replace('{{is_video}}', 'false')

    try{
        window.open(href, '_blank');
    } catch {
        throw new Error("URL do item não encontrada.")
    }
  };

export default function Share({ items }: ShareProps) {
    const device = useDevice();
    return (
        <details id="shareComponent" class={clx(
            "space-y-2 dropdown"
        )}>
            <summary
                aria-label="Share"
                class={clx(
                    "btn btn-circle no-animation w-[49px] h-[49px] mobile:w-8 mobile:h-8 shadow-custom-2",
                    "btn-ghost btn-sm hover:bg-info text-transparent"
                )}
            >
                <Icon
                    id="share"
                    class="[.htmx-request_&]:hidden"
                    fill="none"
                    width={device === "desktop" ? 20 : 15}
                    height={device === "desktop" ? 20 : 15}
                    stroke="#707070"
                />
                <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
            </summary>

            {items && (
                <ul className="dropdown-content flex flex-col gap-2 items-center w-full">
                {items.map((item) => (
                    <li key={item.name}>
                    <button             
                        hx-on:click={useScript(onClick, item.url)}
                        data-wishlist-button
                        aria-label={`Share in ${item.name}`}
                        class={clx(
                            "btn min-h-0 btn-circle no-animation w-[30px] h-[30px] mobile:w-8 mobile:h-8 shadow-custom-2",
                            "btn-ghost btn-sm hover:bg-info text-transparent"
                        )}
                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={16}
                            height={16}
                            style={{ aspectRatio: 4 / 4 }}
                            loading="lazy"
                        />
                    </button>
                    </li>
                ))}
                </ul>
            )}
        </details>
    );
}