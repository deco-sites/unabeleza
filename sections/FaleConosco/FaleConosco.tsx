import { RichText } from "apps/admin/widgets.ts";
import { sanitizeHTMLCode } from "../../sdk/htmlSanitizer.ts";
import { COMMON_HTML_TAGS_TO_ALLOW } from "../../constants.ts"

interface Item {
  nome: string;
  valor: string;
}

/** @title {{titulo}} */
interface FaleConoscoProps {
  titulo: string;
  subTitulo: string;
  contato?: {
    titulo?: string;
    descricao?: RichText;
    itens?: Item[];
  };
}

export default function FaleConosco({ titulo, subTitulo, contato }: FaleConoscoProps) {
  return (
    <div className="mobile:mt-[250px] mobile:px-[20px] my-[100px] desktop:w-full desktop:max-w-[900px] desktop:pr-5 mobile:pt-[44px] desktop:flex desktop:flex-col desktop:items-end desktop:mx-auto desktop-sm:max-w-[700px] desktop-sm:ml-[333px]">
      <form className="max-w-[750px] w-full">
        <div className="mb-[40px]">
          <h1 className="font-[PP-Hatton] text-black font-bold text-[30px] mb-[30px] mobile:text-[24px]">
            {titulo}
          </h1>
          <p className="font-[Montserrat] text-black font-normal text-[14px] leading-[21px]">
            {subTitulo}
          </p>
        </div>
        <div className="flex items-center gap-[20px] mobile:flex-col mb-[24px]">
          <div className="flex flex-col justify-start w-1/2 mobile:w-full">
            <label className="font-[Montserrat] font-bold text-[14px] leading-[21px] mb-[10px] text-black">
              Nome
            </label>
            <input
              className="font-[Montserrat] text-[14px] font-normal leading-[21px] border border-[#E7E7E7] rounded-[5px] pl-[20px] placeholder:font-[Montserrat] placeholder:text-[#999999] placeholder:font-normal placeholder:text-[14px] h-[41px] focus:outline-none focus:border-[#A3E3FF]"
              type="text"
              placeholder="Digite seu nome"
              required
            />
          </div>
          <div className="flex flex-col justify-start w-1/2 mobile:w-full">
            <label className="font-[Montserrat] font-bold text-[14px] leading-[21px] mb-[10px] text-black">
              E-mail
            </label>
            <input
              className="font-[Montserrat] text-[14px] font-normal leading-[21px] border border-[#E7E7E7] rounded-[5px] pl-[20px] placeholder:font-[Montserrat] placeholder:text-[#999999] placeholder:font-normal placeholder:text-[14px] h-[41px] focus:outline-none  focus:border-[#A3E3FF]"
              type="email"
              placeholder="Digite seu e-mail"
              required
            />
          </div>
        </div>
        <div className="w-full mb-[24px]">
          <label className="font-[Montserrat] font-bold text-[14px] leading-[21px] mb-[10px]">
            Assunto
          </label>
          <input
            className="font-[Montserrat] text-[14px] font-normal leading-[21px] w-full border border-[#E7E7E7] rounded-[5px] pl-[20px] placeholder:font-[Montserrat] placeholder:text-[#999999] placeholder:font-normal placeholder:text-[14px] h-[41px] focus:outline-none focus:border-[#A3E3FF]"
            type="text"
            placeholder="Digite o assunto"
            required
          />
        </div>
        <div className="flex flex-col justify-start">
          <label className="font-[Montserrat] font-bold text-[14px] leading-[21px] mb-[10px]">
            Mensagem
          </label>
          <textarea
            placeholder="Digite sua mensagem"
            wrap="virtual"
            className="font-[Montserrat] text-[14px] font-normal leading-[21px] h-[222px] w-full border border-[#E7E7E7] rounded-[5px] pl-[20px] pt-[10px] placeholder:font-[Montserrat] placeholder:text-[#999999] placeholder:font-normal placeholder:text-[14px] focus:outline-none focus:border-[#A3E3FF]"
            required
          />
        </div>
        <div className="flex justify-end mt-[24px] mobile:justify-center mobile:w-full">
          <button className="max-w-[137px] w-full h-[45px] mobile:max-w-full border-[2px] border-[#8F2AED] rounded-[5px] text-[#8F2AED] font-[Montserrat] font-bold text-[14px] leading-[21px] hover:bg-[#BD87ED] hover:text-black hover:border-[#BD87ED]">
            ENVIAR
          </button>
        </div>
        <div class="mt-20 mobile:mt-[60px] w-full">
          {contato?.titulo && (
            <h2 class="text-3xl font-bold font-[PP-Hatton] mobile:text-lg mb-2">
              {contato.titulo}
            </h2>
          )}
          {contato?.descricao && (
            <p
              class="text-sm mobile:text-xs"
              dangerouslySetInnerHTML={{
                __html: sanitizeHTMLCode(contato.descricao, {
                  removeEmptyTags: true,
                  allowedTags: [...COMMON_HTML_TAGS_TO_ALLOW, "br"],
                  removeWrapperTag: true,
                }),
              }}
            />
          )}
          {contato?.itens && (
            <ul class="mt-5 flex flex-col gap-2.5">
              {contato.itens.map((item, index) => (
                <li key={index} class="text-sm mobile:text-xs">
                  <span class="text-primary font-bold">
                    {item.nome}:
                  </span>{" "}
                  {item.valor}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}
