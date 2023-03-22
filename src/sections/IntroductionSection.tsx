import { useEffect, useState } from 'react'
import TextSwitcher, { TEXT_SWITCH_DIRECTION } from '../components/TextSwitcher';
import { CSS_CONSTANTS } from '../constants/cssClassConstants';
import { MailIcon, SendIcon } from '../googleIcons/GoogleIcons'

function IntroductionSection() {
  const AID_DIV = 0;
  const DEVELOPER_DIV = 1;
  const DESIGNER_DIV = 2;

  const initTextSwitcherDirections = {
    aid: TEXT_SWITCH_DIRECTION.UP,
    developer: TEXT_SWITCH_DIRECTION.UP,
    designer: TEXT_SWITCH_DIRECTION.UP,
  }

  const [didHoverOnGreetingText, setDidHoverOnGreetingText] = useState<boolean>(false);
  const [activatedTextSwitcher, setActivatedTextSwitcher] = useState(AID_DIV);
  const [textSwitcherDirections, setTextSwitcherDirections] = useState(initTextSwitcherDirections)

  const handleDirectionRandomizer = () => {
    return Math.floor(4 * Math.random());
  }

  const handleDidHoverOnGreetingText = () => {
    setDidHoverOnGreetingText(true);
  }

  const handleSetActivatedTextSwitcher = (div: number) => {
    setActivatedTextSwitcher(div);
  }

  useEffect(() => {
    setTextSwitcherDirections({
      aid: handleDirectionRandomizer(),
      developer: handleDirectionRandomizer(),
      designer: handleDirectionRandomizer()
    })
  }, [])
  

  return (
    <div className="introduction-section">
      <div className="greeting-card">
        <span className="greeting-text">
          Hi, I'm&nbsp;
          <TextSwitcher 
            direction={textSwitcherDirections.aid}
            onClick={() => handleSetActivatedTextSwitcher(AID_DIV)}
            isSwitched={activatedTextSwitcher === AID_DIV ? true : false}
            style={{cursor: "pointer"}}
          >Aid</TextSwitcher>
          .<br/>

          A software&nbsp;
          <TextSwitcher 
            direction={textSwitcherDirections.developer}
            onClick={() => handleSetActivatedTextSwitcher(DEVELOPER_DIV)}
            isSwitched={activatedTextSwitcher === DEVELOPER_DIV ? true : false}
            style={{cursor: "pointer"}}
          >
            developer
          </TextSwitcher>
          &nbsp;and&nbsp;
          <TextSwitcher 
            direction={textSwitcherDirections.designer}
            onClick={() => handleSetActivatedTextSwitcher(DESIGNER_DIV)}
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
          </span> <br/>
        </span>
        <a href="mailto:aid9eleven@gmail.com">
          <div className="send-email-button-wrapper">
            <MailIcon/>
            <span className="send-email-button-text">Send me an email</span>
            <SendIcon/>
          </div>
        </a>
      </div>
    </div>
  )
}

export default IntroductionSection