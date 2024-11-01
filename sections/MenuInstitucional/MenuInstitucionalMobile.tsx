import ButtonMenuInstitucionalMobile from "../../islands/ButtonMenuInstitucionalMobile.tsx";

interface Menu {
  links?: Link[];
}

/** @title {{label}} */
interface Link {
  /** @title Rota */
  route?: string;
  /** @title Etiqueta */
  label?: string;
}

export const loader = ({ links }: Menu, req: Request) => {
  const currentPath = new URL(req.url).pathname;
  const matchingLink = links?.find((link) => link.route === currentPath);

  return {
    label: matchingLink ? matchingLink.label : "Menu",
    links,
  };

};


/** @title Menu Institucional Mobile */
export default function MenuInstitucionalMobile(
  { links, label }: ReturnType<typeof loader>,
) {

  return <ButtonMenuInstitucionalMobile links={links} label={label}/>;
}
