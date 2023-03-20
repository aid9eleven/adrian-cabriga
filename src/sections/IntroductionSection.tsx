import React from 'react'
import { MailIcon, SendIcon } from '../googleIcons/GoogleIcons'

function IntroductionSection() {
  return (
    <div className="introduction-section">
      <div className="greeting-card">
        <span className="greeting-text">
          Hi, I'm Aid. <br/>
          A software developer and designer <br/>
          <span className="greeting-text-hovered-text">Nice to meet you.</span> <br/>
          <span className="small-greeting-text">はじめまして。</span> <br/>
        </span>
        <a href="mailto:aid9eleven@gmail.com">
          <div className="send-email-button-icon">
            <MailIcon/>
            <SendIcon/>
          </div>
          <span>&emsp;Send me an  email</span>
        </a>
      </div>
    </div>
  )
}

export default IntroductionSection