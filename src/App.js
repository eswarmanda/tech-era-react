import {Switch, Route, Redirect} from 'react-router-dom'

import Home from './component/home'
import CourseDetails from './component/courseDetailsPage'
import NotFound from './component/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
