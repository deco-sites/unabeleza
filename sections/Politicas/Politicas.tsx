import { type RichText } from "apps/admin/widgets.ts";

/** @title {{titulo}} */
interface PoliticasProps {
  titulo: string;
  subtitulo?: string;
  paragrafos?: RichText;
}

interface ItemsProps {
  item: PoliticasProps[];
}

export default function Politicas({
  item,
}: ItemsProps) {
  return (
    <div className="mobile:mt-[250px] mobile:px-[20px] mt-[100px] pl-[333px]">
      {item &&
        item.map((item) => (
          <section>
            <div className="font-[PP-Hatton] mobile:text-[24px] text-[32px] mt-12 font-bold">
              <h1 className="text-slate-950">{item.titulo}</h1>
            </div>
            <div className="font-[Montserrat] text-[16px] pt-5 pb-5 font-bold">
              <h2>{item.subtitulo}</h2>
            </div>
            <div className="font-[Montserrat] text-[14px]">
              <p dangerouslySetInnerHTML={{ __html: item.paragrafos }} />
            </div>
          </section>
        ))}
    </div>
  );
}
