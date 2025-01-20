import { clx } from "../../sdk/clx.ts";

interface FormatInstallmentsProps {
  installments: string;
  class?: string;
}

export default function FormatInstallments(
  { installments, class: _class }: FormatInstallmentsProps,
) {
  const regex = /(\d+x) de (R\$ \d+[,.]?\d*)/i;
  const match = installments.match(regex);

  if (match) {
    const [_, times, price] = match;
    return (
      <>
        <strong class={clx(_class)}>{times}</strong> de{" "}
        <strong class={clx(_class)}>{price}</strong>
      </>
    );
  }

  return installments;
}
