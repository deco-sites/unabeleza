import Image from "apps/website/components/Image.tsx";
import { DeveloperLogo } from "../types.ts";

export default function Developer({ econverse, wake }: DeveloperLogo) {
    return (
        <div class="flex flex-col gap-[7px] justify-center">
            <span class="font-[PP-Hatton] text-sm font-bold text-center">Layout e desenvolvimento</span>
            <div class="flex justify-center gap-4">
                <Image src={econverse.image} width={85.83} height={24.9} href={econverse.url}/>
                <Image src={wake.image} width={77.57} height={27.17} href={wake.url}/>
            </div>
        </div>
    );
}