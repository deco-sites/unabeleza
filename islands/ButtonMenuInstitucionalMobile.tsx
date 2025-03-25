import { useState } from "preact/hooks";
import Icon from "../components/ui/Icon.tsx";

interface Menu {
  /** @title Título */
  title?: string;
  links?: Link[];
  label?: string;
}

interface Link {
  /** @title Rota */
  route?: string;
  /** @title Etiqueta */
  label?: string;
}

export default function ButtonMenuInstitucionalMobile({ links, label }: Menu) {
  const [navigation, setNavigation] = useState(false);

  links = links?.filter((link) => link.label !== label);

  return (
    <div className="hidden mobile:block absolute top-[280px] left-[20px] bg-[#F5F5F5] w-[90%] rounded-[5px]">
      <button
        className="hidden w-full text-left mobile:flex justify-between items-center h-[38px] py-0 px-[10px] font-[Montserrat] font-normal text-[12px] leading-[18px] text-[#1D1D1D] rounded-[5px] border-t border-l border-r border-[#E7E7E7]"
        onClick={() => setNavigation(!navigation)}
      >
        {label}{" "}
        <Icon
          id="chevron-right"
          className="text-[#8F2AED] mr-[10px]"
          width={6}
          height={13}
          stroke="#8F2AED"
          style={{
            transform: navigation ? "rotate(270deg)" : "rotate(90deg)",
            transition: "transform 0.3s",
          }}
        />
      </button>
      {navigation && (
        <div className="flex flex-col items-center justify-start text-left w-[100%] bg-[#F5F5F5] py-0 px-[10px] rounded-b-[5px] border-b border-r border-l border-[#E7E7E7]">
          {links &&
            links.map(
              (link, index) => (
                  <a
                    className={`text-left font-[Montserrat] text-[12px] w-full h-[38px] ${
                      index === 0 ? "first:mt-[10px]" : ""
                    }`}
                    key={index}
                    href={link.route}
                  >
                    {link.label}
                  </a>
                )
            )}
        </div>
      )}
    </div>
  );
}
