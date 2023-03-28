import { useEffect, useReducer, useState } from "react";
import { CSS_CONSTANTS } from "../constants/cssClassConstants";
import TextSwitcher, { ITextSwitcherProps } from "./TextSwitcher";

interface ITextSwitcherState {
  id: number,
  text: string,
  switched: boolean,
  hovered: boolean,
  timer: number
}

const textSwitcherInitialStates: ITextSwitcherState[] = [
  {
    id: 0,
    text: "Hi",
    switched: false,
    hovered: false,
    timer: 0
  },
  {
    id: 1,
    text: "I",
    switched: false,
    hovered: false,
    timer: 0
  },
  {
    id: 2,
    text: "am",
    switched: false,
    hovered: false,
    timer: 0
  },
  {
    id: 3,
    text: "Aid",
    switched: false,
    hovered: false,
    timer: 0
  },
  {
    id: 4,
    text: "I",
    switched: false,
    hovered: false,
    timer: 0
  },
  {
    id: 5,
    text: "am",
    switched: false,
    hovered: false,
    timer: 0
  },
  {
    id: 6,
    text: "a",
    switched: false,
    hovered: false,
    timer: 0
  },
  {
    id: 7,
    text: "software developer",
    switched: false,
    hovered: false,
    timer: 0
  },
];

const reducer = (state: ITextSwitcherState[], action: { type: string; id: number; }) => {
  switch (action.type) {
    case "HOVER_ON":
      return state.map((textSwitcher) => {
        if (textSwitcher.id === action.id) {
          return { ...textSwitcher, hovered: true};
        } else {
          return textSwitcher;
        }
      });
    case "HOVER_OFF":
      return state.map((textSwitcher) => {
        if (textSwitcher.id === action.id) {
          return { ...textSwitcher, hovered: false};
        } else {
          return textSwitcher;
        }
      });
    case "SWITCH_ON":
      return state.map((textSwitcher) => {
        if (textSwitcher.id === action.id) {
          return { ...textSwitcher, switched: true, timer: 5 };
        } else {
          return textSwitcher;
        }
      });
    case "TICK_TIMER":
      return state.map((textSwitcher) => {
        if (textSwitcher.id === action.id) {
          if (textSwitcher.hovered) return { ...textSwitcher, switched: true, timer: 5 };
          if (textSwitcher.timer <= 0) return { ...textSwitcher, switched: false, timer: 0 };
          return { ...textSwitcher, timer: textSwitcher.timer-- };
        } else {
          return textSwitcher;
        }
      });
    default:
      return state;
  }
};

function LargeGreetingText() {
  const [textSwitcherStates, dispatch] = useReducer(reducer, textSwitcherInitialStates);

  const handleTextSwitcherOnMouseOver = (id: number) => {
    dispatch({ type: "HOVER_ON", id: id});
    dispatch({ type: "SWITCH_ON", id: id});
  }

  const handleTextSwitcherOnMouseLeave = (id: number) => {  
    dispatch({ type: "HOVER_OFF", id: id});  
    setInterval(() => {
      dispatch({type: "TICK_TIMER", id: id});
    }, 1000);
  }

  useEffect(() => {
    console.log(textSwitcherStates + "from useeffect");
  }, [textSwitcherStates])
  

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