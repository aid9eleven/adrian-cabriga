import { CSS_CONSTANTS } from "../constants/cssClassConstants"

interface IBackgroundProps {
  theme: "blue" | "light-orange";
}

const Background = (props: IBackgroundProps) => {
  return (
    <div className="background">
      <div className={`transitioning-background background-light-orange ${props.theme === "light-orange" ? CSS_CONSTANTS.ON_STATE : ""}`}></div>
      <div className={`transitioning-background background-blue ${props.theme === "blue" ? CSS_CONSTANTS.ON_STATE : ""}`}></div>
    </div>
  )
}

export default Background;
