interface Menu {
  institutionalTitle?: string;
  supportTitle?: string;
  institutionalLinks?: Link[];
  helpLinks?: Link[];
}

interface Link {
  route?: string;
  label?: string;
}

export const loader = (menu: Menu, req: Request) => {
  const currentPath = new URL(req.url).pathname;
  return {
    ...menu, 
    currentPath
  }
}

export default function MenuInstitucional(
  { institutionalTitle, supportTitle, institutionalLinks, helpLinks, currentPath }:
    ReturnType<typeof loader>,
) {
  
  return (
    <div className="hidden desktop:block absolute top-[280px] left-[80px] list-none bg-[#FAFAFA] py-[40px] pl-[40px] pr-[49px]">
      <h3 className="text-black text-[16px] font-bold mb-[20px]">
        {institutionalTitle}
      </h3>
      <div>
        {institutionalLinks &&
          institutionalLinks.map(({ route, label }, index) => (
            <li className="text-[12px] font-regular cursor-pointer" key={index}>
              <a
                href={route}
                className={`${
                  currentPath === route ? "text-[#8F2AED] font-bold" : "text-black"
                } hover:text-[#8F2AED]`}
              >
                {label}
              </a>
            </li>
          ))}
      </div>

      <hr className="border-t-1 border-[#F1F1F1] my-5" />

      <h3 className="text-black text-[16px] font-bold mb-[20px]">
        {supportTitle}
      </h3>
      <div>
        {helpLinks &&
          helpLinks.map(({ route, label }, index) => (
            <li className="text-[12px] font-regular cursor-pointer" key={index}>
              <a
                href={route}
                className={`${
                  currentPath === route ? "text-[#8F2AED] font-bold" : "text-black"
                } hover:text-[#8F2AED]`}
              >
                {label}
              </a>
            </li>
          ))}
      </div>
    </div>
  );
}
