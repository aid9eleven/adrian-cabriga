import { Fragment, useEffect, useReducer, useState } from "react";
import Timer from "../classes/Timer";
import Background from "../components/Background";
import Carousel from "../components/Carousel";
import { GoogleIcon } from "../components/GoogleIcon";
import DevSwitcher from "../components/DevSwitcher";
import { CSS_CONSTANTS, ELEMENT_TYPES, FONTS, THEMES, Theme } from "../styles/cssClassConstants";
import { classNameBuilder } from "../util/stringBuilder";
import "./GreetingScreen.css";

interface IDevSwitcherState {
  id: number,
  text: string,
  isHighlighted?: boolean;
  direction: "up" | "down" | "left" | "right",
  switched: boolean,
  timer: Timer
}

const DevSwitcherInitialStates: IDevSwitcherState[] = [
  {
    id: 0,
    text: "Hi",
    direction: "up",
    switched: false,
    timer: new Timer()
  },
  {
    id: 1,
    text: "I",
    direction: "down",
    switched: false,
    timer: new Timer()
  },
  {
    id: 2,
    text: "am",
    direction: "right",
    switched: false,
    timer: new Timer()
  },
  {
    id: 3,
    text: "Aid",
    direction: "left",
    switched: false,
    timer: new Timer()
  },
  {
    id: 4,
    text: "I",
    direction: "right",
    switched: false,
    timer: new Timer()
  },
  {
    id: 5,
    text: "am",
    direction: "left",
    switched: false,
    timer: new Timer()
  },
  {
    id: 6,
    text: "a",
    direction: "right",
    switched: false,
    timer: new Timer()
  },
  {
    id: 7,
    text: "an",
    direction: "right",
    switched: false,
    timer: new Timer()
  },
  {
    id: 8,
    text: "software developer",
    isHighlighted: true,
    direction: "down",
    switched: false,
    timer: new Timer()
  },
  {
    id: 9,
    text: "graphic designer",
    isHighlighted: true,
    direction: "down",
    switched: false,
    timer: new Timer()
  },
  {
    id: 10,
    text: "artist",
    isHighlighted: true,
    direction: "down",
    switched: false,
    timer: new Timer()
  },
  {
    id: 11,
    text: "computer engineer",
    isHighlighted: true,
    direction: "down",
    switched: false,
    timer: new Timer()
  },
];

const reducer = (state: IDevSwitcherState[], action: { type: string; id: number; }) => {
  switch (action.type) {
    case "SWITCH_ON":
      return state.map((DevSwitcherState) => {
        if (DevSwitcherState.id === action.id) {
          let newState = { ...DevSwitcherState, switched: true };
          newState.timer.setTime(5);
          newState.timer.pause();
          return newState;
        } 
        return DevSwitcherState;
      }); 
      
    case "SWITCH_OFF":
      return state.map((DevSwitcherState) => {
        if (DevSwitcherState.id === action.id) {
          return { ...DevSwitcherState, switched: false };
        }
        return DevSwitcherState;
      });

    case "UPDATE_TIMER":
      return state.map((DevSwitcherState) => {
        return DevSwitcherState;
      });

    default:
      return state;
  }
};

interface IGreetingScreenDevSwitcherProps {
  id: number
}

const GreetingScreenDevSwitcher = (props: IGreetingScreenDevSwitcherProps) => {
  const [DevSwitcherStates, dispatch] = useReducer(reducer, DevSwitcherInitialStates);

  const handleDevSwitcherOnMouseOver = (id: number) => {
    dispatch({ type: "SWITCH_ON", id: id });
  }

  const handleDevSwitcherOnMouseLeave = (id: number) => {
    DevSwitcherStates[id].timer.unpause();
  }

  useEffect(() => {
    setInterval(() => {
      dispatch({ type: "UPDATE_TIMER", id: 0 });
    }, 100)
    
    DevSwitcherStates.map((DevSwitcherState) => {
      if (DevSwitcherState.timer.hasTimerStopped()) {
        dispatch({ type: "SWITCH_OFF", id: DevSwitcherState.id});
      }
    })
  }, 
  [
    DevSwitcherStates[props.id].switched, DevSwitcherStates[props.id].timer.secondsLeft
  ]);

  return (
    <DevSwitcher
      direction={DevSwitcherStates[props.id].direction}
      offStateChildClassName={ELEMENT_TYPES.TEXT}
      onStateChildClassName={DevSwitcherStates[props.id].isHighlighted ? ELEMENT_TYPES.HIGHLIGHTED_TEXT : ELEMENT_TYPES.HOVERED_TEXT}
      switched={DevSwitcherStates[props.id].switched}
      onMouseLeave={() => handleDevSwitcherOnMouseLeave(props.id)}
      onMouseOver={() => handleDevSwitcherOnMouseOver(props.id)}
    >
      {DevSwitcherStates[props.id].text}
    </DevSwitcher>
  )
}

