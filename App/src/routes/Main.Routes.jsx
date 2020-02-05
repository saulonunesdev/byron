import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Suspense, lazy, Component } from 'react'
import { hot } from 'react-hot-loader/root'

const Home = lazy(() => import('../pages/Home'))
const Searches = lazy(() => import('../pages/Searches'))

class MainRoutes extends Component {
  render () {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/searches' component={Searches} />
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

export default module.hot ? hot(MainRoutes) : MainRoutes
