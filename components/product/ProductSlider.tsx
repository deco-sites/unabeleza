import { Product } from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import ProductCard from "./ProductCard.tsx";
import { useId } from "../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";

interface Props {
  products: Product[];
  itemListName?: string;
}

function ProductSlider({ products, itemListName }: Props) {
  const id = useId();
  const device = useDevice();

  return (
    <>
      <div
        id={id}
        class="grid grid-rows-1 w-full mobile:max-w-[336px]"
        style={{
          gridTemplateColumns: "min-content 1fr min-content",
        }}
      >
        <div class="col-start-1 col-span-3 row-start-1 row-span-1 w-full">
          <Slider class="carousel carousel-center sm:carousel-end justify-between gap-[1.11vw] mobile:gap-[4.26vw] flex w-full">
            {products?.filter(product => product.offers!.highPrice > 0 || product.offers!.lowPrice > 0)
              .map((product, index) => (
                <Slider.Item
                  index={index}
                  class={clx(
                    "carousel-item bg-[var(--custom-class)]",
                  )}
                >
                  <ProductCard
                    index={index}
                    product={product}
                    itemListName={itemListName}
                  />
                </Slider.Item>
              ))}
          </Slider>
        </div>

        <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 relative bottom-[15%]">
          <Slider.PrevButton class={clx(
            "flex justify-center items-center w-[50px] h-[50px] bg-white btn btn-sm btn-circle no-animation shadow-custom",
            "disabled:invisible mobile:w-8 mobile:h-8 hover:bg-info"
          )}>
            <Icon
              id="chevron-right"
              width={device === "desktop" ? 12 : 8}
              height={device === "desktop" ? 22 : 16}
              stroke="#8F2AED"
              class="rotate-180"
            />
          </Slider.PrevButton>
        </div>

        <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center p-2 relative bottom-[15%]">
          <Slider.NextButton class={clx(
            "flex justify-center items-center w-[50px] h-[50px] bg-white btn btn-sm btn-circle no-animation shadow-custom",
            "disabled:invisible mobile:w-8 mobile:h-8 hover:bg-info"
          )}>
            <Icon
              id="chevron-right"
              width={device === "desktop" ? 12 : 8}
              height={device === "desktop" ? 22 : 16}
              stroke="#8F2AED" />
          </Slider.NextButton>
        </div>

        <ul
          class={clx(
            "col-span-full row-start-4 z-10",
            "carousel justify-center gap-[10px] items-end mt-12 mobile:mt-8",
            "desktop:hidden"
          )}
        >
          {products?.filter(product => product.offers!.highPrice > 0 || product.offers!.lowPrice > 0)
            .map((_, index) => (
              <li class="carousel-item">
                <Slider.Dot
                  index={index}
                  class={clx(
                    "bg-[#EBECF0] h-1 w-8 no-animation rounded-[1px]",
                    "disabled:bg-primary disabled:opacity-100 transition-[width]",
                    index % 2 !== 0 && "hidden"
                  )}
                >
                </Slider.Dot>
              </li>
            ))}
        </ul>
      </div>
      <Slider.JS rootId={id} />
    </>
  );
}

export default ProductSlider;
