import { JSX } from "preact";
import { useState, useCallback } from "preact/hooks";
import { invoke } from "../runtime.ts";
import { ShippingQuotesQuery } from "apps/wake/utils/graphql/storefront.graphql.gen.ts";
import type { Props as SKU } from "apps/wake/actions/shippingSimulation.ts";
import Results from "../components/shipping/Results.tsx"

export interface Props {
    items: SKU[];
}

export default function ShippingSimulationForm({ items }: Props) {
    const [result, setResult] = useState<ShippingQuotesQuery["shippingQuotes"] | null>(null)

    const handleResults = useCallback(
        async (e: JSX.TargetedSubmitEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = new FormData(e.currentTarget);
            if(!form.get("postalCode")) {
                setResult(null) 
                return
            }
            const data = await invoke.wake.actions.shippingSimulation({
                ...items[0],
                cep: `${form.get("postalCode") ?? ""}`,
            }) as ShippingQuotesQuery["shippingQuotes"];

            setResult(data)
        },
        [items]
    )

    return (
        <div class="flex flex-col gap-2">
            <div class="flex flex-col">
                <span class="text-black font-bold text-sm">
                    CEP
                </span>
            </div>

            <form
                onSubmit={handleResults}
                class="relative join"
            >
                <input
                    as="input"
                    type="text"
                    class="input flex-1 focus:outline-0 input-bordered join-item w-48 border-r-0 border-[#DBDBDB]"
                    placeholder="00000000"
                    name="postalCode"
                    maxLength={8}
                    size={8}
                >

                </input>
                <button type="submit" class="join-item no-animation px-4 text-secondary font-semibold text-sm border border-l-0 border-[#DBDBDB]">
                    <span class="inline">CALCULAR</span>
                </button>
            </form>
            {result && (
                <Results result={result} />
            )}
        </div>
    );
}
