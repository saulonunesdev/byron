import * as restify from 'restify'

export abstract class Router {
  abstract applyRoutes(monitor: restify.Server)

  render(response: restify.Response, next: restify.Next) {
    return document => {
      if (document) {
        response.json(document)
      } else {
        response.send(404)
      }
      return next()
    }
  }
}
