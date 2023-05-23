import fastify from 'fastify'
import cors from '@fastify/cors'
import 'dotenv/config'

import { memoriesRoutes } from './routes/memories'
import { usersRoutes } from './routes/users'
import { authRoutes } from './routes/auth'
import jwt from '@fastify/jwt'

const app = fastify({ logger: false })

app.get('/ping', async (req, res) => {
  return { pong: 'it worked!' }
})
app.register(cors, {
  origin: true, // all FE urls can access the BE
  // origin:['http://localhost:3000', 'http://mydomain...']
})
app.register(jwt, { secret: 'placeholder' })

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(usersRoutes)

const start = async () => {
  try {
    await app.listen({ port: 3333, host: '0.0.0.0' })
    console.log(`🚀 HTTP server live on: http://localhost:3333`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
