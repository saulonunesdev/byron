import { serverRouter } from './routes/server.router'
import { searchesRouter } from './routes/searches.router'
import { Server } from './servers/server'

const server = new Server()
server
  .start([searchesRouter, serverRouter])
  .then(server => {
    console.log('Server Started at ', server.monitor.address())
  })
  .catch(error => {
    console.log('Server Failed to Start')
    console.error(error)
    process.exit(1)
  })
