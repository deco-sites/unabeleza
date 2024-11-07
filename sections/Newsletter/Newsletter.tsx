import { AppContext } from "../../apps/site.ts";
import Icon from "../../components/ui/Icon.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useComponent } from "../Component.tsx";
import { type SectionProps } from "@deco/deco";
import { JSX } from "preact";

export type NewsletterComponent = JSX.Element;

interface NoticeProps {
  title?: string;
  description?: string;
}
export interface NewsletterProps {
  empty?: NoticeProps;
  success?: NoticeProps;
  failed?: NoticeProps;
  /** @description Signup label */
  label?: string;
  /** @description Input email placeholder */
  emailPlaceholder?: string;
  /** @description Input name placeholder */
  namePlaceholder?: string;
  /** @hide true */
  status?: "success" | "failed";
}

export async function action(
  props: NewsletterProps,
  req: Request,
  ctx: AppContext,
) {
  const platform = usePlatform();
  const form = await req.formData();
  const email = `${form.get("email") ?? ""}`;
  const name = `${form.get("name") ?? ""}`;

  if (platform === "wake") {
    // deno-lint-ignore no-explicit-any
    await (ctx as any).invoke("wake/actions/newsletter/register.ts", {
      email,
      name,
    });
    return { ...props, status: "success" };
  }
  return { ...props, status: "failed" };
}

export function loader(props: NewsletterProps) {
  return { ...props, status: undefined };
}
function Notice({ title, description }: {
  title?: string;
  description?: string;
}) {
  return (
    <div class="flex flex-col justify-center items-center sm:items-start gap-4">
      <span class="text-3xl font-bold font-[PP-Hatton] text-center mobile:text-lg">
        {title}
      </span>
      <span class="text-sm text-[#363B4B] font-normal text-center mobile:text-center">
        {description}
      </span>
    </div>
  );
}
function Newsletter({
  empty = {
    title: "Assine nossa newsletter",
    description:
      "Fique por dentro de todas as novidades, lançamentos e promoções.",
  },
  success = {
    title: "Obrigado por se inscrever!",
    description:
      "Agora você está inscrito para receber as últimas notícias, tendências e promoções exclusivas diretamente em sua caixa de entrada. Fique atento!",
  },
  failed = {
    title: "Ops. Algo deu errado!",
    description:
      "Algo deu errado. Por favor, tente novamente. Se o problema persistir, entre em contato conosco.",
  },
  label = "CADASTRAR",
  emailPlaceholder = "Seu e-mail",
  namePlaceholder = "Seu nome",
  status,
}: SectionProps<typeof loader, typeof action>): NewsletterComponent {
  if (status === "success" || status === "failed") {
    return (
      <Section.Container>
        <div class="p-14 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
          <Icon
            size={80}
            class={clx(status === "success" ? "text-secondary" : "text-error")}
            id={status === "success" ? "check-circle" : "error"}
          />
          <Notice {...status === "success" ? success : failed} />
        </div>
      </Section.Container>
    );
  }
  return (
    <Section.Container id="newsletter-form" class="bg-base-200">
      <div
        class={clx(
          "desktop:w-[56.11vw] desktop:p-14 flex flex-col gap-10 justify-center place-items-center",
          "mobile:gap-8",
        )}
      >
        <Notice {...empty} />
        <form
          hx-target="#newsletter-form"
          hx-swap="outerHTML"
          hx-post={useComponent(import.meta.url)}
          class="w-full flex flex-col gap-[37px] h-fit"
        >
          <div class="flex gap-4 w-full mobile:flex-col">
            <input
              name="email"
              class="input input-bordered flex-grow h-[45px]"
              type="text"
              placeholder={emailPlaceholder}
              required
            />

            <input
              name="name"
              class="input input-bordered flex-grow h-[45px]"
              type="text"
              placeholder={namePlaceholder}
              required
            />

            <button class="btn btn-primary rounded-[5px] h-[45px]" type="submit">
              <span class="[.htmx-request_&]:hidden inline text-black text-sm font-bold">
                {label}
              </span>
              <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
            </button>
          </div>

          <label
            htmlFor="acceptInfo"
            class="flex gap-2 justify-center items-center text-xs text-[#363B4B]"
          >
            <input
              type="checkbox"
              name="acceptInfo"
              id="acceptInfo"
              class={clx(
                "accent-primary hover:border-secondary w-[17px] h-[17px] p-[2px]",
                "mobile:w-5 mobile:h-5"
              )}
              required
            />
            Aceito receber informes publicitários e promoções através da
            Newsletter.
          </label>
        </form>
      </div>
    </Section.Container>
  );
}
export const LoadingFallback = () => <Section.Placeholder height="412px" />;
export default Newsletter;
