import { useEffect, useReducer, useState } from "react";
import Timer from "../classes/Timer";
import TextSwitcher, { ITextSwitcherProps } from "./TextSwitcher";

interface ITextSwitcherState {
  id: number,
  text: string,
  switched: boolean,
  timer: Timer
}

const textSwitcherInitialStates: ITextSwitcherState[] = [
  {
    id: 0,
    text: "Hi",
    switched: false,
    timer: new Timer()
  },
  {
    id: 1,
    text: "I",
    switched: false,
    timer: new Timer()
  },
  {
    id: 2,
    text: "am",
    switched: false,
    timer: new Timer()
  },
  {
    id: 3,
    text: "Aid",
    switched: false,
    timer: new Timer()
  },
  {
    id: 4,
    text: "I",
    switched: false,
    timer: new Timer()
  },
  {
    id: 5,
    text: "am",
    switched: false,
    timer: new Timer()
  },
  {
    id: 6,
    text: "a",
    switched: false,
    timer: new Timer()
  },
  {
    id: 7,
    text: "software developer",
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

function LargeGreetingText() {
  const [textSwitcherStates, dispatch] = useReducer(reducer, textSwitcherInitialStates);

  const handleTextSwitcherOnMouseOver = (id: number) => {
    dispatch({ type: "SWITCH_ON", id: id});
  }

  const handleTextSwitcherOnMouseLeave = (id: number) => {
    textSwitcherStates[id].timer.unpause();
  }


  useEffect(() => {
    setInterval(() => {
      dispatch({ type: "UPDATE_TIMER", id: 0});
    }, 1000)
    
    textSwitcherStates.map((textSwitcherState) => {
      if (textSwitcherState.timer.hasTimerStopped()) {
        dispatch({ type: "SWITCH_OFF", id: textSwitcherState.id});
      }
    })
  }, 
  [
    textSwitcherStates[0].switched, textSwitcherStates[0].timer.secondsLeft,
    textSwitcherStates[1].switched, textSwitcherStates[1].timer.secondsLeft,
    textSwitcherStates[2].switched, textSwitcherStates[2].timer.secondsLeft,
    textSwitcherStates[3].switched, textSwitcherStates[3].timer.secondsLeft,
    textSwitcherStates[4].switched, textSwitcherStates[4].timer.secondsLeft,
    textSwitcherStates[5].switched, textSwitcherStates[5].timer.secondsLeft,
    textSwitcherStates[6].switched, textSwitcherStates[6].timer.secondsLeft,
    textSwitcherStates[7].switched, textSwitcherStates[7].timer.secondsLeft,
  ]);
  

  return (
    <div className="large-greeting-text">
      <div className="large-greeting-text-line">
        <TextSwitcher 
          switched={textSwitcherStates[0].switched}
          direction="up" 
          onMouseOver={() => handleTextSwitcherOnMouseOver(0)}
          onMouseLeave={() => handleTextSwitcherOnMouseLeave(0)}
        >
          Hi
        </TextSwitcher>
        <div>,&nbsp;</div>
        <TextSwitcher 
          switched={textSwitcherStates[1].switched}
          direction="down" 
          onMouseOver={() => handleTextSwitcherOnMouseOver(1)}
          onMouseLeave={() => handleTextSwitcherOnMouseLeave(1)}
        >
          I
        </TextSwitcher>
        <div>&nbsp;</div>
        <TextSwitcher 
          switched={textSwitcherStates[2].switched}
          direction="right" 
          onMouseOver={() => handleTextSwitcherOnMouseOver(2)}
          onMouseLeave={() => handleTextSwitcherOnMouseLeave(2)}
        >
          am
        </TextSwitcher>
        <div>&nbsp;</div>
        <TextSwitcher 
          switched={textSwitcherStates[3].switched}
          direction="left" 
          onMouseOver={() => handleTextSwitcherOnMouseOver(3)}
          onMouseLeave={() => handleTextSwitcherOnMouseLeave(3)}
        >
          Aid
        </TextSwitcher>
        <div>.</div>
      </div>
      <div className="large-greeting-text-line">
        <TextSwitcher 
          switched={textSwitcherStates[4].switched}
          direction="right" 
          onMouseOver={() => handleTextSwitcherOnMouseOver(4)}
          onMouseLeave={() => handleTextSwitcherOnMouseLeave(4)}
        >
          I
        </TextSwitcher>
        <div>&nbsp;</div>
        <TextSwitcher 
          switched={textSwitcherStates[5].switched}
          direction="left" 
          onMouseOver={() => handleTextSwitcherOnMouseOver(5)}
          onMouseLeave={() => handleTextSwitcherOnMouseLeave(5)}
        >
          am
        </TextSwitcher>
        <div>&nbsp;</div>
        <TextSwitcher 
          switched={textSwitcherStates[6].switched}
          direction="right" 
          onMouseOver={() => handleTextSwitcherOnMouseOver(6)}
          onMouseLeave={() => handleTextSwitcherOnMouseLeave(6)}
        >
          a
        </TextSwitcher>
        <div>&nbsp;</div>
        <TextSwitcher 
          className="emphasized"
          switched={textSwitcherStates[7].switched}
          direction="down" 
          onMouseOver={() => handleTextSwitcherOnMouseOver(7)}
          onMouseLeave={() => handleTextSwitcherOnMouseLeave(7)}
        >
          software developer
        </TextSwitcher>
        <div>.</div>
      </div>
    </div>
  )
}

export default LargeGreetingText