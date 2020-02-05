import { Router } from './router'
import * as restify from 'restify'
import { SavedSearch } from '../classes/saved-search.class'

class SearchesRouter extends Router {
  applyRoutes(monitor: restify.Server) {
    monitor.get('/searches', (req, resp, next) => {
      SavedSearch.find()
        .then(this.render(resp, next))
        .catch(next)
    })

    monitor.get('/searches/:id', (req, resp, next) => {
      SavedSearch.findById(req.params.id)
        .then(this.render(resp, next))
        .catch(next)
    })

    monitor.post('/searches', (req, resp, next) => {
      let user = new SavedSearch(req.body)
      user
        .save()
        .then(this.render(resp, next))
        .catch(next)
    })

    monitor.put('/searches/:id', (req, resp, next) => {
      let options = {
        new: true,
        overwrite: true
      }
      SavedSearch.findByIdAndUpdate(req.params.id, req.body, options)
        .then(this.render(resp, next))
        .catch(next)
    })

    monitor.del('/searches/:id', (req, resp, next) => {
      SavedSearch.findByIdAndDelete(req.params.id)
        .then(user => {
          if (user) {
            resp.send(204)
          } else {
            resp.send(404)
          }
          return next()
        })
        .catch(next)
    })
  }
}

export const searchesRouter = new SearchesRouter()
