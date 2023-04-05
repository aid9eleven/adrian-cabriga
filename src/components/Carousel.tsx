import {  
  useEffect,
  useRef, 
  useState 
} from "react"
import { classNameBuilder } from "../util/stringBuilder";
import "./Carousel.css";
import { ELEMENT_TYPES } from "../styles/cssClassConstants";

interface ICarouselProps {
  children: React.ReactNode[];
  index?: number;
  style?: React.CSSProperties;
  backButton?: React.ReactNode;
  nextButton?: React.ReactNode;
}

/**
 * Developer Note: Define height and width under the styles object for the carousel to appear
 */
const Carousel = (props: ICarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState(0);

  useEffect(() => {
    setParentWidth(containerRef.current?.clientWidth || 0);
  }, [props.index])


  return (
    <div 
      className={
        classNameBuilder([
          "carousel",
        ])
      }
      style={props.style}
    >
      <div 
        className={
          classNameBuilder([
            "carousel-wrapper",
            ELEMENT_TYPES.TRANSITIONING_ELEMENT
          ])
        }
        ref={containerRef}
        style={{
          left: `${-(props.index || 0) * parentWidth}px`
        }}
      >
        {props.children}
      </div>
    </div>
  )
}

export default Carousel