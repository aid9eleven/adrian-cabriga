import './App.css'
import GreetingScreen from './screens/GreetingScreen'
import { THEMES } from './styles/cssClassConstants'
import "./styles/styles.css"

const App = () => {

  return (
    <div className="app">
      <div className="wrapper">
        <GreetingScreen theme={THEMES.BLUE}/>
      </div>
    </div>
  )
}

export default App
