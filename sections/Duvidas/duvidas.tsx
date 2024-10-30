import { type RichText } from "apps/admin/widgets.ts";
import TituloSubtitulo from "../../components/duvidas/TituloSubtitulo.tsx";
import AccordionItem from '../../islands/AccordionItem.tsx';

/** @title {{titulo}} */

interface QuestionsProps {
  questionNumber?: number;
  question?: string;
  anwser?: RichText;
}

interface ItemsDuvidasProps {
  item: QuestionsProps[];
  titulo?: string;
  subtitulo?: string;
  subtituloDown?: string;
}

export default function Duvidas({
  item,
  titulo,
  subtitulo,
  subtituloDown,
}: ItemsDuvidasProps) {
  return (
    <div className="mobile:mt-[250px] mobile:px-[20px] mt-[100px] mb-[80px] pl-[333px] pr-[118px]">
      <TituloSubtitulo
        titulo={titulo}
        subtitulo={subtitulo}
        subtituloDown={subtituloDown}
      />
      <div className="mt-8">
        {item &&
          item.map((faqItem, index) => (
            <AccordionItem
              key={index}
              questionNumber={faqItem.questionNumber || 0}
              question={faqItem.question || ""}
              anwser={faqItem.anwser || ""}
            />
          ))}
      </div>
    </div>
  );
}
