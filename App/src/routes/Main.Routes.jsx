import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Suspense, lazy, Component } from 'react'
import { hot } from 'react-hot-loader/root'

const App = lazy(() => import('../pages/App'))
const Git = lazy(() => import('../pages/Git'))

class MainRoutes extends Component {
  render () {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/git' component={Git} />
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

export default module.hot ? hot(MainRoutes) : MainRoutes
