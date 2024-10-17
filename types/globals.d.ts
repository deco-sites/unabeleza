import type { SiteItemPropsLeaf } from "apps/commerce/types.ts";

interface ItemLeaf extends SiteItemPropsLeaf {
    titleMenu?: string;
}
declare global {
    interface SiteItemProps extends SiteItemPropsLeaf {
        children?: Array<
            ItemLeaf & {
                children?: Array<
                    ItemLeaf & {
                        children?: Array<
                            ItemLeaf & {
                                children?: Array<
                                    ItemLeaf & {
                                        children?: ItemLeaf[];
                                    }
                                >;
                            }
                        >;
                    }
                >;
            }
        >;
    }
}