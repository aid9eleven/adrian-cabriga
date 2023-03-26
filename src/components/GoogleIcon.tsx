import { classNameBuilder } from "../util/stringBuilder";

export const GOOGLE_ICON_TYPE = {
  BRUSH: "brush",
  CODE: "code",
  FACE: "face",
  MAIL: "mail",
  SEND: "send",
}

interface IProps {
  icon: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;

}

export function GoogleIcon(props: IProps) {
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