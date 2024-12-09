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


export function formatInstallments(installments) {
  const regex = /(\d+x) de (R\$ \d+[,.]?\d*)/i;
  const match = installments.match(regex);

  if (match) {
    const [_, times, price] = match;
    price.replace(".", ",");
    return {
      times,
      price
    }
  }
  return installments;
}
