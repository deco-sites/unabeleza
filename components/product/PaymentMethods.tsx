import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";

export interface Method {
    name?: string;
    billingDuration?: number;
    price?: number;
    installments?: Array<{ billingDuration: number; price: number }>;
    [key: string]: unknown;
}

interface PaymentMethodsProps {
    methods: Method[];
    priceCurrency?: string;
}

export default function PaymentMethods({ methods, priceCurrency }: PaymentMethodsProps) {
    const credit = {
        name: "Cartão de Crédito",
        installments: [] as Array<{ billingDuration: number; price: number }>
    }

    methods.forEach(obj => {
        if (obj.name === "Cartão de Crédito") {
            credit.installments.push({
                billingDuration: obj.billingDuration ?? 0,
                price: obj.price ?? 0,
            });
        }
    })

    const paymentMethods: Method[] = methods.filter(obj => obj.name && obj.name !== "Cartão de Crédito")
    paymentMethods.push(credit)
    paymentMethods.sort((a, b) => {
        if (a.name === 'Cartão de Crédito') return -1;
        if (b.name === 'Cartão de Crédito') return 1;
        return 0;
    })


    return (
        <div role="tablist" className="tabs tabs-bordered">
            {
                paymentMethods.map(obj => {
                    if (obj.name === "Cartão de Crédito") {
                        if (!obj.installments) return null
                        return (
                            <>
                                <input
                                    type="radio"
                                    name="tabsPayment"
                                    role="tab"
                                    defaultChecked
                                    class={clx(
                                        "tab !w-[calc((38.19vw_-_40px)_/_3)] mobile:!w-[calc((100vw_-_64px)_/_3)] h-fit !border-b checked:!border-b-2",
                                        "checked:!border-primary font-bold text-sm mobile:text-xs checked:text-primary uppercase"
                                    )}
                                    aria-label={obj.name}
                                />
                                <div role="tabpanel" class="tab-content p-10 mobile:p-5">
                                    <ul class="flex flex-col rounded-lg border border-zinc-200 overflow-hidden">
                                        {obj.installments.map(item => (
                                            <li class="flex justify-between odd:bg-white even:bg-zinc-200 px-5 py-4 mobile:px-4 mobile:py-3">
                                                <span class="mobile:text-xs">{item.billingDuration}x de {formatPrice(item.price, priceCurrency)}</span>
                                                <span class="mobile:text-xs">{formatPrice((item.billingDuration * item.price), priceCurrency)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )
                    }

                    return (
                        <>
                            <input
                                type="radio"
                                name="tabsPayment"
                                role="tab"
                                class={clx(
                                    "tab !w-[calc((38.19vw_-_40px)_/_3)] mobile:!w-[calc((100vw_-_64px)_/_3)]  h-fit !border-b checked:!border-b-2",
                                    "checked:!border-primary font-bold text-sm mobile:text-xs checked:text-primary uppercase"
                                )}
                                aria-label={obj.name}
                            />
                            <div role="tabpanel" class="tab-content p-10 mobile:p-5">
                                <div class="flex flex-col gap-5">
                                    <span class="font-bold text-black mobile:text-xs">{formatPrice(obj.price, priceCurrency)} no {obj.name}</span>
                                    {
                                        obj.name === "Pix" ? (
                                            <span class="mobile:text-xs">
                                                O pagamento é instantâneo e só pode ser à vista. Na etapa de finalização da compra, a gente explica direitinho como pagar com Pix.
                                            </span>
                                        ) : obj.name === "Boleto" && (
                                            <span class="mobile:text-xs">
                                                O boleto será gerado após a finalização de sua compra. Imprima e pague no banco ou pague pela internet utilizando o código de barras do boleto.
                                            </span>
                                        )
                                    }
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </div>
    );
}