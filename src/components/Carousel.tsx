import { 
  Children, 
  ReactNode, 
  useEffect, 
  useLayoutEffect, 
  useMemo, 
  useRef, 
  useState 
} from "react"
import { classNameBuilder } from "../util/stringBuilder";
import "./Carousel.css";
import { GoogleIcon } from "./GoogleIcon";

interface ICarouselProps {
  children: ReactNode[];
  style?: React.CSSProperties;
  backButton?: ReactNode;
  nextButton?: ReactNode;
}

/**
 * Developer Note: Define height and width under the styles object for the carousel to appear
 */
const Carousel = (props: ICarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);
  const [wrapperOneDisplacement, setWrapperOneDisplacement] = useState(0);
  const [wrapperTwoDisplacement, setWrapperTwoDisplacement] = useState(0);
  const [wrapperThreeDisplacement, setWrapperThreeDisplacement] = useState(0);  

  const transition = "0.3s ease-in-out";

  const backButton = () => (
    <GoogleIcon icon="arrow_back_ios" />
  )

  const nextButton = () => (
    <GoogleIcon icon="arrow_forward_ios" />
  )

  const isDisplacementWithinTransitionRange = (displacement: number): boolean => {
    return displacement >= (-parentWidth * props.children.length) && displacement <= parentWidth
  }

  const shiftRight = (displacement: number): number => {
    if (displacement >= parentWidth * props.children.length)
      return -parentWidth * (2 * props.children.length - 1);
    return displacement + parentWidth;
  }

  const shiftLeft = (displacement: number): number => {
    if (displacement <= -parentWidth * (2 * props.children.length - 1))
      return parentWidth * props.children.length;
    return displacement - parentWidth;
  }

  const handleBack = () => {
    setWrapperOneDisplacement(shiftRight(wrapperOneDisplacement))
    setWrapperTwoDisplacement(shiftRight(wrapperTwoDisplacement))
    setWrapperThreeDisplacement(shiftRight(wrapperThreeDisplacement))
  }

  const handleNext = () => {
    setWrapperOneDisplacement(shiftLeft(wrapperOneDisplacement))
    setWrapperTwoDisplacement(shiftLeft(wrapperTwoDisplacement))
    setWrapperThreeDisplacement(shiftLeft(wrapperThreeDisplacement))
  }

  useEffect(() => {
    setParentWidth(containerRef.current?.clientWidth || 0);
    setWrapperOneDisplacement(-parentWidth * props.children.length);
    setWrapperTwoDisplacement(0);
    setWrapperThreeDisplacement(parentWidth * props.children.length);
  }, [parentWidth])


  return (
    <div className={
      classNameBuilder([
        "carousel",
      ])
    }>
      <div 
        className="carousel-back-button"
        onClick={handleBack}
      >
        {props.backButton || backButton()}
      </div>
      <div 
        className="carousel-body"
        ref={containerRef}
        style={props.style}
      >
        <div 
          className="carousel-wrapper"
          style={{
            left: `${wrapperOneDisplacement}px`,
            transition: isDisplacementWithinTransitionRange(wrapperOneDisplacement) ? transition : ""
          }}
        >
          {props.children}
        </div>
        <div 
          className="carousel-wrapper"
          style={{
            left: `${wrapperTwoDisplacement}px`,
            transition: isDisplacementWithinTransitionRange(wrapperTwoDisplacement) ? transition : ""
          }}
        >
          {props.children}
        </div>
        <div 
          className="carousel-wrapper"
          style={{
            left: `${wrapperThreeDisplacement}px`,
            transition: isDisplacementWithinTransitionRange(wrapperThreeDisplacement) ? transition : ""
          }}
        >
          {props.children}
        </div>
      </div>
      <div
        className="carousel-next-button"
        onClick={handleNext}
      >
        {props.nextButton || nextButton()}
      </div>
    </div>
  )
}

export default Carousel