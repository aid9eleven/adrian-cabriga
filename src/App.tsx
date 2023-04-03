import './App.css'
import GreetingScreen from './screens/GreetingScreen'
import { THEME_CONSTANTS } from './styles/cssClassConstants'
import "./styles/styles.css"

const App = () => {

  return (
    <div className="app">
      <div className="wrapper">
        <GreetingScreen theme={THEME_CONSTANTS.BLUE}/>
      </div>
    </div>
  )
}

export default App
