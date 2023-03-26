import { ReactNode, useEffect, useState } from "react";
import { CSS_CONSTANTS } from "../constants/cssClassConstants";
import { classNameBuilder } from "../util/stringBuilder";
import "./TextSwitcher.css";

export type TextSwitchDirection = "up" | "down" | "left" | "right";

interface IProps {
  children?: string,
  className?: string,
  direction?: TextSwitchDirection;
  isSwitched?: boolean;
  isHoverable?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

function TextSwitcher(props: IProps) {
  const [isSwitched, setSwitched] = useState(false)

  const handleMouseOver = () => {
    if (props.isSwitched) {
      setSwitched(true);
      return;
    };

    if (props.isHoverable) setSwitched(true);
  }

  const handleMouseLeave = () => {
    if (props.isSwitched) {
      setSwitched(true);
      return;
    };

    if (props.isHoverable) setSwitched(false);
  }

  useEffect(() => {
    setSwitched(props.isSwitched ?? false);
  }, [props.isSwitched])
  

  return (
    <div 
      className={
        classNameBuilder([
          "text-switcher",
          props.className,
          (props.isHoverable ? CSS_CONSTANTS.HOVERABLE : "")
        ])
      }
      onClick={props.onClick}
      onMouseOver={props.onMouseOver ?? handleMouseOver}
      onMouseLeave={props.onMouseLeave ?? handleMouseLeave}
      style={props.style}
    >
      <div className="text-switcher-base">{props.children}</div>
      <div 
        className={
          "text-switcher-children-wrapper"
          + `${isSwitched ? " " + CSS_CONSTANTS.ON_STATE : ""}`
          + ` ${props.direction}`
        }
      >
        <div className="text-switcher-styled-child" style={props.style}>{props.children}</div>
        <div className="text-switcher-unstyled-child" style={props.style}>{props.children}</div>
      </div>
    </div>
  )
}

export default TextSwitcher;
