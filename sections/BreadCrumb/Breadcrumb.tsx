interface BreadcrumbProps {
  nome_da_pagina: string;
}

export default function Breadcrumb({ nome_da_pagina }: BreadcrumbProps) {
  return (
    <div>
      <p className="font-[Montserrat] font-[16px] absolute top-[230px] left-[80px] mobile:left-[20px]">
        Home / <b>{nome_da_pagina}</b>
      </p>
    </div>
  );
}
