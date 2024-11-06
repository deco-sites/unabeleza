import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import Icon from "../components/ui/Icon.tsx";
import { clx } from "../sdk/clx.ts";

interface AccordionProps {
  title: string;
  children: ComponentChildren;
}

export default function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      class={clx(
        "w-full py-6",
        isOpen ? "flex flex-col gap-4" : "border-b border-black",
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        class="flex justify-between w-full"
      >
        <span class="text-sm font-bold">{title}</span>
        <Icon
          id={isOpen ? "chevron-bottom" : "chevron-right"}
          stroke="#000"
          width={isOpen ? 11 : 5.5}
          height={isOpen ? 5.5 : 11}
        />
      </button>
      {isOpen && <div class="">{children}</div>}
    </div>
  );
}
