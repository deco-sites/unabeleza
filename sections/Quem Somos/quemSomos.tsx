import { RichText } from "apps/admin/widgets.ts";

interface QuemSomosProps {
    title: string;
    paragraph?: RichText;
}

interface SomosProps {
    item: QuemSomosProps[]
}

export default function QuemSomos({item}: SomosProps) {
  return (
    <div className="mobile:mt-[250px] mobile:px-[20px] mt-[100px] pl-[333px] pr-[118px] mobile:pt-[44px]">
      {item &&
        item.map((item) => (
          <section>
            <div className="font-[PP-Hatton] mobile:text-[24px] text-[32px] mt-12 font-bold">
              <h1 className="text-slate-950">{item.title}</h1>
            </div>
            <div className="font-[Montserrat] text-[14px]">
              <p dangerouslySetInnerHTML={{ __html: item.paragraph ?? "" }} />
            </div>
          </section>
        ))}
    </div>
  );
}
