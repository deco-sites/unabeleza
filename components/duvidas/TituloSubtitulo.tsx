interface TituloSubtituloProps {
  titulo?: string;
  subtitulo?: string;
  subtituloDown?: string;
}

export default function TituloSubtitulo({
  titulo,
  subtitulo,
  subtituloDown,
}: TituloSubtituloProps) {
  return (
    <>
      <div className="line">
        <h1 className="text-[32px] mobile:text-[24px] font-bold mt-4 font-[PP-Hatton] text-[#162116]">{titulo}</h1>
      </div>
      {subtitulo && <p className="font-[Montserrat] font-normal text-[14px] mt-[20px] text-[#162116]">{subtitulo}</p>}
      {subtituloDown && <p className="font-[Montserrat] font-normal text-[14px] text-[#162116]">{subtituloDown}</p>}
    </>
  );
}
