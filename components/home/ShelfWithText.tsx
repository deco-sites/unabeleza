import type { Product } from "apps/commerce/types.ts";
import { useDevice } from "@deco/deco/hooks";
import ProductSlider from "../../components/product/ProductSlider.tsx";
import { clx } from "../../sdk/clx.ts";

export interface ShelfWithTextProps {
  title: string;
  subtitle: string;
  text: string;
  products: Product[] | null;
  class?: string;
}

export default function ShelfWithText(
  { subtitle, text, products, title, class: _class }: ShelfWithTextProps,
) {
  if (!products || products.length === 0) {
    return null;
  }

  const device = useDevice();
  const filteredProducts = device === "desktop"
    ? products.slice(0, 2)
    : products;

  return (
    <div class={clx("flex flex-col justify-between w-full", _class)}>
      <div class="flex flex-col gap-6">
        <h3 class="text-xl font-bold font-[PP-Hatton] mobile:text-lg">
          {subtitle}
        </h3>
        <p class="text-sm font-normal">{text}</p>
      </div>
      <div class="mobile:py-[30px] w-full">
        <ProductSlider
          products={filteredProducts}
          itemListName={title}
          class="desktop:hidden"
          sliderClass="!justify-center"
        />
      </div>
    </div>
  );
}
