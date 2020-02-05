import { Router } from './router'
import * as restify from 'restify'

class ServerRouter extends Router {
  applyRoutes(monitor: restify.Server) {
    monitor.get('/info', (req, res, next) => {
      res.header('content-type', 'json')
      res.send({
        hello: 'world',
        origin: req.userAgent(),
        method: req.method,
        params: req.params,
        url: req.href(),
        path: req.path(),
        query: req.query
      })
      return next()
    })
  }
}

export const serverRouter = new ServerRouter()
