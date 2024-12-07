import { RichText } from "apps/admin/widgets.ts";
import { useEffect, useState } from "preact/hooks";

interface PopupProps {
  text: RichText;
  btnText: string;
}

export default function Popup({ text, btnText }: PopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = JSON.parse(
      localStorage.getItem("lgpdAccepted") || "false",
    );
    setIsVisible(!hasAccepted);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("lgpdAccepted", JSON.stringify(true));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-end p-0 m-0 z-50">
      <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div className="relative bg-white flex mobile:flex-col items-center justify-between px-6 py-4 max-w-[1030px] w-full shadow-md z-50 mb-4 rounded-none mobile:mx-5">
        <p
          className="font-[Montserrat] font-medium text-[14px] leading-[21px] text-black mobile:text-center"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <button
          className="bg-[#BD87ED] hover:bg-[#C493EF] max-w-[257px] w-full h-[45px] rounded-md ml-4 mobile:ml-0 mobile:mt-[24px] font-[Montserrat] font-bold text-[14px] leading-[21px] text-black"
          onClick={handleAccept}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
}
