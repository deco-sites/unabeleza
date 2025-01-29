import Image from "apps/website/components/Image.tsx";
import { DeveloperLogo } from "../types.ts";

export default function Developer({ econverse, wake, yav }: DeveloperLogo) {
  return (
    <div class="flex flex-col gap-[7px] justify-center">
      <span class="text-sm font-bold text-center">
        Layout e desenvolvimento
      </span>
      <div class="flex justify-center gap-4">
        <a href={econverse.url} target="_blank-space">
          <Image src={econverse.image} width={85.83} height={24.9} />
        </a>
        <a href={wake.url} target="_blank-space">
          <Image src={wake.image} width={77.57} height={27.17} />
        </a>
        <a href={yav.url} target="_blank-space">
          <Image src={yav.image} width={133.33} height={25} />
        </a>
      </div>
    </div>
  );
}
