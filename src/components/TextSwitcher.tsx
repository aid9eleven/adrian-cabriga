import { ReactNode, useEffect, useState } from "react";
import { CSS_CONSTANTS } from "../styles/cssClassConstants";
import { classNameBuilder } from "../util/stringBuilder";
import "./TextSwitcher.css";

export interface ITextSwitcherProps {
  children?: ReactNode,
  className?: string,
  direction?: "up" | "down" | "left" | "right";
  hoverable?: boolean;
  offStateChildClassName?: string;
  onStateChildClassName?: string;
  style?: React.CSSProperties;
  switched?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
}

const TextSwitcher = (props: ITextSwitcherProps) => {
  const [switched, setSwitched] = useState(false);
  const [direction, setDirection] = useState("up");

  const handleMouseOver = () => {
    if (props.switched) {
      setSwitched(true);
      return;
    };

    if (props.hoverable) setSwitched(true);
  }

  const handleMouseLeave = () => {
    if (props.switched) {
      setSwitched(true);
      return;
    };

    if (props.hoverable) setSwitched(false);
  }

  useEffect(() => {
    setSwitched(props.switched ?? false);
    setDirection(() => {
      if (props.direction === undefined) 
        return "up";
      return props.direction;
    })
  }, [props.switched])
  

  return (
    <div 
      className={
        classNameBuilder([
          "text-switcher",
          props.className,
          `${switched ? CSS_CONSTANTS.ON_STATE : ""}`,
          direction
        ])
      }
      onClick={props.onClick}
      onMouseOver={props.onMouseOver ?? handleMouseOver}
      onMouseLeave={props.onMouseLeave ?? handleMouseLeave}
      style={props.style}
    >
      <div className="text-switcher-base">{props.children}</div>
      <div 
        className={"text-switcher-children-wrapper"}
      >
        <div className={classNameBuilder([
          "text-switcher-on-state-child",
          props.onStateChildClassName
        ])}>
          {props.children}
        </div>
        <div className={classNameBuilder([
          "text-switcher-off-state-child",
          props.offStateChildClassName
        ])}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default TextSwitcher;
