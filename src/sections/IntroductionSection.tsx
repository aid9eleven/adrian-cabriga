import { useEffect, useState } from 'react'
import TextSwitcher, { TextSwitchDirection } from '../components/TextSwitcher';
import { CSS_CONSTANTS } from '../constants/cssClassConstants';
import { GoogleIcon, GOOGLE_ICON_TYPE } from '../components/GoogleIcon'
import { randomValueFromArray } from '../util/randomizer';
import { classNameBuilder } from '../util/stringBuilder';

function IntroductionSection() {
  const NO_DIV = -1;
  const AID_DIV = 0;
  const DEVELOPER_DIV = 1;
  const DESIGNER_DIV = 2;

  const initTextSwitcherDirections = {
    aid: "up" as TextSwitchDirection,
    developer: "up" as TextSwitchDirection,
    designer: "up" as TextSwitchDirection,
  }

  const [didHoverOnGreetingText, setDidHoverOnGreetingText] = useState<boolean>(false);
  const [activatedTextSwitcher, setActivatedTextSwitcher] = useState(NO_DIV);
  const [hoveredTextSwitcher, setHoveredTextSwitcher] = useState(NO_DIV);
  const [textSwitcherDirections, setTextSwitcherDirections] = useState(initTextSwitcherDirections)

  const handleDirectionRandomizer = () => {
    return randomValueFromArray(["up", "down", "left", "right"]);
  }

  const handleDidHoverOnGreetingText = () => {
    setDidHoverOnGreetingText(true);
  }

  const handleHoveredTextSwitcher = (div: number) => {
    setHoveredTextSwitcher(div)
  }

  const handleUnsetHoveredTextSwitcher = () => {
    setHoveredTextSwitcher(NO_DIV)
  }

  const handleSetActivatedTextSwitcher = (div: number) => {
    setActivatedTextSwitcher(div);
  }

  useEffect(() => {
    setTextSwitcherDirections({
      aid: handleDirectionRandomizer(),
      developer: handleDirectionRandomizer(),
      designer: handleDirectionRandomizer()
    });

    setTimeout(() => {handleSetActivatedTextSwitcher(AID_DIV);}, 0);
  }, [])

  return (
    <div className="introduction-section">
      <div className="greeting-card">
        <span className="greeting-text">
          Hi, I'm&nbsp;
          <TextSwitcher 
            className={
              classNameBuilder([
                "greeting-text-switcher",
                (hoveredTextSwitcher === AID_DIV ? CSS_CONSTANTS.PRE_ON_STATE : "")
              ])
            }
            direction={textSwitcherDirections.aid}
            onClick={() => handleSetActivatedTextSwitcher(AID_DIV)}
            onMouseOver={() => handleHoveredTextSwitcher(AID_DIV)}
            onMouseLeave={() => handleUnsetHoveredTextSwitcher()}
            isSwitched={activatedTextSwitcher === AID_DIV ? true : false}
            style={{cursor: "pointer"}}
          >Aid</TextSwitcher>
          .<br/>

          A software&nbsp;
          <TextSwitcher 
            className={
              classNameBuilder([
                "greeting-text-switcher",
                (hoveredTextSwitcher === DEVELOPER_DIV ? CSS_CONSTANTS.PRE_ON_STATE : "")
              ])
            }
            direction={textSwitcherDirections.developer}
            onClick={() => handleSetActivatedTextSwitcher(DEVELOPER_DIV)}
            onMouseOver={() => handleHoveredTextSwitcher(DEVELOPER_DIV)}
            onMouseLeave={() => handleUnsetHoveredTextSwitcher()}
            isSwitched={activatedTextSwitcher === DEVELOPER_DIV ? true : false}
            style={{cursor: "pointer"}}
          >
          developer
          </TextSwitcher><br/>
          and&nbsp;
          <TextSwitcher 
            className={
              classNameBuilder([
                "greeting-text-switcher",
                (hoveredTextSwitcher === DESIGNER_DIV ? CSS_CONSTANTS.PRE_ON_STATE : "")
              ])
            }            
            direction={textSwitcherDirections.designer}
            onClick={() => handleSetActivatedTextSwitcher(DESIGNER_DIV)}
            onMouseOver={() => handleHoveredTextSwitcher(DESIGNER_DIV)}
            onMouseLeave={() => handleUnsetHoveredTextSwitcher()}
            isSwitched={activatedTextSwitcher === DESIGNER_DIV ? true : false}
            style={{cursor: "pointer"}}
          >
            designer
          </TextSwitcher>
          .<br/>

          <span 
            onMouseEnter={handleDidHoverOnGreetingText} 
            className={`greeting-text-hovered-text ${didHoverOnGreetingText ? CSS_CONSTANTS.ANIMATING_ELEMENT : ""}`}
          >
            Nice to meet you.
          </span><br/>
          <span 
            className={`small-greeting-text ${didHoverOnGreetingText ? CSS_CONSTANTS.ANIMATING_ELEMENT : ""}`}
          >
            はじめまして。
          </span>
        </span>
        <div className="greeting-card-bottom">
          <a href="mailto:aid9eleven@gmail.com">
            <div className="send-email-button-wrapper">
              <GoogleIcon icon={GOOGLE_ICON_TYPE.MAIL}/>
              <span className="send-email-button-text">Send me an email</span>
              <GoogleIcon icon={GOOGLE_ICON_TYPE.SEND}/>
            </div>
          </a>
          <div className="greeting-card-icons">
            <GoogleIcon 
              icon={GOOGLE_ICON_TYPE.FACE} 
              className={
                activatedTextSwitcher === AID_DIV ?
                  CSS_CONSTANTS.ON_STATE
                :
                  hoveredTextSwitcher === AID_DIV ? CSS_CONSTANTS.PRE_ON_STATE : ""
              }
              onClick={() => handleSetActivatedTextSwitcher(AID_DIV)}
              onMouseOver={() => handleHoveredTextSwitcher(AID_DIV)}
              onMouseLeave={() => handleUnsetHoveredTextSwitcher()}
            />
            <GoogleIcon 
              icon={GOOGLE_ICON_TYPE.CODE} 
              className={
                activatedTextSwitcher === DEVELOPER_DIV ?
                  CSS_CONSTANTS.ON_STATE
                :
                  hoveredTextSwitcher === DEVELOPER_DIV ? CSS_CONSTANTS.PRE_ON_STATE : ""
              }
              onClick={() => handleSetActivatedTextSwitcher(DEVELOPER_DIV)}
              onMouseOver={() => handleHoveredTextSwitcher(DEVELOPER_DIV)}
              onMouseLeave={() => handleUnsetHoveredTextSwitcher()}
            />
            <GoogleIcon 
              icon={GOOGLE_ICON_TYPE.BRUSH} 
              className={
                activatedTextSwitcher === DESIGNER_DIV ?
                  CSS_CONSTANTS.ON_STATE
                :
                  hoveredTextSwitcher === DESIGNER_DIV ? CSS_CONSTANTS.PRE_ON_STATE : ""
              }
              onClick={() => handleSetActivatedTextSwitcher(DESIGNER_DIV)}
              onMouseOver={() => handleHoveredTextSwitcher(DESIGNER_DIV)}
              onMouseLeave={() => handleUnsetHoveredTextSwitcher()}
            />
          </div>
        </div>
      </div>
      <div className="short-description-card">
        <div className="short-description-profile">
          <div className="short-description-subcategory">
            <TextSwitcher
              direction="down"
              isHoverable
              style={{
                padding: "0.5rem",
              }}
            >
              what I do
            </TextSwitcher>
          </div>
          <div className="short-description-subcategory">
            <TextSwitcher
              direction="down"
              isHoverable
              style={{
                padding: "0.5rem",
              }}
            >
              hobbies & interests
            </TextSwitcher>
          </div>
          <div className="short-description-subcategory">
            <TextSwitcher
              direction="down"
              isHoverable
              style={{
                padding: "0.5rem",
              }}
            >
              a little bit about myself
            </TextSwitcher>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntroductionSection