import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";

interface ReviewRatingProps {
    ratingValue: number;
    reviewCount: number;
    typeTwo?: boolean;
    size?: number;
}

export default function ReviewRating({ ratingValue = 0, reviewCount, typeTwo, size }: ReviewRatingProps) {
    return (
        <div class={clx(
            "flex  items-center",
            typeTwo ? "gap-[10px]" : "gap-1"
        )}>
            <div class="flex gap-[3px]">
                {Array.from({ length: 5 }).map((_, index) => {
                    const id = index + 1 <= ratingValue ? "starFull" : "star";
                    return (<Icon key={index} id={id} width={size ?? 11} height={size ?? 12} />)
                })}
            </div>
            {reviewCount > 0 && (
                typeTwo
                    ? (
                        <span class="text-sm text-black whitespace-nowrap flex gap-[10px]">
                            <strong class="text-[28px] font-bold text-black">{ratingValue}</strong> (Média de {reviewCount} avaliações)
                        </span>
                    )
                    : (<span class="text-[11px] text-black">({reviewCount})</span>)

            )}
        </div>

    );
}