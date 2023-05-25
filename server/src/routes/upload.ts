import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)
const FILE_SIZE_LIMIT_IN_MB = 5 // export to .env variable

export async function uploadRoutes(app: FastifyInstance) {
  // Enforce fileSize limit
  app.addHook('onRequest', async (req, res) => {
    const isMultiform = req.headers['content-type']?.startsWith(
      'multipart/form-data',
    )
    const fileSizeInBytes = Number(req.headers['content-length'])

    if (FILE_SIZE_LIMIT_IN_MB === undefined) {
      res
        .code(500)
        .send({ error: 'Server config error: no file size limit set' })
    } else if (!isMultiform) {
      res
        .code(422)
        .send({ error: 'Server error: Form sent in incorrect format' })
    } else if (fileSizeInBytes) {
      const contentLength = fileSizeInBytes
      const fileSizeLimit = FILE_SIZE_LIMIT_IN_MB * 1024 * 1024
      if (contentLength > fileSizeLimit) {
        res.code(413).send({
          error:
            'Server error: File size exceeds the allowed limit or invalid content type',
        })
      }
    }
  })

  app.post('/upload', async (req, res) => {
    const data = await req.file()

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
    const baseUrl = req.protocol.concat('://').concat(req.hostname)
    const fileUrl = new URL(`/uploads/${fileName}`, baseUrl).toString()

    return { fileUrl }
  })
}
