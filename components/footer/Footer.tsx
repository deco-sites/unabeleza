import { useDevice } from "@deco/deco/hooks";
import { Props } from "./types.ts";
import MenuDesktopFooter from "./MenuDesktopFooter.tsx";
import MenuMobileFooter from "./MenuMobileFooter.tsx";
import Section from "../ui/Section.tsx";
import { RichText } from "apps/admin/widgets.ts";
import { clx } from "../../sdk/clx.ts";
import {
  default as BenefitBar,
  ItemBenefitBar,
} from "../../sections/Home/BenefitBar.tsx";
import { NewsletterComponent } from "../../sections/Newsletter/Newsletter.tsx";
import { type Section as SectionType } from "@deco/deco/blocks";

export interface FooterProps extends Props {
  copyright: RichText;
  benefits: ItemBenefitBar[];
  newsletter: SectionType<NewsletterComponent>;
}

export default function Footer(
  { benefits, copyright, newsletter, ...props }: FooterProps,
) {
  const device = useDevice();
  return (
    <footer>
      <newsletter.Component {...newsletter.props} />
      <BenefitBar items={benefits} class="!bg-[#DBB9F9]" />
      {device === "desktop"
        ? <MenuDesktopFooter {...props} />
        : <MenuMobileFooter {...props} />}
      <div
        class={clx(
          "bg-[#DBB9F9] px-[60px] py-2.5 h-[56px]",
          "mobile:px-5 mobile:py-4 h-auto",
        )}
      >
        <p class="text-xs text-center max-w-[58vw] mx-auto mobile:max-w-full">
          {copyright}
        </p>
      </div>
    </footer>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="1145px" />;
