import type { SKU } from "apps/vtex/utils/types.ts";
import { useId } from "../../sdk/useId.ts";
import { useComponent } from "../../sections/Component.tsx";

export interface Props {
  items: SKU[];
}

export default function Form({ items }: Props) {
  const slot = useId();

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span class="text-black font-bold text-sm pt-5">
         CEP
        </span>
      </div>

      <form
        class="relative join"
        hx-target={`#${slot}`}
        hx-swap="innerHTML"
        hx-sync="this:replace"
        hx-post={useComponent(import.meta.resolve("./Results.tsx"), {
          items,
        })}
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
          <button type="submit" class="join-item no-animation px-4 text-primary font-semibold text-sm border border-l-0 border-[#DBDBDB]">
            <span class="[.htmx-request_&]:hidden inline">CALCULAR</span>
            <span class="[.htmx-request_&]:inline hidden loading loading-spinner loading-xs" />
          </button>
        </input>
      </form>

      {/* Results Slot */}
      <div id={slot} />
    </div>
  );
}
