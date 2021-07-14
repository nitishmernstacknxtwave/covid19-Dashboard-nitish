import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Home from './components/Home'
import CovidStateDetails from './components/CovidStateDetails'
import About from './components/About'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
import Tabs from './components/Tabs'

// import About from './components/About'
// import NotFound from './components/NotFound'

const App = () => (
  <div className="app-body">
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/state/:id" component={CovidStateDetails} />
        <Route exact path="/about" component={About} />
        <Route exact path="/tabs" component={Tabs} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </div>
)

export default App
