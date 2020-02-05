import * as restify from 'restify'
import * as corsMiddleware from 'restify-cors-middleware'
import * as mongoose from 'mongoose'
import { Router } from '../routes/router'
require('dotenv').config()

export class Server {
  monitor: restify.Server

  initializeDB() {
    ;(<any>mongoose).Promise = global.Promise
    return mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  initRoutes(routes: Router[]): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.monitor = restify.createServer({
          name: 'mongo-monitor-api',
          version: '1.0.0'
        })

        const cors = corsMiddleware({
          preflightMaxAge: 5,
          origins: ['*'],
          allowHeaders: ['*'],
          exposeHeaders: ['*']
        })

        this.monitor.use(restify.plugins.queryParser())
        this.monitor.use(restify.plugins.bodyParser())

        this.monitor.pre(cors.preflight)
        this.monitor.use(cors.actual)
        this.monitor.use(restify.plugins.bodyParser())

        routes.forEach(element => {
          element.applyRoutes(this.monitor)
        })

        this.monitor.listen(process.env.SERVER_PORT, () => {
          resolve('API is running on ' + ':' + process.env.SERVER_PORT + '/')
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  start(routes: Router[] = []): Promise<Server> {
    return this.initializeDB().then(() =>
      this.initRoutes(routes).then(() => this)
    )
  }
}
