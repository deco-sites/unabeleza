import { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../components/ui/Icon.tsx";
import { useState } from "preact/hooks";
import { clx } from "../sdk/clx.ts";

export interface PopUpProps {
  title?: string;
  text?: string;
  image?: ImageWidget;
}

export default function PopUp(
  { title, text, image }: PopUpProps,
) {
  const [isOpen, setIsOpen] = useState<boolean>(!localStorage.getItem('popup_closed'))
  if (!isOpen) return null

  const closePopup = () => {
    localStorage.setItem('popup_closed', JSON.stringify(true))
    setIsOpen(false)
  }

  return isOpen && (
    <div>
      <div class="fixed z-20 top-0 left-0 bg-[#060D21] opacity-[33%] w-[100%] h-[100vh]"></div>
      <div id="popup" class={clx(
        "z-30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF]",
        "flex justify-between mobile:justify-center w-[861px] mobile:w-[93%] mobile:mr-[10px] rounded-[5px]"
      )}>
        <Icon onClick={closePopup} id="close" class="absolute top-8 right-10 cursor-pointer mobile:top-4 mobile:right-5" />
        <section class="mobile:hidden">
          <div>
            <img class="rounded-l-[5px]" src={image} alt="imagem do popup" />
          </div>
        </section>
        <section class="flex flex-col justify-center phone:justify-start items-center phone:items-start pr-[75px] mobile:p-[20px]">
          <div>
            <p class="font-[PP-Hatton] text-[28px] text-center phone:text-left mb-[12px]">
              {title}
            </p>
            <p class="font-[Montserrat] text-[16px]">{text}</p>
          </div>
          <div>
            <form action="" class="flex flex-col font-[Montserrat]">
              <input
                class="w-[332px] h-[45px] mt-[23.99px] mb-[10px] rounded-[5px] py-[12px] px-[16px] border-[1px] border-[#DBDBDB]"
                placeholder="Digite seu nome:" />
              <input
                class="w-[332px] h-[45px] mb-[10px] rounded-[5px] py-[12px] px-[16px] border-[1px] border-[#DBDBDB]"
                placeholder="Digite seu e-mail:" />
              <input
                class="w-[332px] h-[45px] mb-[16px] rounded-[5px] py-[12px] px-[16px] border-[1px] border-[#DBDBDB]"
                placeholder="Celular com DDD:" />
              <label class="flex items-center justify-between w-[332px] pr-[25px] cursor-pointer">
                <input type="checkbox" class="cursor-pointer hidden peer" />
                <p class="font-[Montserrat] text-[12px] cursor-pointer">
                  Quero receber as ofertas por e-mail e Whatsapp
                </p>
              </label>
              <label class="flex items-center justify-between w-[332px] pr-[50px] cursor-pointer">
                <input type="checkbox" class="cursor-pointer" />
                <p class="font-[Montserrat] text-[12px] cursor-pointer">
                  Li e concordo com os termos de privacidade
                </p>
              </label>
              <button class="mt-[18px] w-[100%] h-[45px] bg-[#BD87ED]">CADASTRAR</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
