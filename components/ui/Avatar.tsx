import { clx } from "../../sdk/clx.ts";

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "ring-1 ring-offset-2 ring-[#707070]",
  disabled: "line-through",
  default: "border border-[#707070]",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder">
      <div
        class={clx(
          "h-[30px] w-[30px]",
          "rounded-[5px]",
          variants[variant],
        )}
        style={content.includes("#") ? { backgroundColor: content } : undefined}
      >
        <span class="uppercase">
          {content.includes("#") ? "" : content.substring(0, 2)}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
