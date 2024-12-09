import { ImageWidget, type RichText } from "apps/admin/widgets.ts";
import TituloSubtitulo from "../../components/duvidas/TituloSubtitulo.tsx";
import AccordionItem from "../../islands/AccordionItem.tsx";

/** @title {{titulo}} */

interface QuestionsProps {
  questionNumber?: number;
  question?: string;
  anwser?: RichText;
  image?: ImageWidget;
  w?: number;
  h?: number;
}

interface ItemsDuvidasProps {
  item: QuestionsProps[];
  title?: string;
  subTitle?: string;
  subTitleDown?: string;
}

export default function Duvidas({
  item,
  title,
  subTitle,
  subTitleDown,
}: ItemsDuvidasProps) {
  return (
    <div className="mobile:mt-[250px] mobile:px-[20px] mt-[100px] pl-[333px] pr-[118px]">
      <TituloSubtitulo
        title={title}
        subTitle={subTitle}
        subTitleDown={subTitleDown}
      />
      <div className="mt-8">
        {item &&
          item.map((faqItem, index) => (
            <AccordionItem
              key={index}
              questionNumber={faqItem.questionNumber || 0}
              question={faqItem.question || ""}
              anwser={faqItem.anwser || ""}
              image={faqItem.image || ""}
            />
          ))}
      </div>
    </div>
  );
}
