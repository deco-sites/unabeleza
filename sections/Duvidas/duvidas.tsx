import { type RichText } from "apps/admin/widgets.ts";
import TituloSubtitulo from "../../components/duvidas/TituloSubtitulo.tsx";
import AccordionItem from '../../islands/AccordionItem.tsx'

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
    <div className="container mx-auto px-4 py-10 flex justify-center mt-[40px]">
      <div className="max-w-4xl w-full">
        <TituloSubtitulo
          titulo={titulo}
          subtitulo={subtitulo}
          subtituloDown={subtituloDown}
        />
        <div className="faq-accordion mt-8">
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
    </div>
  );
}
