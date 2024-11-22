import Icon from "../ui/Icon.tsx";

interface ReviewRatingProps {
    ratingValue?: number;
    reviewCount?: number;
}

export default function ReviewRating({ ratingValue = 0, reviewCount }: ReviewRatingProps) {
    return (
        <div class="flex gap-1">
            <div class="flex gap-[3px]">
                {Array.from({ length: 5 }).map((_, index) => {
                    const id = index + 1 <= ratingValue ? "starFull" : "star";
                    return (<Icon key={index} id={id} width={11} height={12}/>)
                })}
            </div>
            <span class="text-[11px] text-black">({reviewCount})</span>
        </div>

    );
}