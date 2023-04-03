import { ELEMENT_TYPES, Theme } from "../styles/cssClassConstants";
import { classNameBuilder } from "../util/stringBuilder";
import "./Background.css"

interface IBackgroundProps {
  theme: Theme;
}

const Background = (props: IBackgroundProps) => {

  return (
    <div className={classNameBuilder([
      "background",
      ELEMENT_TYPES.BACKGROUND
    ])}/>
  )
}

export default Background;
