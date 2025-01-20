import type { Product } from "apps/commerce/types.ts";
import { AppContext } from "../../apps/site.ts";
import { useComponent } from "../../sections/Component.tsx";

export interface Props {
  productID: Product["productID"];
}

export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const form = await req.formData();

  const name = `${form.get("name") ?? ""}`;
  const email = `${form.get("email") ?? ""}`;

  // deno-lint-ignore no-explicit-any
  await (ctx as any).invoke("vtex/actions/notifyme.ts", {
    skuId: props.productID,
    name,
    email,
  });

  return props;
};

export default function Notify({ productID }: Props) {
  return (
    <form
      class="form-control justify-start gap-4"
      hx-sync="this:replace"
      hx-indicator="this"
      hx-swap="none"
      hx-post={useComponent<Props>(import.meta.url, { productID })}
    >
      <span class="text-lg text-[#363B4B] text-start font-bold font-[PP-Hatton]">
        Avise-me quando chegar
      </span>
      <span class="mobile:text-sm text-[#363B4B] text-start">
        Para ser avisado da disponibilidade deste Produto, basta preencher os
        campos abaixo.
      </span>

      <div class="flex gap-[14px] mobile:flex-col">
        <input
          placeholder="Digite seu nome"
          class="input rounded-[5px] grow input-bordered"
          name="name"
        />
        <input
          placeholder="Digite sei e-mail"
          class="input rounded-[5px] grow input-bordered"
          name="email"
        />
      </div>

      <button class="btn border-2 border-secondary bg-white rounded-[5px] no-animation hover:bg-secondary group">
        <span class="[.htmx-request_&]:hidden inline text-secondary font-bold group-hover:text-white">
          AVISE-ME
        </span>
        <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
      </button>
    </form>
  );
}
