import { useState } from "preact/hooks";
import { type RichText } from "apps/admin/widgets.ts";

interface AccordionItemProps {
  questionNumber: number;
  question: string;
  anwser: RichText;
}

export default function AccordionItem({
  questionNumber,
  question,
  anwser,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-300 py-4">
      <button
        className="font-bold text-lg flex items-center w-full"
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-2">
          <span className="font-[Montserrat] flex items-center justify-center bg-[#A3E3FF] text-[#162116] text-[14px] leading-[18px] font-bold rounded-full w-[30px] h-[30px]">{questionNumber}</span>
          <span className="font-[Montserrat] font-bold text-[14px] leading-[21px] text-[#162116]">{question}</span>
        </div>
        <span className="ml-auto font-[Montserrat] bg-[#A3E3FF] text-[#162116] text-[20px] leading-[18px] font-bold rounded-full w-[30px] h-[30px] flex items-center justify-center">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="mt-[23px]">
          <p className="font-[Montserrat] font-medium text-[14px] leading-[21px] text-[#162116]" dangerouslySetInnerHTML={{ __html: anwser }} />
        </div>
      )}
    </div>
  );
}
