import { useState } from "react";
import { CSS_CONSTANTS } from "../constants/cssClassConstants"

interface IBackgroundProps {
  theme: "blue" | "light-orange";
}

const Background = (props: IBackgroundProps) => {
  const [currentTheme, setCurrentTheme] = useState(props.theme);

  return (
    <div className={`background background-${currentTheme}`}>
      <div className={`transitioning-background background-blue ${props.theme === "blue" ? CSS_CONSTANTS.ON_STATE : ""}`}></div>
      <div className={`transitioning-background background-light-orange ${props.theme === "light-orange" ? CSS_CONSTANTS.ON_STATE : ""}`}></div>
      
    </div>
  )
}

export default Background;
