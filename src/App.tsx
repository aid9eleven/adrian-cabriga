import './App.css'
import IntroductionSection from './sections/IntroductionSection'

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
      <IntroductionSection/>
    </div>
  )
}

export default App
