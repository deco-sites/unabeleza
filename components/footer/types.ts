import { ImageWidget, RichText } from "apps/admin/widgets.ts";

/** @titleBy title */
export interface Item {
  title: RichText;
  href?: string;
}

/** @titleBy title */
export interface Menu extends Item {
  items: Item[];
}

/** @titleBy alt */
export interface Icon {
  alt?: string;
  href?: string;
  image: ImageWidget;
}

/** @titleBy title */
export interface PaymentMethods {
  title: string;
  items?: Icon[];
}

export interface DeveloperLogo {
  econverse: {
    image: ImageWidget;
    url: string;
  };
  wake: {
    image: ImageWidget;
    url: string;
  };
}

export interface Props {
  menus?: Menu[];
  social?: Icon[];
  paymentMethods?: PaymentMethods;
  developerLogo: DeveloperLogo;
  logo?: ImageWidget;
}
