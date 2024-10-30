import { useState } from "preact/hooks";

interface Menu {
  titulo?: string;
  links?: Link[];
}

interface Link {
  rota?: string;
  etiqueta?: string;
}

export default function ButtonMenuInstitucionalMobile(
  { links }: Menu,
) {
  const [navigation, setNavigation] = useState(false);
  const [_, setLabel] = useState<string>(null);

  return (
    <div className="absolute top-[280px] left-[80px]">
      <button onClick={() => setNavigation(!navigation)}>teste</button>
      {navigation &&
        (
          <div>
            {links &&
              links.map((link, index) => (
                <a
                  key={index}
                  onClick={() => setLabel(link.etiqueta)}
                  href={link.rota}
                >
                  {link.etiqueta}
                </a>
              ))}
          </div>
        )}
    </div>
  );
}
