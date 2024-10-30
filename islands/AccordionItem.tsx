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
          <span className="font-[Montserrat] flex items-center justify-center bg-[#A3E3FF] text-[#162116] text-[14px] font-bold rounded-full leading-none min-w-[30px] min-h-[30px]">
            {questionNumber}
          </span>
          <span className="font-[Montserrat] font-bold text-[14px] leading-[21px] text-[#162116] mobile:text-left mobile:font-medium">
            {question}
          </span>
        </div>
        <span className="ml-auto font-[Montserrat] bg-[#A3E3FF] text-[#162116] text-[20px] font-bold rounded-full flex items-center justify-center leading-none min-w-[30px] min-h-[30px]">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="mt-[23px]">
          <p
            className="font-[Montserrat] font-medium text-[14px] leading-[21px] text-[#162116] mobile:ml-[35px]"
            dangerouslySetInnerHTML={{ __html: anwser }}
          />
        </div>
      )}
    </div>
  );
}
