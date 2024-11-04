import { Props } from "./types.ts";
import { useDevice } from "@deco/deco/hooks";
import MenuDesktopFooter from "./MenuDesktopFooter.tsx";
import MenuMobileFooter from "./MenuMobileFooter.tsx";
import Section from "../ui/Section.tsx";
import { RichText } from "apps/admin/widgets.ts";
import { clx } from "../../sdk/clx.ts";

interface FooterProps extends Props {
  copyright: RichText
}

export default function Footer({ copyright, ...props }: FooterProps) {
  const device = useDevice();
  return (
    <footer>
      {
        device === "desktop"
        ? ( <MenuDesktopFooter {...props} /> )
        : ( <MenuMobileFooter {...props} /> )
      }
      <div class={clx(
        "bg-[#DBB9F9] px-[60px] py-[10px] h-[56px]",
        "mobile:px-5 mobile:py-4 h-auto"
      )}>
        <p class="text-xs text-center max-w-[58vw] mx-auto mobile:max-w-full">
          {copyright}
        </p>
      </div>
    </footer>
  )
}

export const LoadingFallback = () => <Section.Placeholder height="1145px" />;