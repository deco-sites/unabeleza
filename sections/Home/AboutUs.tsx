import Section from "../../components/ui/Section.tsx";

interface AboutUsProps {
    title: string
    subtitle?: string
    text: string
}

export default function AboutUs({ title, subtitle, text }: AboutUsProps) {
    return (
        <Section.Container class="flex flex-col gap-[30px] mobile:gap-[13px] items-center">
            <div class="flex flex-col gap-2 mobile:gap-[6px] items-center">
                <h1 class="text-3xl font-bold font-[PP-Hatton] text-center mobile:text-lg">{title}</h1>
                <h3 class="text-xl font-bold font-[PP-Hatton] text-center mobile:text-sm">{subtitle}</h3>
            </div>
            <p class="text-sm text-center mobile:text-xs">{text}</p>
        </Section.Container>
    );
}