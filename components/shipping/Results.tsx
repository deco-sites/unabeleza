
import { ShippingQuotesQuery } from "apps/wake/utils/graphql/storefront.graphql.gen.ts";

export interface Props {
  result: ShippingQuotesQuery["shippingQuotes"]
}

function formatShippingEstimate(estimate: number): string {
  return `${estimate} dias úteis`;
}

export default function Results({ result }: Props) {

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
