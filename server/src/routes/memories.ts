import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async (req, res) => {
    const memories = await prisma.memory.findMany({
      orderBy: { createdAt: 'asc' },
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        exerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  app.get('/memories/:memoryId', async (req, res) => {
    // define memoryId format
    const paramsSchema = z.object({ memoryId: z.string().uuid() })
    // validate if memoryId is a valid uuid string
    const { memoryId } = paramsSchema.parse(req.params)

    const memory = await prisma.memory.findUniqueOrThrow({
      where: { id: memoryId },
    })
    return memory
  })

  app.post('/memories', async (req, res) => {
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
        userId: '81666a73-c530-4cf4-86f6-6a30eafcc29b',
      },
    })
    return memory
  })

  app.put('/memories/:memoryId', async (req, res) => {
    const paramsSchema = z.object({ memoryId: z.string().uuid() })
    const { memoryId } = paramsSchema.parse(req.params)

    const bodySchema = z.object({
      content: z.string(),
      // coerce will convert whatever comes here to boolean --> Boolean(val)
      isPublic: z.coerce.boolean().default(false),
      coverUrl: z.string(),
    })
    const { content, isPublic, coverUrl } = bodySchema.parse(req.body)

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
    const paramsSchema = z.object({ memoryId: z.string().uuid() })
    const { memoryId } = paramsSchema.parse(req.params)

    const memoryDeleted = await prisma.memory.delete({
      where: { id: memoryId },
    })
    return memoryDeleted
  })
}
