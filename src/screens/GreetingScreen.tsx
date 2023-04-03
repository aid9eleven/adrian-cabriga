import { Fragment, useEffect, useReducer, useState } from "react";
import Timer from "../classes/Timer";
import Background from "../components/Background";
import Carousel from "../components/Carousel";
import { GoogleIcon } from "../components/GoogleIcon";
import TextSwitcher from "../components/TextSwitcher";
import { CSS_CONSTANTS, ELEMENT_TYPES, THEME_CONSTANTS, Theme } from "../styles/cssClassConstants";
import { classNameBuilder } from "../util/stringBuilder";

interface ITextSwitcherState {
  id: number,
  text: string,
  isHighlighted?: boolean;
  direction: "up" | "down" | "left" | "right",
  switched: boolean,
  timer: Timer
}

const textSwitcherInitialStates: ITextSwitcherState[] = [
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

const reducer = (state: ITextSwitcherState[], action: { type: string; id: number; }) => {
  switch (action.type) {
    case "SWITCH_ON":
      return state.map((textSwitcherState) => {
        if (textSwitcherState.id === action.id) {
          let newState = { ...textSwitcherState, switched: true };
          newState.timer.setTime(5);
          newState.timer.pause();
          return newState;
        } 
        return textSwitcherState;
      }); 
      
    case "SWITCH_OFF":
      return state.map((textSwitcherState) => {
        if (textSwitcherState.id === action.id) {
          return { ...textSwitcherState, switched: false };
        }
        return textSwitcherState;
      });

    case "UPDATE_TIMER":
      return state.map((textSwitcherState) => {
        return textSwitcherState;
      });

    default:
      return state;
  }
};

interface IGreetingScreenTextSwitcherProps {
  id: number
}

const GreetingScreenTextSwitcher = (props: IGreetingScreenTextSwitcherProps) => {
  const [textSwitcherStates, dispatch] = useReducer(reducer, textSwitcherInitialStates);

  const handleTextSwitcherOnMouseOver = (id: number) => {
    dispatch({ type: "SWITCH_ON", id: id });
  }

  const handleTextSwitcherOnMouseLeave = (id: number) => {
    textSwitcherStates[id].timer.unpause();
  }

  useEffect(() => {
    setInterval(() => {
      dispatch({ type: "UPDATE_TIMER", id: 0 });
    }, 100)
    
    textSwitcherStates.map((textSwitcherState) => {
      if (textSwitcherState.timer.hasTimerStopped()) {
        dispatch({ type: "SWITCH_OFF", id: textSwitcherState.id});
      }
    })
  }, 
  [
    textSwitcherStates[props.id].switched, textSwitcherStates[props.id].timer.secondsLeft
  ]);

  return (
    <TextSwitcher
      direction={textSwitcherStates[props.id].direction}
      offStateChildClassName={ELEMENT_TYPES.TEXT}
      onStateChildClassName={textSwitcherStates[props.id].isHighlighted ? ELEMENT_TYPES.HIGHLIGHTED_TEXT : ELEMENT_TYPES.HOVERED_TEXT}
      switched={textSwitcherStates[props.id].switched}
      onMouseLeave={() => handleTextSwitcherOnMouseLeave(props.id)}
      onMouseOver={() => handleTextSwitcherOnMouseOver(props.id)}
    >
      {textSwitcherStates[props.id].text}
    </TextSwitcher>
  )
}

interface IGreetingScreenLineTwoProps {
  ids: number[]
}

const GreetingScreenLineTwo = (props: IGreetingScreenLineTwoProps) => (
  <div className="greeting-screen-line greeting-screen-line-2">
    {
      props.ids.map((id, index) => (
        <Fragment key={index}>
          <GreetingScreenTextSwitcher id={id}/>
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
  const [theme, setTheme] = useState(props.theme)

  const themeChanger = () => {
    if (theme === THEME_CONSTANTS.LIGHT_ORANGE) {
      setTheme(THEME_CONSTANTS.BLUE)
    }
    else {
      setTheme(THEME_CONSTANTS.LIGHT_ORANGE) 
    }
    
    console.log(theme);
  }

  const carouselBackButton = () => (
    <TextSwitcher 
      className={
        classNameBuilder([
          "greeting-arrow",
          ELEMENT_TYPES.POINTER_ELEMENT
        ])
      }
      direction="left"
      hoverable 
      offStateChildClassName={ELEMENT_TYPES.ICON}
      onStateChildClassName={ELEMENT_TYPES.HOVERED_ICON}
      onClick={themeChanger}
    >
      <GoogleIcon icon="arrow_back"/>
    </TextSwitcher>
  )

  const carouselNextButton = () => (
    <TextSwitcher className={
      classNameBuilder([
        "greeting-arrow",
        ELEMENT_TYPES.POINTER_ELEMENT,
        ELEMENT_TYPES.ICON
      ])} 
      direction="right" 
      hoverable 
      offStateChildClassName={ELEMENT_TYPES.ICON}
      onStateChildClassName={ELEMENT_TYPES.HOVERED_ICON}
      onClick={themeChanger}
    >
      <GoogleIcon icon="arrow_forward"/>
    </TextSwitcher>
  )

  return (
    <div 
      className={classNameBuilder([
        "greeting-screen",
        CSS_CONSTANTS.SCREEN,
        props.theme
      ])}
    >
      <Background theme={theme}/>
      <div className="greeting-wrapper">
        <div className="greeting-screen-line greeting-screen-line-1">
          <GreetingScreenTextSwitcher id={0}/>
          <div>,&nbsp;</div>
          <GreetingScreenTextSwitcher id={1}/>
          <div>&nbsp;</div>
          <GreetingScreenTextSwitcher id={2}/>
          <div>&nbsp;</div>
          <GreetingScreenTextSwitcher id={3}/>
          <div>.</div>
        </div>
        <Carousel 
          backButton={carouselBackButton()}
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
      </div>
    </div>
  )
}

export default GreetingScreen;
