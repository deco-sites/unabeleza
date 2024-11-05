import { useState } from "preact/hooks";
import { type RichText } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { type ImageWidget } from "apps/admin/widgets.ts";

interface AccordionItemProps {
  questionNumber: number;
  question: string;
  anwser: RichText;
  image?: ImageWidget;
  alt?: string;
  w?: number;
  h?: number;
}

export default function AccordionItem({
  questionNumber,
  question,
  anwser,
  image,
  alt,
  w,
  h,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-300 py-4 font-[Montserrat]">
      <button
        className="font-bold text-lg flex items-center w-full"
        onClick={toggleAccordion}
      >
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center bg-[#A3E3FF] text-[#162116] text-[14px] font-bold rounded-full leading-none min-w-[30px] min-h-[30px]">
            {questionNumber}
          </span>
          <span className="font-bold text-[14px] leading-[21px] text-[#162116] mobile:font-medium mobile:text-left">
            {question}
          </span>
        </div>
        <span className="ml-auto bg-[#A3E3FF] text-[#162116] text-[20px] font-bold rounded-full flex items-center justify-center leading-none min-w-[30px] min-h-[30px]">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="mt-[23px]">
          <p
            className="font-medium text-[14px] leading-[21px] text-[#162116] mobile:ml-[35px]"
            dangerouslySetInnerHTML={{ __html: anwser }}
            />
            {image && (
              <Image
                src={image}
                alt={alt ?? question}
                width={w ?? 766}
                height={h ?? 299}
                className="mt-[16px] mobile:hidden w-[90%]"
              />
            )}
        </div>
      )}
    </div>
  );
}
