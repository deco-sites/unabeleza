import { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../components/ui/Icon.tsx";
import { useEffect, useState } from "preact/hooks";

/**@title PopupDeEntrada*/
export interface PopupDeEntradaProps {
    /**@title Título*/
    titlePopUp?: string;
    /**@title Texto*/
    textPopUp?: string;
    imagePopupEntradaPopUp?: ImageWidget;
}

export default function ComponentPopupDeEntrada(
    { titlePopUp, textPopUp, imagePopupEntradaPopUp }: PopupDeEntradaProps,
) {
    const [IsOpen, setIsOpen] = useState<boolean>(null)

    const closePopup = () => {
        localStorage.setItem('popup_closed', JSON.stringify(IsOpen))
        setIsOpen(false)
    }

    const _blockPopup = () => {
        const targetDiv = document.getElementById('#popupDeEntrada')
        if(IsOpen == true && targetDiv){
            document.body.style.overflow = 'hidden'
            document.body.style.pointerEvents = 'none'
            targetDiv.style.pointerEvents = 'auto'
        }
    }

    useEffect(() => {
        const popup = Boolean(localStorage.getItem('popup_closed')) 
        if(popup == true){
            closePopup()
        } else {
            setIsOpen(true)
        }
    }, [])

    return (
        <div>
            {IsOpen == true &&
            <><div className="fixed z-20 top-0 left-0 bg-[#060D21] opacity-[33%] w-[100%] h-[100vh]"></div>
            <div id="popupDeEntrada" className="z-30 fixed top-[190px] mobile:top-[70px] mobile:left-[8%] left-[20%] bg-[#FFFFFF] flex justify-between w-[861px] rounded-[5px]">
              <Icon onClick={closePopup} id="close" className="absolute top-8 right-10 cursor-pointer" />
              <section>
                <div>
                  <img className="rounded-l-[5px]" src={imagePopupEntradaPopUp} alt="" />
                </div>
              </section>
              <section className="flex flex-col justify-center items-center pr-[75px]">
                <div>
                  <p className="font-[PP-Hatton] text-[28px] text-center mb-[12px]">
                    {titlePopUp}
                  </p>
                  <p className="font-[Montserrat] text-[16px]">
                    {textPopUp}
                  </p>
                </div>
                <div>
                  <form 
                    action=""
                    className="flex flex-col font-[Montserrat]"
                  >
                    <input 
                      className="w-[332px] h-[45px] mt-[23.99px] mb-[10px] rounded-[5px] py-[12px] px-[16px] border-[1px] border-[#DBDBDB]"
                      type="text"
                      placeholder="Digite seu nome:" />
                    <input 
                      className="w-[332px] h-[45px] mb-[10px] rounded-[5px] py-[12px] px-[16px] border-[1px] border-[#DBDBDB]"
                      type="text"
                      placeholder="Digite seu e-mail:" />
                    <input 
                      className="w-[332px] h-[45px] mb-[16px] rounded-[5px] py-[12px] px-[16px] border-[1px] border-[#DBDBDB]"
                      type="text"
                      placeholder="Celular com DDD:" />
                    <label 
                      htmlFor=""
                      className="flex items-center justify-between w-[332px] pr-[25px] cursor-pointer"
                    >
                      <input type="checkbox" className="cursor-pointer" />
                      <p className="font-[Montserrat] text-[12px] cursor-pointer">
                        Quero receber as ofertas por e-mail e
                        Whatsapp
                      </p>
                    </label>
                    <label 
                      htmlFor=""
                      className="flex items-center justify-between w-[332px] pr-[50px] cursor-pointer"
                    >
                      <input type="checkbox" className="cursor-pointer" />
                      <p className="font-[Montserrat] text-[12px] cursor-pointer">
                        Li e concordo com os termos de privacidade
                      </p>
                    </label>
                    <button className="mt-[18px] w-[100%] h-[45px] bg-[#BD87ED]">CADASTRAR</button>
                  </form>
                </div>
              </section>
            </div></>
            }
        </div>
    );
}
