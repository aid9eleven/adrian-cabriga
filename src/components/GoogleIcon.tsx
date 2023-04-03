import { classNameBuilder } from "../util/stringBuilder";

type GoogleIconType =
  "brush"
  | "code"
  |"face"
  | "mail"
  | "send"
  | "arrow_back"
  | "arrow_forward"
  | "arrow_back_ios"
  | "arrow_forward_ios"

interface IGoogleIconProps {
  icon: GoogleIconType;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

export const GoogleIcon = (props: IGoogleIconProps) => {
  return (
    <span 
      className={classNameBuilder(["google-icon material-symbols-outlined", props.className])}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
    >
      {props.icon}
    </span>
  )
}