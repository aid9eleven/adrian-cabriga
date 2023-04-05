import { useEffect, useState } from "react";
import { CSS_CONSTANTS } from "../styles/cssClassConstants";
import { classNameBuilder } from "../util/stringBuilder";
import "./DevSwitcher.css";

export interface IDevSwitcherProps {
  children?: React.ReactNode,
  className?: string,
  direction?: "up" | "down" | "left" | "right";
  height?: string | number,
  hoverable?: boolean;
  offStateChildClassName?: string;
  onStateChildClassName?: string;
  style?: React.CSSProperties;
  switched?: boolean;
  width?: string | number,
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
}

const DevSwitcher = (props: IDevSwitcherProps) => {
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
          "dev-switcher",
          props.className,
          `${switched ? CSS_CONSTANTS.ON_STATE : ""}`,
          direction
        ])
      }
      style={{...props.style, height: props.height, width: props.width}}
      onClick={props.onClick}
      onMouseOver={props.onMouseOver ?? handleMouseOver}
      onMouseLeave={props.onMouseLeave ?? handleMouseLeave}
    >
      <div className="dev-switcher-base">{props.children}</div>
      <div 
        className={"dev-switcher-children-wrapper"}
      >
        <div 
          className={classNameBuilder([
            "dev-switcher-on-state-child",
            props.onStateChildClassName
          ])}
          style={{height: props.height, width: props.width}}
        >
          {props.children}
        </div>
        <div 
          className={classNameBuilder([
            "dev-switcher-off-state-child",
            props.offStateChildClassName
          ])}
          style={{height: props.height, width: props.width}}
        >
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default DevSwitcher;
