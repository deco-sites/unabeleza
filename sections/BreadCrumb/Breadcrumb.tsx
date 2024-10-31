interface BreadcrumbProps {
  nome_da_pagina: string;
}

export default function Breadcrumb({ nome_da_pagina }: BreadcrumbProps) {
  return (
    <div>
      <p className="font-[Montserrat] font-[16px] absolute top-[230px] left-[80px] mobile:left-[20px] mobile:text-[14px]">
        Home / <b className="font-[Montserrat] text-black text-[16px] leading-6 mobile:text-[14px]">{nome_da_pagina}</b>
      </p>
    </div>
  );
}
