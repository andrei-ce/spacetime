import fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import jwt from '@fastify/jwt'
import 'dotenv/config'

import { memoriesRoutes } from './routes/memories'
import { usersRoutes } from './routes/users'
import { authRoutes } from './routes/auth'
import { uploadRoutes } from './routes/upload'
import { resolve } from 'node:path'

const app = fastify({ logger: true })

app.get('/ping', async (req, res) => {
  return { pong: 'it worked!' }
})
app.register(multipart)

// this is just to expose this /uploads folder (e.g. we can open the files on browser by clicking on the url, or we can access the file on the client side)
app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true, // all FE urls can access the BE
  // origin:['http://localhost:3000', 'http://mydomain...']
})
app.register(jwt, { secret: 'placeholder' })

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(usersRoutes)
app.register(uploadRoutes)

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
