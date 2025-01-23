import { type RichText } from "apps/admin/widgets.ts";

/** @title {{titulo}} */
interface PoliticasProps {
  /** @title Título */
  title: string;
  /** @title Sub Título */
  subTitle?: string;
  /** @title Paragrafo */
  paragraph?: RichText;
}

interface ItemsProps {
  item: PoliticasProps[];
}

export default function Politicas({
  item,
}: ItemsProps) {
  return (
    <div className="mobile:mt-[250px] mobile:px-[20px] mt-[100px] pl-[max(min(23.125vw,355.2px),353px)] pr-[min(5.55vw,85.24px)] max-w-[96rem] mx-auto">
      {item &&
        item.map((item) => (
          <section>
            <div className="font-[PP-Hatton] mobile:text-[24px] text-[32px] mt-12 font-bold">
              <h1 className="text-slate-950">{item.title}</h1>
            </div>
            <div className="font-[Montserrat] text-[16px] pt-5 pb-5 font-bold">
              <h2>{item.subTitle}</h2>
            </div>
            <div className="font-[Montserrat] text-[14px]">
              <p dangerouslySetInnerHTML={{ __html: item.paragraph ?? "" }} />
            </div>
          </section>
        ))}
    </div>
  );
}
