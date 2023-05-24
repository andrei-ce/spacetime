import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (req, res) => {
    const data = await req.file({
      limits: {
        fileSize: 5_242_880, // 5mb
      },
    })

    if (!data) {
      return res.status(400).send()
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(data.mimetype)

    if (!isValidFileFormat) {
      return res.status(400).send()
    }

    console.log(data.filename)

    const fileId = randomUUID()
    const extension = extname(data.filename)
    const fileName = fileId.concat(extension)

    // Todo: use a cloud service instead of saving this on disk
    const writeStream = createWriteStream(
      resolve(__dirname, '..', '..', 'uploads', fileName),
    )

    // see https://github.com/fastify/fastify-multipart for more about pipeline pumper
    await pump(data.file, writeStream)

    // hostname is localhost or domain
    const fullUrl = req.protocol.concat('://').concat(req.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString()

    return { fileUrl }
  })
}
