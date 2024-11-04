import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  /** @description Section title */
  title?: string;

  /** @description See all link */
  cta?: string;
}

function Header({ title, cta }: Props) {
  if (!title) {
    return null;
  }

  return (
    <div
      class={clx(
        "flex justify-center items-center relative w-full"
      )}
    >
      <span class="text-3xl text-center whitespace-nowrap mobile:text-lg font-bold font-[PP-Hatton]">{title}</span>
      {cta && (
        <a class={clx(
          "btn border-2 rounded-[5px] border-secondary max-w-[167px] h-[45px] px-10 py-3",
          "text-sm font-bold text-secondary whitespace-nowrap mobile:hidden absolute right-0 top-1/2 -translate-y-1/2",
          "hover:bg-secondary hover:text-white hover:border-secondary"
        )} href={cta}>
          VER TODOS
        </a>
      )}
    </div>
  );
}

interface Tab {
  title: string;
}

function Tabbed(
  { children }: {
    children: JSX.Element;
  },
) {
  return (
    <>
      {children}
    </>
  );
}

function Container({ class: _class, ...props }: JSX.IntrinsicElements["div"]) {
  return (
    <div
      {...props}
      class={clx(
        "container flex flex-col items-center gap-12 mobile:gap-[25px] w-full max-w-[96rem] px-[60px] py-16 mobile:px-5 mobile:py-8",
        _class?.toString(),
      )}
    />
  );
}

function Placeholder(
  { height, class: _class }: { height: string; class?: string },
) {
  return (
    <div
      style={{
        height,
        containIntrinsicSize: height,
        contentVisibility: "auto",
      }}
      class={clx("flex justify-center items-center", _class)}
    >
      <span class="loading loading-spinner" />
    </div>
  );
}

function Section() {}

Section.Container = Container;
Section.Header = Header;
Section.Tabbed = Tabbed;
Section.Placeholder = Placeholder;

export default Section;
