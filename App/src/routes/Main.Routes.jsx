import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Suspense, lazy, Component } from 'react'
import { hot } from 'react-hot-loader/root'

const Home = lazy(() => import('../pages/Home'))

class MainRoutes extends Component {
  render () {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

export default module.hot ? hot(MainRoutes) : MainRoutes
