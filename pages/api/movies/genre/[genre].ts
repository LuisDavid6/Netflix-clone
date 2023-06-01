import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '@/libs/prismadb'
import serverAuth from '@/libs/serverAuth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end()
    }

    await serverAuth(req, res)

    const { genre } = req.query

    if (typeof genre !== 'string') {
      throw new Error('Invalid genre')
    }

    if (!genre) {
      throw new Error('Missing genre')
    }

    const movies = await prismadb.movie.findMany({
      where: {
        genre,
      },
    })

    return res.status(200).json(movies)
  } catch (error) {
    console.log({ error })
    return res.status(500).end()
  }
}
