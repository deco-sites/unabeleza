interface TituloSubtituloProps {
  title?: string;
  subTitle?: string;
  subTitleDown?: string;
}

export default function TituloSubtitulo({
  title,
  subTitle,
  subTitleDown,
}: TituloSubtituloProps) {
  return (
    <>
      <div className="line">
        <h1 className="text-[32px] mobile:text-[24px] font-bold mt-4 font-[PP-Hatton] text-[#162116]">{title}</h1>
      </div>
      {subTitle && <p className="font-[Montserrat] font-medium text-[14px] mt-[20px] text-[#162116]">{subTitle}</p>}
      {subTitleDown && <p className="font-[Montserrat] font-medium text-[14px] text-[#162116]">{subTitleDown}</p>}
    </>
  );
}