interface IGreetingScreenLineTwoProps {
  ids: number[]
}

const GreetingScreenLineTwo = (props: IGreetingScreenLineTwoProps) => (
  <div 
    className={classNameBuilder([
      "greeting-screen-line",
      "greeting-screen-line-2",
      FONTS.MONTSERRAT
    ])} 
  >
    {
      props.ids.map((id, index) => (
        <Fragment key={index}>
          <GreetingScreenDevSwitcher id={id}/>
          {index < props.ids.length - 1 ? <div>&nbsp;</div> : <div>.</div>}
        </Fragment>
      ))
    }
  </div>
)

interface IGreetingScreenProps {
  theme: Theme;
}

const GreetingScreen = (props: IGreetingScreenProps) => {
  const [theme, setTheme] = useState(props.theme);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleBack = () => {
    if (carouselIndex <= 0)
      setCarouselIndex(3);
    else 
      setCarouselIndex(carouselIndex - 1);
  }

  const handleNext = () => {
    if (carouselIndex >= 3)
      setCarouselIndex(0);
    else 
      setCarouselIndex(carouselIndex + 1);
  }

  const carouselBackButton = () => (
    <DevSwitcher 
      className={
        classNameBuilder([
          "greeting-arrow",
          "left",
          ELEMENT_TYPES.POINTER_ELEMENT
        ])
      }
      direction="left"
      hoverable 
      offStateChildClassName={ELEMENT_TYPES.ICON}
      onStateChildClassName={ELEMENT_TYPES.HOVERED_ICON}
      onClick={handleBack}
    >
      <GoogleIcon icon="arrow_back"/>
    </DevSwitcher>
  )

  const carouselNextButton = () => (
    <DevSwitcher className={
      classNameBuilder([
        "greeting-arrow",
        "right",
        ELEMENT_TYPES.POINTER_ELEMENT,
        ELEMENT_TYPES.ICON
      ])} 
      direction="right" 
      hoverable 
      offStateChildClassName={ELEMENT_TYPES.ICON}
      onStateChildClassName={ELEMENT_TYPES.HOVERED_ICON}
      onClick={handleNext}
    >
      <GoogleIcon icon="arrow_forward"/>
    </DevSwitcher>
  )

  return (
    <div 
      className={classNameBuilder([
        "greeting-screen",
        CSS_CONSTANTS.SCREEN,
        theme
      ])}
    >
      <Background/>
      {carouselBackButton()}
      <div className="greeting-wrapper">
        <div 
          className={classNameBuilder([
            "greeting-screen-line",
            "greeting-screen-line-1",
            FONTS.MONTSERRAT
          ])} 
        >
          <GreetingScreenDevSwitcher id={0}/>
          <div>,&nbsp;</div>
          <GreetingScreenDevSwitcher id={1}/>
          <div>&nbsp;</div>
          <GreetingScreenDevSwitcher id={2}/>
          <div>&nbsp;</div>
          <GreetingScreenDevSwitcher id={3}/>
          <div>.</div>
        </div>
        <Carousel 
          backButton={carouselBackButton()}
          index={carouselIndex}
          nextButton={carouselNextButton()}
          style={{
            width: "47rem",
            height: "6rem"
          }}
        >
          <GreetingScreenLineTwo ids={[4, 5, 6, 8]}/>
          <GreetingScreenLineTwo ids={[4, 5, 6, 9]}/>
          <GreetingScreenLineTwo ids={[4, 5, 7, 10]}/>
          <GreetingScreenLineTwo ids={[4, 5, 6, 11]}/>
        </Carousel>
        <div className="greeting-screen-bullets">
          {[...Array(4)].map((_element, index) => (
            <DevSwitcher
              className={ELEMENT_TYPES.POINTER_ELEMENT} 
              height="0.5rem"
              hoverable
              key={index}
              offStateChildClassName={ELEMENT_TYPES.BLOCK}
              onClick={() => setCarouselIndex(index)}
              onStateChildClassName={ELEMENT_TYPES.HOVERED_BLOCK}
              switched={index === carouselIndex}
              width="5rem"
            />
          ))}
        </div>
      </div>
      {carouselNextButton()}
    </div>
  )
}

export default GreetingScreen;
