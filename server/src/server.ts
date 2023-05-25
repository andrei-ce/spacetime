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
import process from 'node:process'

const app = fastify({ logger: true })
const FILE_SIZE_LIMIT_IN_MB = 5 // export to .env variable

app.get('/ping', async (req, res) => {
  return { pong: 'it worked!' }
})

app.register(multipart, {
  limits: {
    fileSize: FILE_SIZE_LIMIT_IN_MB * 1024 * 1024, // this will only truncate the file upon reaching the limit
  },
})

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
  const PORT = 3333 // export to .env variable
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`🚀 HTTP server live on: http://localhost:${PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
start()
