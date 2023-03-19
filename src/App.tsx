import './App.css'
import { MailIcon } from './googleIcons/googleIcons'

function App() {

  return (
    <div className="app light-primary-color">
      <div className="header">
        <h2 className="home">
          Aid
        </h2>
        <div className="header-navigation">
          <h4>About me</h4>
          <h4>Experience</h4>
          <h4>Contacts</h4>
        </div>
        <h3 className="">

        </h3>
      </div>
      <div className="greeting-card">
        <h1>
          Hi, I'm Aid. <br/>
          A software developer and designer <br/>
          from the Philippines. Nice to meet you. <br/>
        </h1>
        <a href="mailto:aid9eleven@gmail.com">
          <MailIcon/>
          <span>&emsp;Send me an  email</span>
        </a>
      </div>
    </div>
  )
}

export default App
