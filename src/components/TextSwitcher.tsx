import { ReactNode, useState } from "react";
import { CSS_CONSTANTS } from "../constants/cssClassConstants";
import "./TextSwitcher.css";

interface IProps {
  children?: string,
  className?: string,
  direction?: number;
  isSwitched?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}

export const TEXT_SWITCH_DIRECTION = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
}

function TextSwitcher(props: IProps) {
  const direction = props.direction ?? TEXT_SWITCH_DIRECTION.UP;
  const isSwitched = props.isSwitched ?? false;

  return (
    <div 
      className={`text-switcher ${[props.className]}`}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      style={props.style}
    >
      <div className="text-switcher-base">{props.children}</div>
      <div 
        className={`
          text-switcher-children-wrapper 
          ${isSwitched ? CSS_CONSTANTS.ON_STATE : ""}
          ${direction === TEXT_SWITCH_DIRECTION.UP ? "up" : ""}
          ${direction === TEXT_SWITCH_DIRECTION.DOWN ? "down" : ""}
          ${direction === TEXT_SWITCH_DIRECTION.LEFT ? "left" : ""}
          ${direction === TEXT_SWITCH_DIRECTION.RIGHT ? "right" : ""}
        `}
      >
        <div className="text-switcher-styled-child">{props.children}</div>
        <div className="text-switcher-unstyled-child">{props.children}</div>
      </div>
    </div>
  )
}

export default TextSwitcher;
