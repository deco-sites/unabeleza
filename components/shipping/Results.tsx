
import { AppContext } from "apps/vtex/mod.ts";
import { formatPrice } from "../../sdk/format.ts";
import { ComponentProps } from "../../sections/Component.tsx";
import { ShippingQuotesQuery } from "apps/wake/utils/graphql/storefront.graphql.gen.ts";

export interface Props {
  items: SKU[];
}

function formatShippingEstimate(estimate: number): string {
  return `${estimate} dias úteis`;
}

export async function action(props: Props, req: Request, ctx: AppContext) {
  const form = await req.formData();

  try {
    const result = await ctx.invoke("wake/actions/shippingSimulation.ts", {
      ...props.items[0],
      cep: `${form.get("postalCode") ?? ""}`,
    }) as ShippingQuotesQuery["shippingQuotes"];

    return { result };
  } catch {
    return { result: null };
  }
}

export default function Results({ result }: ComponentProps<typeof action>) {

  if (!result.length) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 p-4 border border-base-400 rounded">
      {result.map((method) => (
        <li class="grid grid-cols-3 justify-items-center items-center gap-2 border-base-200 not-first-child:border-t">
          <span class="text-button">
            Entrega {method.name}
          </span>
          <span class="text-button">
            até {formatShippingEstimate(method.deadline)}
          </span>
          <span class="text-base font-semibold text-right">
            {method.value === 0 ? "Grátis" : 
              method.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
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
