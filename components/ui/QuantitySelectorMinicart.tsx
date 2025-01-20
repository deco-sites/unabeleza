import { type JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import Icon from "./Icon.tsx";
const onClick = (delta: number) => {
  // doidera!
  event!.stopPropagation();
  const button = event!.currentTarget as HTMLButtonElement;
  const input = button.parentElement
    ?.querySelector<HTMLInputElement>('input[type="number"]')!;
  const min = Number(input.min) || -Infinity;
  const max = Number(input.max) || Infinity;
  input.value = `${Math.min(Math.max(input.valueAsNumber + delta, min), max)}`;
  input.dispatchEvent(new Event("change", { bubbles: true }));
};
function QuantitySelectorMinicart(
  { id = useId(), disabled, ...props }: JSX.IntrinsicElements["input"],
) {
  return (
    <div class="join flex items-center border rounde-0 w-[97px] h-[44px]">
      <button
        type="button"
        class="btn min-h-0 h-[42px] w-1/3 p-0 no-animation hover:bg-transparent hover:border-0 border-0 bg-transparent join-item flex-1"
        hx-on:click={useScript(onClick, -1)}
        disabled={disabled}
      >
        <Icon id="remove" size={20} />
      </button>
      <input
        id={id}
        class={clx(
          "input join-item min-h-0 w-1/3 text-center [appearance:textfield]",
          "invalid:input-error p-0 h-[42px] font-bold text-sm",
          "focus:outline-none focus:border-0 outline-none border-0",
        )}
        disabled={disabled}
        inputMode="numeric"
        value={1}
        type="number"
        {...props}
      />
      <button
        type="button"
        class="btn min-h-0 h-[42px] w-1/3 p-0 no-animation hover:bg-transparent hover:border-0 border-0 bg-transparent join-item flex-1"
        hx-on:click={useScript(onClick, 1)}
        disabled={disabled}
      >
        <Icon id="add" size={20} />
      </button>
    </div>
  );
}
export default QuantitySelectorMinicart;
