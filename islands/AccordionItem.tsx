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
    <div className="faq-item border-b border-gray-300 py-4">
      <button
        className="faq-question font-bold text-lg flex items-center w-full"
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">{questionNumber}.</span>
          <span className="ml-3">{question}</span>
        </div>
        <span className="ml-auto text-gray-500">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <div className="faq-answer mt-4">
          <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: anwser }} />
        </div>
      )}
    </div>
  );
}
