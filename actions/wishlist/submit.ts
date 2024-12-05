import { type AppContext } from "../../apps/site.ts";
import { type Wishlist } from "../../components/wishlist/Provider.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";

import { AppContext as AppContextVTEX } from "apps/vtex/mod.ts";
import { AppContext as AppContextWAKE } from "apps/wake/mod.ts";

interface Props {
  productID: string;
  productGroupID: string;
}

async function action(
  props: Props,
  _req: Request,
  ctx: AppContext,
): Promise<Wishlist> {
  const { productID, productGroupID } = props;
  const platform = usePlatform();
  console.log(props)

  if (platform === "vtex") {
    const vtex = ctx as unknown as AppContextVTEX;

    const list = await vtex.invoke("vtex/loaders/wishlist.ts");
    const item = list.find((i) => i.sku === productID);

    try {
      const response = item
        ? await vtex.invoke(
          "vtex/actions/wishlist/removeItem.ts",
          { id: item.id },
        )
        : await vtex.invoke(
          "vtex/actions/wishlist/addItem.ts",
          { sku: productID, productId: productGroupID },
        );

      return {
        productIDs: response.map((item) => item.sku),
      };
    } catch {
      return {
        productIDs: list.map((item) => item.sku),
      };
    }
  }

  if (platform === "wake") {
    const wake = ctx as unknown as AppContextWAKE;

    const list = await wake.invoke("wake/loaders/wishlist.ts");
    console.log(list)
    const item = list.find((i) => i.productId === Number(productGroupID));

    try {
      const response = item
        ? await wake.invoke(
          "wake/actions/wishlist/removeProduct.ts",
          { productId: Number(productGroupID) },
        )
        : await wake.invoke(
          "wake/actions/wishlist/addProduct.ts",
          { productId: Number(productGroupID) },
        );


      return {
        productIDs: response.productId.toString(),
      };
    } catch {
      return {
        productIDs: list.map((item) => item.productId.toString()),
      };
    }
  }

  throw new Error(`Unsupported platform: ${platform}`);
}

export default action;
