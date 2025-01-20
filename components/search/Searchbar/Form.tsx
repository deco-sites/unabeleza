import { Suggestion } from "apps/commerce/types.ts";
import {
  SEARCHBAR_INPUT_FORM_ID,
  SEARCHBAR_POPUP_ID,
} from "../../../constants.ts";
import { useComponent } from "../../../sections/Component.tsx";
import Icon from "../../ui/Icon.tsx";
import { Props as SuggestionProps } from "./Suggestions.tsx";
import { useScript } from "@deco/deco/hooks";
import { asResolved } from "@deco/deco";
import { type Resolved } from "@deco/deco";
// When user clicks on the search button, navigate it to
export const ACTION = "/busca";
// Querystring param used when navigating the user
export const NAME = "busca";
export interface SearchbarProps {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default What are you looking for?
   */
  placeholder?: string;
  /** @description Loader to run when suggesting new elements */
  loader: Resolved<Suggestion | null>;
}
const script = (formId: string, name: string, popupId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const input = form?.elements.namedItem(name) as HTMLInputElement | null;
  form?.addEventListener("submit", () => {
    const search_term = input?.value;
    if (search_term) {
      window.DECO.events.dispatch({
        name: "search",
        params: { search_term },
      });
    }
  });
  // Keyboard event listeners
  addEventListener("keydown", (e: KeyboardEvent) => {
    const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;
    // Open Searchbar on meta+k
    if (e.metaKey === true && isK) {
      const input = document.getElementById(popupId) as HTMLInputElement | null;

      if (input) {
        input.checked = true;
        document.getElementById(formId)?.focus();
      }
    }
  });
};
export const slot = "SEARCH_BAR_RESULT";
const Suggestions = import.meta.resolve("./Suggestions.tsx");
export default function Searchbar(
  { placeholder = "What are you looking for?", loader }: SearchbarProps,
) {
  return (
    <div
      class="w-full grid gap-8 rounded-[5px] border border-[#E7E7E7] h-10 p-0 overflow-hidden"
      style={{ gridTemplateRows: "min-content auto" }}
    >
      <form
        id={SEARCHBAR_INPUT_FORM_ID}
        action={ACTION}
        class="join flex items-center gap-1 h-10"
      >
        <input
          id={SEARCHBAR_POPUP_ID}
          tabIndex={0}
          class="join-item w-full text-[#999999] mobile:text-black truncate h-full focus:outline-0 py-[10px] pl-5"
          name={NAME}
          placeholder={placeholder}
          autocomplete="off"
          hx-target={`#${slot}`}
          hx-post={loader && useComponent<SuggestionProps>(Suggestions, {
            loader: asResolved(loader),
          })}
          hx-trigger={`input changed delay:300ms, ${NAME}`}
          hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
          hx-swap="innerHTML"
        />

        <button
          type="submit"
          class="cursor-pointer join-item h-full px-[10px] py-[10px]"
          aria-label="Search"
          for={SEARCHBAR_INPUT_FORM_ID}
          tabIndex={-1}
        >
          <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline" />
          <Icon id="search" class="inline [.htmx-request_&]:hidden" />
        </button>
      </form>

      {/* Suggestions slot */}
      <div id={slot} />

      {/* Send search events as the user types */}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            script,
            SEARCHBAR_INPUT_FORM_ID,
            NAME,
            SEARCHBAR_POPUP_ID,
          ),
        }}
      />
    </div>
  );
}
