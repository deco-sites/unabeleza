import { useDevice, useScriptAsDataURI } from "@deco/deco/hooks";

export interface FilterMobileLogics {
  expectedFinalUrl: URL;
  device: ReturnType<typeof useDevice>;
  filterChange: (
    key: string,
    value: string,
    selected: boolean,
  ) => void;
  updatePriceFilter: (min: number, max: number) => void;
  clearAllFilters: () => void;
  finishFiltering: () => void;
}

declare global {
  interface Window {
    FILTER_LOGICS: FilterMobileLogics;
  }
}

function createFilterMobileLogics(device: ReturnType<typeof useDevice>) {
  window.FILTER_LOGICS = {
    device: device,
    expectedFinalUrl: new URL(window.location.href),
    clearAllFilters() {
      const keys = this.expectedFinalUrl.searchParams.keys();
      for (const key of keys) {
        if (key !== "busca") {
          this.expectedFinalUrl.searchParams.delete(key);
        }
      }
      this.finishFiltering();
    },
    finishFiltering() {
      window.location.href = this.expectedFinalUrl.toString();
    },
    filterChange(key, value, selected) {
      if (selected) {
        this.expectedFinalUrl.searchParams.delete(
          "filtro",
          `${key}__${value}`,
        );
      } else {
        this.expectedFinalUrl.searchParams.append(
          "filtro",
          `${key}__${value}`,
        );
      }

      if (this.device === "desktop") {
        this.finishFiltering();
      }
    },
    updatePriceFilter(min, max) {
      this.expectedFinalUrl.searchParams.set(
        "precoPor",
        `${min};${max}`,
      );
      if (this.device === "desktop") this.finishFiltering();
    },
  };
}

export default function BottomFilterBar() {
  const device = useDevice();
  return (
    <div class="flex desktop:hidden px-5 mb-5 gap-[10px] w-full">
      <button
        class="flex-1 btn border border-primary rounded-[5px] font-[PP-Hatton] font-bold text-sm text-primary uppercase"
        hx-on:click="FILTER_LOGICS.clearAllFilters()"
      >
        Limpar
      </button>
      <button
        class="flex-1 btn bg-primary rounded-[5px] font-[PP-Hatton] font-bold text-sm text-black uppercase"
        hx-on:click="FILTER_LOGICS.finishFiltering()"
      >
        Filtrar
      </button>
      <script
        src={useScriptAsDataURI(createFilterMobileLogics, device)}
      />
    </div>
  );
}
