import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  // fastify.io/docs/latest/Reference/Lifecycle/ explains the http req lifecycle
  // handlers are the functions defined in routes defined below
  // so we want to add logic before every handler func. Sort of a Middleware for this file only
  app.addHook('preHandler', async (req, res) => {
    await req.jwtVerify()
  })

  app.get('/memories', async (req, res) => {
    const memories = await prisma.memory.findMany({
      where: { userId: req.user.sub },
      orderBy: { createdAt: 'asc' },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        exerpt: memory.content.substring(0, 115).concat('...'),
        createdAt: memory.createdAt,
      }
    })
  })

  app.get('/memories/:memoryId', async (req, res) => {
    // define memoryId format && validate if memoryId is a valid uuid string
    const paramsSchema = z.object({ memoryId: z.string().uuid() })
    const { memoryId } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id: memoryId },
    })

    if (!memory.isPublic && memory.userId !== req.user.sub) {
      return res.status(401).send({
        message:
          "We still do not have the technology to provide access to somebody else's memory",
      })
    }
    return memory
  })

  app.post('/memories', async (req, res) => {
    // define & validate memory req.body
    const bodySchema = z.object({
      content: z.string(),
      // coerce will convert whatever comes here to boolean --> Boolean(val)
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })
    const { content, isPublic, coverUrl } = bodySchema.parse(req.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        isPublic,
        coverUrl,
        userId: req.user.sub,
      },
    })
    return memory
  })

  app.put('/memories/:memoryId', async (req, res) => {
    // define & validate memory req.params
    const paramsSchema = z.object({ memoryId: z.string().uuid() })
    const { memoryId } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      content: z.string(),
      // coerce will convert whatever comes here to boolean --> Boolean(val)
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })
    const { content, isPublic, coverUrl } = bodySchema.parse(req.body)

    const memoryFound = await prisma.memory.findUniqueOrThrow({
      where: { id: memoryId },
    })
    if (memoryFound.userId !== req.user.sub) {
      return res.status(401).send({
        message:
          "We still do not have the technology to let you edit somebody else's memory",
      })
    }

    const memoryEdited = await prisma.memory.update({
      where: { id: memoryId },
      data: {
        content,
        isPublic,
        coverUrl,
      },
    })
    return memoryEdited
  })

  app.delete('/memories/:memoryId', async (req, res) => {
    // define & validate memory req.params
    const paramsSchema = z.object({ memoryId: z.string().uuid() })
    const { memoryId } = paramsSchema.parse(req.params)

    const memoryFound = await prisma.memory.findUniqueOrThrow({
      where: { id: memoryId },
    })
    if (memoryFound.userId !== req.user.sub) {
      return res.status(401).send({
        message:
          "We still do not have the technology to let you edit somebody else's memory",
      })
    }

    const memoryDeleted = await prisma.memory.delete({
      where: { id: memoryId },
    })
    return memoryDeleted
  })
}
