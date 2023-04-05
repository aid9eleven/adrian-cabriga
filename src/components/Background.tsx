import { ELEMENT_TYPES, Theme } from "../styles/cssClassConstants";
import { classNameBuilder } from "../util/stringBuilder";
import "./Background.css"

const Background = () => {

  return (
    <div className={classNameBuilder([
      "background",
      ELEMENT_TYPES.BACKGROUND
    ])}/>
  )
}

export default Background;
