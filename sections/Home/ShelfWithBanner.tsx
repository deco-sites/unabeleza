import Section from "../../components/ui/Section.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import ShelfWithText, {
  ShelfWithTextProps,
} from "../../components/home/ShelfWithText.tsx";
import { type LoadingFallbackProps } from "@deco/deco";
import { clx } from "../../sdk/clx.ts";

interface ShelfWithBannerProps extends ShelfWithTextProps {
  img: ImageWidget;
  alt?: string;
  linkImage?: string;
}

export default function ShelfWithBanner(
  { img, linkImage, ...props }: ShelfWithBannerProps,
) {
  if (!props.products || props.products.length === 0) {
    return null;
  }

  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        item_list_name: props.title,
        items: props.products.map((product, index) =>
          mapProductToAnalyticsItem({
            index,
            product,
            ...(useOffer(product.offers)),
          })
        ),
      },
    },
  });

  return (
    <Section.Container {...viewItemListEvent}>
      <Section.Header title={props.title} />
      <div
        class={clx(
          "w-full desktop:grid desktop:grid-cols-2 gap-4",
          "mobile:flex mobile:flex-col mobile:gap-6",
        )}
      >
        <div class="w-full relative">
          <Image
            src={img}
            alt={props.alt ?? props?.title}
            width={652}
            height={700}
            loading="lazy"
            class={clx(
              "w-full h-full object-cover mobile:w-full",
            )}
          />
          <a href={linkImage} class="absolute inset-0" />
        </div>

        <ShelfWithText
          class={clx(
            "w-1/2 mobile:w-full",
          )}
          {...props}
        />
      </div>
    </Section.Container>
  );
}

export const LoadingFallback = (
  { title }: LoadingFallbackProps<ShelfWithBannerProps>,
) => (
  <Section.Container>
    <Section.Header title={title} />
    <Section.Placeholder height="471px" />;
  </Section.Container>
);
