import { type ComponentChildren } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "./Icon.tsx";
import { useScript } from "@deco/deco/hooks";
export interface Props {
  open?: boolean;
  class?: string;
  children?: ComponentChildren;
  aside: ComponentChildren;
  id?: string;
}
const script = (id: string) => {
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Escape" && e.keyCode !== 27) {
      return;
    }
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) {
      return;
    }
    input.checked = false;
  };
  addEventListener("keydown", handler);
};
function Drawer(
  { children, aside, open, class: _class = "", id = useId() }: Props,
) {
  return (
    <>
      <div class={clx("drawer z-30", _class)}>
        <input
          id={id}
          name={id}
          checked={open}
          type="checkbox"
          class="drawer-toggle"
          aria-label={open ? "open drawer" : "closed drawer"}
        />

        <div class="drawer-content">
          {children}
        </div>

        <aside
          data-aside
          class={clx(
            "drawer-side h-full overflow-hidden",
            "[[data-aside]&_section]:contents",
          )}
        >
          <label for={id} class="drawer-overlay" />
          {aside}
        </aside>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}
function Aside({ title, drawer, children, hasLogged = true }: {
  title?: string;
  drawer: string;
  children: ComponentChildren;
  hasLogged?: boolean;
}) {
  return drawer === "minicart-drawer"
    ? (
      <div
        data-aside
        class="bg-base-100 grid grid-rows-[auto_1fr] h-full w-[375px] mobile:w-screen max-w-[425px]"
      >
        <div class="flex justify-center relative items-center p-5 w-full px-5 py-8">
          <label for={drawer} aria-label="X" class="cursor-pointer p-0 absolute left-[21px] top-1/2 -translate-y-1/2">
            <Icon id="closeCart" size={16}/>
          </label>
          <span class="text-2xl font-[PP-Hatton] font-bold">{title}</span>
        </div>
        {children}
      </div >
    )
    : (
      <div
        data-aside
        class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y w-fit"
        style={{ maxWidth: "100vw" }}
      >
        <div class="flex justify-between items-center p-5 mobile:w-[79.73vw]">
          {hasLogged && title
            ? (
              <>
                <label for={drawer} aria-label="X" class="cursor-pointer p-0">
                  <Icon id="drawerArrowLeft" width={30} height={30} />
                </label>
                <span class="text-2xl font-[PP-Hatton] font-bold">{title}</span>
              </>
            )
            : (
              <div class="flex gap-4 items-center">
                <Icon id="drawerUser" width={40} height={40} />
                <div>
                  <p class="text-sm">Olá, Visitante</p>
                  <p class="text-sm font-bold whitespace-nowrap">
                    <a href="/#" class="text-primary">Entre</a> ou{" "}
                    <a href="/#" class="text-primary">Cadastre-se</a>
                  </p>
                </div>
              </div>
            )}
          <label for={drawer} aria-label="X" class="cursor-pointer p-0">
            <Icon id="close" />
          </label>
        </div>
        {children}
      </div >
    );
}
Drawer.Aside = Aside;
export default Drawer;
