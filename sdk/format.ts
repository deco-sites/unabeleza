const formatters = new Map<string, Intl.NumberFormat>();

const formatter = (currency: string, locale: string) => {
  const key = `${currency}::${locale}`;

  if (!formatters.has(key)) {
    formatters.set(
      key,
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }),
    );
  }

  return formatters.get(key)!;
};

export const formatPrice = (
  price: number | undefined,
  currency = "BRL",
  locale = "pt-BR",
) => price ? formatter(currency, locale).format(price) : null;

export function formatInstallments(installments: string) {
  const regex = /(\d+x) de (R\$ \d+[,.]?\d*)/i;
  const match = installments.match(regex);
  console.log(match);

  if (match) {
    let [_, times, price] = match;
    return {
      times,
      price: price.replace(".", ","),
    };
  }
  return installments;
}
