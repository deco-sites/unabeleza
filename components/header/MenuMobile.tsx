import Icon from "../../components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Drawer from "../ui/Drawer.tsx";
import { type LoadingFallbackProps } from "@deco/deco";

export const LoadingFallback = (props: LoadingFallbackProps<MenuItemProps>) => (
  // deno-lint-ignore no-explicit-any
  <MenuItem {...props as any} loading="lazy" />
);

export interface Props {
  navItems?: SiteNavigationElement[];
}

export interface MenuItemProps {
  item: SiteNavigationElement;
  loading?: "eager" | "lazy";
}

function MenuItem({ item, loading }: MenuItemProps) {
  if (item.children && item.children.length > 0) {
    const seeAll = {
      name: "ver todos",
      url: item.url,
    };

    const exists = item.children.some((leaf) => leaf.name === seeAll.name);

    if (!exists) {
      item.children.push(seeAll);
    }

    return (
      <>
        <Drawer
          id={item.name}
          aside={
            <Drawer.Aside title={item.name} drawer={item.name} url={item.url}>
              <div
                class="flex flex-col h-full overflow-y-auto"
                code
                style={{ minWidth: "299px" }}
              >
                {loading === "lazy"
                  ? (
                    <div class="h-full w-full flex items-center justify-center">
                      <span class="loading loading-spinner" />
                    </div>
                  )
                  : (
                    <ul class="flex-grow flex flex-col divide-y divide-base-200 overflow-y-auto">
                      {item.children.map((leaf) => {
                        if (leaf?.children) {
                          return <MenuItem item={leaf} />;
                        }

                        return (
                          <li class="group">
                            <a
                              class="collapse border-b border-neutral-100"
                              href={leaf.url}
                            >
                              <div class="collapse-title group-last:text-primary group-last:font-bold group-last:underline">
                                {leaf.name}
                              </div>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
              </div>
            </Drawer.Aside>
          }
        />

        <label
          for={item.name}
          aria-label="open menu"
        >
          <div class="collapse border-b border-neutral-100">
            <div class="collapse-title flex justify-between p-5 items-center">
              {item.name}
              <Icon id="drawerArrowRight" width={8} height={14} />
            </div>
          </div>
        </label>
      </>
    );
  }

  return (
    <a class="collapse border-b border-neutral-100" href={item.url}>
      <div class="collapse-title">
        {item.name}
      </div>
    </a>
  );
}

function MenuMobile({ navItems = [] }: Props) {
  return (
    <div
      class="flex flex-col h-full overflow-y-auto"
      style={{ minWidth: "300px" }}
    >
      <ul class="flex-grow flex flex-col divide-y divide-base-200 overflow-y-auto">
        {navItems.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuMobile;
