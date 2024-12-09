import { RichText } from "apps/admin/widgets.ts";
import Popup from "../../islands/PopupLGPD.tsx";

interface PopupProps {
  text: RichText;
  btnText: string;
}

export default function PopupLGPD({ text, btnText }: PopupProps) {
  return <Popup text={text} btnText={btnText} />;
}
