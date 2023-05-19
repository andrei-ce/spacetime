import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
// import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()

    return users
  })
}
