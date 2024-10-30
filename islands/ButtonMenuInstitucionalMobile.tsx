import { useState } from "preact/hooks";
import Icon from "../components/ui/Icon.tsx";

interface Menu {
  titulo?: string;
  links?: Link[];
}

interface Link {
  rota?: string;
  etiqueta?: string;
}

export default function ButtonMenuInstitucionalMobile({ links }: Menu) {
  const [navigation, setNavigation] = useState(false);
  const [label, setLabel] = useState<string>(null);

  return (
    <div className="hidden mobile:block absolute top-[280px] left-[20px] bg-[#F5F5F5] w-[90%] rounded-[5px]">
      <button
        className="hidden w-full text-left mobile:flex justify-between items-center h-[38px] py-0 px-[10px]"
        onClick={() => setNavigation(!navigation)}
      >
        {label ? label : "Menu"}{" "}
        <Icon
          id="chevron-right"
          className={`pt-[5px] transition-transform duration-300 ${
            navigation ? "rotate-[-90]" : ""
          }`}
        />
      </button>
      {navigation && (
        <div className="flex flex-col items-center justify-start text-left w-[100%] bg-[#F5F5F5] py-0 px-[10px] rounded-[5px]">
          {links &&
            links.map((link, index) => (
              <a
                className={`text-left font-[Montserrat] text-[14px] w-[100%] h-[38px] ${index === 0 ? 'first:mt-[10px]' : ''}`}
                key={index}
                onClick={() => setLabel(link.etiqueta)}
                href={link.rota}
              >
                {link.etiqueta}
              </a>
            ))}
        </div>
      )}
    </div>
  );
}
