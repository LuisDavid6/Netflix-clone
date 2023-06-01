import { NextApiRequest, NextApiResponse } from 'next'
import prismadb from '../../libs/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end()
    }

    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      backdropUrl,
      release_date,
      genre,
      duration,
    } = req.body

    const newMovie = await prismadb.movie.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        backdropUrl,
        release_date,
        genre,
        duration,
      },
    })
    return res.status(200).json(newMovie)
  } catch (error) {
    return res.status(400).json({ error: `Something went wrong: ${error}` })
  }
}
