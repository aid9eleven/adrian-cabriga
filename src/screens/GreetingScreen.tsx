import { Fragment, useEffect, useReducer } from "react";
import Timer from "../classes/Timer";
import Background from "../components/Background";
import Carousel from "../components/Carousel";
import { GoogleIcon } from "../components/GoogleIcon";
import TextSwitcher from "../components/TextSwitcher";
import { CSS_CONSTANTS } from "../constants/cssClassConstants";

interface ITextSwitcherState {
  id: number,
  text: string,
  className?: string,
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
    className: "emphasized",
    direction: "down",
    switched: false,
    timer: new Timer()
  },
  {
    id: 9,
    text: "graphic designer",
    className: "emphasized",
    direction: "down",
    switched: false,
    timer: new Timer()
  },
  {
    id: 10,
    text: "artist",
    className: "emphasized",
    direction: "down",
    switched: false,
    timer: new Timer()
  },
  {
    id: 11,
    text: "computer engineer",
    className: "emphasized",
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
      switched={textSwitcherStates[props.id].switched}
      className={textSwitcherStates[props.id].className}
      direction={textSwitcherStates[props.id].direction}
      onMouseOver={() => handleTextSwitcherOnMouseOver(props.id)}
      onMouseLeave={() => handleTextSwitcherOnMouseLeave(props.id)}
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
  theme: "blue" | "light-orange"
}

const GreetingScreen = (props: IGreetingScreenProps) => {
  const carouselBackButton = () => (
    <TextSwitcher className="greeting-arrow" hoverable direction="left">
      <GoogleIcon icon="arrow_back"/>
    </TextSwitcher>
  )

  const carouselNextButton = () => (
    <TextSwitcher className="greeting-arrow" hoverable direction="right">
      <GoogleIcon icon="arrow_forward"/>
    </TextSwitcher>
  )

  return (
    <div className={`${CSS_CONSTANTS.SCREEN} ${props.theme}-theme greeting-screen`}>
      <Background theme={props.theme}/>
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
