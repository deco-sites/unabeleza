import { RichText } from "apps/admin/widgets.ts";

interface QuemSomosProps {
  title?: string;
  subTitle?: string;
  paragraph?: RichText;
}

interface SomosProps {
  item: QuemSomosProps[];
}

export default function QuemSomos({ item }: SomosProps) {
  return (
    <div className="mobile:mt-[250px] mobile:px-[20px] mt-[100px] mb-[91px] pl-[333px] pr-[118px] mobile:pt-[44px] mobile:pb-[89px]">
      {item &&
        item.map((item, index) => (
          <section key={index}>
            <div className={`font-[PP-Hatton] mobile:text-[24px] text-[32px] mt-12 font-bold ${index > 0 ? 'hidden': "" }`}>
              <h1 className="text-black">{item.title}</h1>
            </div>
            <div className="font-[Montserrat] text-[16px] font-bold leading-[24px] mt-[20px] mb-[10px]">
              <p className="text-black">{item.subTitle}</p>
            </div>
            <div className="font-[Montserrat] text-[14px] flex flex-col gap-[10px]">
              <p dangerouslySetInnerHTML={{ __html: item.paragraph ?? "" }} />
            </div>
          </section>
        ))}
    </div>
  );
}
