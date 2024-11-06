import Image from "apps/website/components/Image.tsx";
import { Icon } from "../types.ts";

interface SocialMediaProps {
  social?: Icon[];
}

export default function SocialMedia({ social }: SocialMediaProps) {
  if (!social) return null;
  return (
    <div class="flex flex-col gap-[9.39px] mobile:justify-center">
      <span class="font-[PP-Hatton] text-sm font-bold mobile:text-center">
        Redes sociais
      </span>
      <ul class="flex gap-4 mobile:justify-center">
        {social.map(({ image, href, alt }) => (
          <li>
            <a href={href}>
              <Image
                src={image}
                alt={alt}
                loading="lazy"
                width={25}
                height={25}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
