import { PropertyValue } from "apps/commerce/types.ts";

interface TabsMobileProps {
  productInformations: PropertyValue[];
}

export default function TabsMobile({ productInformations }: TabsMobileProps) {
  if (productInformations?.length === 0) return null;

  return (
    <>
      {productInformations?.map((item) => (
        <div tabIndex={0} className="collapse collapse-arrow" key={item.name}>
          <input type="checkbox" className="peer" />
          <div className="collapse-title peer-checked:text-primary">
            <h2 class="text-sm font-bold text-black uppercase">{item.name}</h2>
          </div>
          <div
            className="collapse-content text-sm mobile:text-xs"
            dangerouslySetInnerHTML={{ __html: item.value ?? "" }}
          />
        </div>
      ))}
    </>
  );
}
