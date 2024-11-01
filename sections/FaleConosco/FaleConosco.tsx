export default function FaleConosco() {
  return (
    <div className="mobile:mt-[250px] mobile:px-[20px] mt-[100px] pl-[333px] pr-[118px]">
      <div className="mb-[40px]">
        <h1 className="font-[PP-Hatton] text-black font-bold text-[30px] mb-[30px]">
          Fale conosco
        </h1>
        <p className="font-[Montserrat] text-black font-normal text-[14px] leading-[21px]">
          Ainda em dúvida sobre algo? Mande uma mensagem! Responderemos o quanto
          antes.
        </p>
      </div>
      <form className="border border-black">
        <div className="flex items-center gap-[20px] mobile:flex-col">
          <div className="flex flex-col justify-start w-1/2">
            <label className="font-[Montserrat] font-bold text-[14px] leading-[21px] mb-[10px] text-black">Nome</label>
            <input className="border border-[#E7E7E7] rounded-[5px] placeholder:ml-[20px] placeholder:font-[Montserrat] placeholder:text-[#999999] placeholder:font-normal placeholder:text-[14px] h-[41px]" type="text" placeholder="Digite seu nome" required/>
          </div>
          <div className="flex flex-col justify-start w-1/2">
            <label className="font-[Montserrat] font-bold text-[14px] leading-[21px] mb-[10px] text-black">E-mail:</label>
            <input className="border border-[#E7E7E7] rounded-[5px] placeholder:ml-[20px] placeholder:font-[Montserrat] placeholder:text-[#999999] placeholder:font-normal placeholder:text-[14px] h-[41px]" type="email" placeholder="Digite seu e-mail" required/>
          </div>
        </div>
        <div>
          <label className="font-[Montserrat] font-bold text-[14px] leading-[21px] mb-[10px]">Assunto</label>
          <input className="w-full border border-black" type="text" placeholder="Digite o assunto" required/>
        </div>
        <div>
          <label>Mensagem*:</label>
          <textarea placeholder="Digite sua mensagem"/>
        </div>
        <div>
          <button>Enviar</button>
        </div>
      </form>
    </div>
  );
}
