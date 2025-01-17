import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Alert from "../../components/header/Alert.tsx";
import Bag from "../../components/header/Bag.tsx";
import NavItem from "../../components/header/NavItem.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import { useDevice } from "@deco/deco/hooks";
import { type LoadingFallbackProps } from "@deco/deco";
import MenuMobile from "../../components/header/MenuMobile.tsx";
export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface SectionProps {
  alerts?: HTMLWidget[];
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;
  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;
  /** @title Logo */
  logo: Logo;
  /**
   * @description Usefull for lazy loading hidden elements, like hamburguer menus etc
   * @hide true */
  loading?: "eager" | "lazy";
}
type Props = Omit<SectionProps, "alert">;
const Desktop = ({ navItems, logo, searchbar, loading }: Props) => (
  <>
    <div class="flex flex-col gap-4 pt-5 container border-b border-gray-300 px-[min(4.16vw,63.89px)] max-w-[96rem]">
      <div class="grid grid-cols-2 place-items-center">
        <div class="place-self-start">
          <a href="/" aria-label="Store logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={74}
              height={66}
            />
          </a>
        </div>

        <div class="flex items-center gap-10 w-full">
          {loading === "lazy"
            ? (
              <div class="flex justify-center items-center">
                <span class="loading loading-spinner" />
              </div>
            )
            : <Searchbar {...searchbar} placeholder="Faça sua busca aqui" />}

          <div class="flex gap-5 items-center">
            <a href="/listadesejos"> <Icon id="heart" class="cursor-pointer" /></a>
            <a href="/login"><Icon id="user" class="cursor-pointer" /></a>
            <Bag />
          </div>
        </div>
      </div>

      <div class="flex items-center">
        <ul class="flex w-full justify-between bg-white items-center h-[45px] border-y border-neutral-100">
          {navItems?.slice(0, 10).map((item) => <NavItem item={item} />)}
        </ul>
        <div>
          {/* ship to */}
        </div>
      </div>
    </div>
  </>
);
const Mobile = ({ logo, searchbar, navItems, loading }: Props) => (
  <>
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside drawer={SIDEMENU_DRAWER_ID}>
          {loading === "lazy"
            ? (
              <div
                id={SIDEMENU_CONTAINER_ID}
                class="h-full flex items-center justify-center"
              >
                <span class="loading loading-spinner" />
              </div>
            )
            : <MenuMobile navItems={navItems} />}
        </Drawer.Aside>
      }
    />

    <div
      class="flex place-items-center justify-between w-screen px-5 my-4 gap-4 relative"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
        gridTemplateColumns:
          "min-content auto min-content min-content min-content",
      }}
    >
      <label
        for={SIDEMENU_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="open menu"
      >
        <Icon id="menu" />
      </label>

      {logo && (
        <a
          href="/"
          class="flex-grow absolute right-2/4 translate-x-1/2"
          style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
          aria-label="Store logo"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={57}
            height={50.26}
          />
        </a>
      )}
      <div class="flex gap-[10px] items-center">
        <Icon id="heart" />
        <a href="/login"><Icon id="user"/></a>
        <Bag />
      </div>
    </div>
    <div class="flex place-items-center w-screen px-5 my-4 gap-4">
      {loading === "lazy"
        ? (
          <div class="flex justify-center items-center">
            <span class="loading loading-spinner" />
          </div>
        )
        : <Searchbar {...searchbar} placeholder="Faça sua busca aqui" />}
    </div>
  </>
);
function Header({
  alerts = [],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/2291/986b61d4-3847-4867-93c8-b550cb459cc7",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();
  return (
    <header
      style={{
        height: device === "desktop"
          ? HEADER_HEIGHT_DESKTOP
          : HEADER_HEIGHT_MOBILE,
      }}
    >
      <div class="bg-base-100 fixed w-full z-40">
        {alerts && <Alert alerts={alerts} />}
        {device === "desktop"
          ? <Desktop logo={logo} {...props} />
          : <Mobile logo={logo} {...props} />}
      </div>
    </header>
  );
}
export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...props as any} loading="lazy" />
);
export default Header;
