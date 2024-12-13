
import { useDevice } from "@deco/deco/hooks";
import { AppContext } from "../../../apps/deco/wake.ts";
import { clx } from "../../../sdk/clx.ts";
import { useComponent } from "../../../sections/Component.tsx";
import ReviewRating from "../ReviewRating.tsx";

interface ReviewFormProps {
    productVariantId: number;
    state?: string;
    message?: string;
    ratingValue?: number;
    reviewCount?: number;
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
        // deno-lint-ignore no-explicit-any
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

export default function ReviewForm({ productVariantId, state, message, reviewCount, ratingValue }: ReviewFormProps) {
    const device = useDevice()

    if (state && message) {
        return (
            <h2 class="text-xl leading-6 text-base-content font-bold">
                {message}
            </h2>
        );
    }
    return (
        <div class="grid grid-cols-1 gap-[26px] desktop:w-[29.24%] w-full">
            {device === "desktop" && (
                <>
                    <div class="flex flex-col gap-4">
                        <h3 class="font-bold text-black text-2xl">Avaliações de Clientes</h3>
                        <ReviewRating reviewCount={reviewCount ?? 0} ratingValue={ratingValue ?? 0} typeTwo={true} size={32} />
                    </div>
                    <hr />
                </>
            )}
            <form
                hx-post={useComponent(import.meta.url, { productVariantId, state, message })}
                class="flex flex-col gap-[26px]"
            >
                <div class="flex flex-col gap-4">
                    <span class="font-bold text-black text-xl">Adicionar avaliação</span>
                    <div class="flex flex-col gap-2">
                        <div className="rating">
                            <input type="radio" name="stars" value="1" className="mask mask-star-2 bg-primary h-4 w-4 mobile:h-6 mobile:w-6" />
                            <input type="radio" name="stars" value="2" className="mask mask-star-2 bg-primary h-4 w-4 mobile:h-6 mobile:w-6" />
                            <input type="radio" name="stars" value="3" className="mask mask-star-2 bg-primary h-4 w-4 mobile:h-6 mobile:w-6" defaultChecked />
                            <input type="radio" name="stars" value="4" className="mask mask-star-2 bg-primary h-4 w-4 mobile:h-6 mobile:w-6" />
                            <input type="radio" name="stars" value="5" className="mask mask-star-2 bg-primary h-4 w-4 mobile:h-6 mobile:w-6" />
                        </div>
                        <span class="text-xs text-[#373737]">Avalie o produto de 1 a 5 estrelas</span>
                    </div>
                </div>
                <textarea
                    type="text"
                    id="review"
                    name="review"
                    required
                    class={clx(
                        "border border-black rounded-[5px] resize-none h-[89px] w-full",
                        "!rounded-sm !border !border-[#DCDCDC] outline-none p-[14px]"
                    )}
                    placeholder="Comente aqui sua experiência"
                    maxlength={300}
                />
                <button class="btn btn-primary text-black text-sm font-bold rounded-[5px]">Enviar Avaliação</button>
            </form>
        </div>
    );
}