import { AggregateRating, Review } from "apps/commerce/types.ts";
import ReviewRating from "../ReviewRating.tsx";
import convertDate from "./convertDate.ts";
import { useDevice } from "@deco/deco/hooks";
import { clx } from "../../../sdk/clx.ts";

interface ReviewsProps {
  reviews?: Review[];
  aggregateRating?: AggregateRating;
}

export default function Reviews({ reviews, aggregateRating }: ReviewsProps) {
  const device = useDevice();
  return (
    <div
      class={clx(
        "desktop:max-h-[71.2%] w-full desktop:overflow-y-auto flex-1 snap-y custom-scrollbar desktop:pr-4",
        "mobile:flex mobile:flex-col mobile:gap-[26px]",
      )}
    >
      {device === "mobile" && (
        <>
          <div class="flex flex-col gap-4">
            <h3 class="font-bold text-black text-2xl">
              Avaliações de Clientes
            </h3>
            <ReviewRating
              reviewCount={aggregateRating?.reviewCount ?? 0}
              ratingValue={aggregateRating?.ratingValue ?? 0}
              typeTwo={true}
              size={20}
            />
          </div>
          <hr />
        </>
      )}
      <ul class="space-y-6 w-full mobile:max-h-[382px] overflow-y-auto snap-y custom-scrollbar mobile:pr-2">
        {reviews?.map((review) => (
          <li class="flex flex-col gap-4 mobile:gap-6 w-full snap-start">
            <div class="flex flex-col gap-4">
              <ReviewRating
                reviewCount={0}
                ratingValue={review.reviewRating?.ratingValue ?? 0}
                size={16.67}
              />
              <span class="font-bold text-black">{review.author![0].name}</span>
              <p class="text-sm text-black">{review.reviewBody}</p>
              <span class="text-xs text-[#999999]">
                {review.datePublished && convertDate(review.datePublished)}
              </span>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}
