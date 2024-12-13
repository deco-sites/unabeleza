
import { AppContext } from "../../apps/deco/wake.ts";
import { type ComponentProps } from "../../sections/Component.tsx";
import { ShippingQuotesQuery } from "apps/wake/utils/graphql/storefront.graphql.gen.ts";
import type { Props as SKU } from "apps/wake/actions/shippingSimulation.ts";

export interface Props {
  items: SKU[];
}

function formatShippingEstimate(estimate: number): string {
  return `${estimate} dias úteis`;
}

export async function action(props: Props, req: Request, ctx: AppContext) {
  const form = await req.formData();
  try {
    // deno-lint-ignore no-explicit-any
    const result = await (ctx as any).invoke.wake.actions.shippingSimulation({
      ...props.items[0],
      cep: `${form.get("postalCode") ?? ""}`,
    }) as ShippingQuotesQuery["shippingQuotes"];

    return { result };
  } catch {
    return { result: null };
  }
}

export default function Results({ result }: ComponentProps<typeof action>) {

  if (!result) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 p-4 border border-base-400 rounded">
      {result?.map((method) => (
        <li key={method?.id} class="grid grid-cols-3 justify-items-center items-center gap-2 border-base-200 not-first-child:border-t">
          <span class="text-button text-center">
            Entrega {method?.name}
          </span>
          <span class="text-button text-center">
            até {formatShippingEstimate(method!.deadline)}
          </span>
          <span class="text-base font-semibold text-right">
            {method?.value === 0 ? "Grátis" : 
              method?.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
            }
          </span>
        </li>
      ))}
      <span class="text-xs font-thin">
        Os prazos de entrega começam a contar a partir da confirmação do
        pagamento e podem variar de acordo com a quantidade de produtos na
        sacola.
      </span>
    </ul>
  );
}
