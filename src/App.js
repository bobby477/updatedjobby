import './App.css'

import {Route, Switch} from 'react-router-dom'

import LoginPage from './components/LoginPage'

import Home from './components/Home'

import Authenticator from './components/Authenticator'

import Jobs from './components/Jobs'

import SelectedJob from './components/SelectedJob'

import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <Authenticator exact path="/" component={Home} />
    <Authenticator exact path="/jobs" component={Jobs} />
    <Authenticator exact path="/jobs/:id" component={SelectedJob} />
    <Route component={NotFound} />
  </Switch>
)

export default App
