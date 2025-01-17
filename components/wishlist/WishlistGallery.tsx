import { AppContext } from "apps/wake/mod.ts";
import { WishlistReducedProductFragment } from "apps/wake/utils/graphql/storefront.graphql.gen.ts";
import { SectionProps } from "deco/types.ts";
import ProductCard from "../product/ProductCard.tsx";
export type Props = {
  whislist: WishlistReducedProductFragment[];
};

function WishlistGallery(props: SectionProps<typeof loader>) {
  const isEmpty = !props.products || props.products.length === 0;

  if (isEmpty) {
    return (
      <div class="container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">
            Sua lista de favoritos esta vazia
          </span>
          <span>
            Faça login e adicione produtos na sua lista de favoritos para que
            eles apareçam aqui.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div class="px-4 mx-auto max-lg:mt-5 xl:max-w-[1220px] mt-16 mb-16">
      <div class="mb-3">
        <h1 class="leading-8 lg:leading-10 font-bold text-xl lg:text-3xl text-center">
          Meus Favoritos
        </h1>
      </div>
      <div
        class={"grid items-center grid-cols-2 gap-x-2 gap-y-16 sm:grid-cols-3 xl:grid-cols-4 sm:gap-4"}
      >
        {props.products?.map((product) => (
          <ProductCard product={product}  />
        ))}
      </div>
    </div>
  );
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { invoke } = ctx;

  const wishlistIds = await ctx.invoke("wake/loaders/wishlist.ts")

  const productId =  wishlistIds.map((item) => Number(item.productId));

  console.log(productId)

  const products = productId.length > 0
    ? await invoke.wake.loaders.productList({
      first: 50,
      sortDirection: "ASC",
      sortKey: "NAME",
      filters: {
        productId,
        mainVariant: true,
      },
    })
    : [];

  return {
    products,
  };
};

export default WishlistGallery;
