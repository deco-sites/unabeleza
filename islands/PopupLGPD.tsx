import { RichText } from "apps/admin/widgets.ts";
import { useEffect, useState } from "preact/hooks";
import { clx } from "../sdk/clx.ts";

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
    isVisible
      ? document.body.style.overflow = "hidden"
      : document.body.style.overflow = "";
    setIsVisible(!hasAccepted);
  }, [isVisible]);

  const handleAccept = () => {
    localStorage.setItem("lgpdAccepted", JSON.stringify(true));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed z-[9999] inset-0 bg-black bg-opacity-50">
      <div
        className={clx(
          "absolute left-1/2 -translate-x-1/2 bottom-10 mobile:bottom-5 bg-white w-full max-w-[1030px] mobile:max-w-[calc(100vw_-_40px)]",
          "flex mobile:flex-col items-center justify-between px-6 py-4 shadow-md rounded-none",
        )}
      >
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
