import { ImageWidget } from "apps/admin/widgets.ts";
import Icon from "../components/ui/Icon.tsx";
import { useEffect, useState } from "preact/hooks";
import { clx } from "../sdk/clx.ts";
import { invoke } from "../runtime.ts";

export interface PopUpProps {
  title?: string;
  text?: string;
  image?: ImageWidget;
}

export default function PopUp(
  { title, text, image }: PopUpProps,
) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notifications: false,
    terms: false,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const closePopup = () => {
    localStorage.setItem("popup_closed", JSON.stringify(true));
    setIsOpen(false);
  };

  useEffect(() => {
    const popup = Boolean(localStorage.getItem("popup_closed"));
    popup === true ? closePopup() : setIsOpen(true);
    isOpen
      ? document.body.style.overflow = "hidden"
      : document.body.style.overflow = "";
  }, [isOpen]);

  if (!isOpen) return null;

  // deno-lint-ignore no-explicit-any
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // deno-lint-ignore no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await invoke.site.actions.sendPopUpNewsLetter({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });

    closePopup();
  };

  return (
    <div class="fixed z-[9999] inset-0 bg-black bg-opacity-50">
      <div
        id="popup"
        class={clx(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FFFFFF]",
          "flex justify-between mobile:justify-center w-[861px] mobile:w-[93%] mobile:mr-[10px] rounded-[5px]",
        )}
      >
        <Icon
          onClick={closePopup}
          id="close"
          class="absolute top-8 right-10 cursor-pointer mobile:top-4 mobile:right-5"
        />
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
            <form
              onSubmit={handleSubmit}
              class="flex flex-col font-[Montserrat]"
            >
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                class="w-[332px] h-[45px] mt-[23.99px] mb-[10px] rounded-[5px] py-[12px] px-[16px] border-[1px] border-[#DBDBDB]"
                placeholder="Digite seu nome:"
              />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                class="w-[332px] h-[45px] mb-[10px] rounded-[5px] py-[12px] px-[16px] border-[1px] border-[#DBDBDB]"
                placeholder="Digite seu e-mail:"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                class="w-[332px] h-[45px] mb-[16px] rounded-[5px] py-[12px] px-[16px] border-[1px] border-[#DBDBDB]"
                placeholder="Celular com DDD:"
              />
              <label class="flex items-center justify-between w-[332px] pr-[25px] cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                  class="cursor-pointer"
                  style={{
                    accentColor: "#A3E3FF",
                  }}
                />
                <p class="font-[Montserrat] text-[12px] cursor-pointer">
                  Quero receber as ofertas por e-mail e Whatsapp
                </p>
              </label>
              <label class="flex items-center justify-between w-[332px] pr-[50px] cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                  class="cursor-pointer"
                  style={{
                    accentColor: "#A3E3FF",
                  }}
                />
                <p class="font-[Montserrat] text-[12px] cursor-pointer">
                  Li e concordo com os termos de privacidade
                </p>
              </label>
              <button
                type="submit"
                class="mt-[18px] w-[100%] h-[45px] rounded-[5px] font-bold bg-primary hover:bg-[#C493EF]"
              >
                CADASTRAR
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
