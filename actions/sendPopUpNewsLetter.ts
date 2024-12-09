import { AppContext } from "../apps/deco/wake.ts";

export interface Props {
    email: string;
    name: string;
    phone: string;
}

const action = async (
    props: Props,
    _: Request,
    ctx: AppContext,
): Promise<void> => {

    await (ctx as any).invoke("wake/actions/newsletter/register.ts", {
        email: props.email,
        name: props.name,
        informationGroupValues: [{
            id: "eyJFbnRpdHkiOiJJbmZvcm1hdGlvbkdyb3VwRmllbGQiLCJJZCI6MTAwMTJ9",
            value: props.phone
        }]
    });
};

export default action;