const formatters = new Map<string, Intl.NumberFormat>();

const formatter = (currency: string, locale: string) => {
  const key = `${currency}::${locale}`;

  if (!formatters.has(key)) {
    formatters.set(
      key,
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 2, 
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

  if (match) {
    let [_, times, price] = match;
    
    const priceValue = price.replace(/[^\d,.]/g, '').replace(',', '.');
    const numericPrice = parseFloat(priceValue);
    const formattedPrice = numericPrice.toFixed(2).replace('.', ',');
    
    const fullMessage = match.input?.replace(price, `R$ ${formattedPrice}`).replace(/\./g, ',') || installments;
    
    return {
      times,
      price: `R$ ${formattedPrice}`,
      fullMessage,
    };
  }
  return installments;
}
