
import { AppContext } from "../../../apps/deco/wake.ts";
import { useComponent } from "../../../sections/Component.tsx";

interface ReviewFormProps {
    productVariantId: number;
    state?: string;
    message?: string;
}

export const action = async (
    props: ReviewFormProps,
    req: Request,
    ctx: AppContext
): Promise<ReviewFormProps> => {
    const user = await ctx.invoke.wake.loaders.user();
    if (!user) return { ...props, state: "error", message: "Usuário não autenticado" }
    const { email, givenName } = user;

    try {
        const formData = await req.formData();
        await (ctx as any).invoke.wake.actions.review.create({
            email,
            name: givenName,
            productVariantId: props.productVariantId,
            rating: Number(formData.get("stars")),
            review: formData.get("review") ?? "",
        });
        return { ...props, state: "success", message: "Avaliação enviada com sucesso!" };
    } catch (_e: unknown) {
        return { ...props, state: "error", message: "Erro ao enviar avaliação!" };
    }
};

export default function ReviewForm({ productVariantId, state, message }: ReviewFormProps) {
    console.log(state, message)

    if (state && message) {
        return (
          <h2 class="text-xl leading-6 text-base-content font-bold">
            {message}
          </h2>
        );
      }
    return (
        <form
            hx-post={useComponent(import.meta.url, { productVariantId, state, message })}
        >
            <input type="text" id="review" name="review" required class="border border-black rounded-[5px]" />
            <div className="rating">
                <input type="radio" name="stars" value="1" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="stars" value="2" className="mask mask-star-2 bg-orange-400" defaultChecked />
                <input type="radio" name="stars" value="3" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="stars" value="4" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="stars" value="5" className="mask mask-star-2 bg-orange-400" />
            </div>
            <button>Enviar</button>
        </form>
    );
}