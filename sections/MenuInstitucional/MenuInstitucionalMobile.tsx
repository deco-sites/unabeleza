import ButtonMenuInstitucionalMobile from "../../islands/ButtonMenuInstitucionalMobile.tsx";

interface Menu {
  links?: Link[];
}

interface Link {
  rota?: string;
  etiqueta?: string;
}

export default function MenuInstitucionalMobile(
  { links }: Menu,
) {
  console.log(links);

  return <ButtonMenuInstitucionalMobile links={links} />;
}
