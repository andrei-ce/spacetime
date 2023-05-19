import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'
import { usersRoutes } from './routes/users'

const app = fastify({ logger: false })

app.get('/ping', async (req, res) => {
  return { pong: 'it worked!' }
})
app.register(cors, {
  origin: true, // all FE urls can access the BE
  // origin:['http://localhost:3000', 'http://mydomain...']
})
app.register(memoriesRoutes, usersRoutes)

const start = async () => {
  try {
    await app.listen({ port: 3333 })
    console.log('HTTP server up and running on http://localhost:3333/ 🚀')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
