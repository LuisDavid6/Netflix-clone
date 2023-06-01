import Billboard from '@/components/BillBoard'
import InfoModal from '@/components/InfoModal'
import MovieList from '@/components/MovieList'
import Navbar from '@/components/Navbar'
import useFavorites from '@/hooks/useFavorites'
import useInfoModalStore from '@/hooks/useInfoModalStore'
import useMovieList from '@/hooks/useMovieList'
import useMoviesGenre from '@/hooks/useMoviesGenre'
import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList()
  const { data: favorites = [] } = useFavorites()
  const { isOpen, closeModal } = useInfoModalStore()
  const { data: action = [] } = useMoviesGenre('action')
  const { data: adventure = [] } = useMoviesGenre('adventure')
  const { data: animation = [] } = useMoviesGenre('animation')
  const { data: sci_fi = [] } = useMoviesGenre('science fiction')

  return (
    <main className='pb-12'>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <MovieList title='Trending Now' data={movies.slice(0, 9)} />
      <MovieList title='My List' data={favorites} />
      <MovieList title='Top Rated' data={movies.slice(10, 17)} />
      <MovieList title='Action' data={action.slice(0, 7)} />
      <MovieList title='Animation' data={animation.slice(0, 7)} />
      <MovieList title='Sci-fi' data={sci_fi.slice(0, 7)} />
      <MovieList title='Adventure' data={adventure.slice(0, 7)} />
    </main>
  )
}
