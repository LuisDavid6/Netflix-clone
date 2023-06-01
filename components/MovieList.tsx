import React from 'react'
import { isEmpty } from 'lodash'
import { MovieInterface } from '../types/index'
import MovieCard from './MovieCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

interface Props {
  data: MovieInterface[]
  title: string
}

const MovieList: React.FC<Props> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null
  }

  return (
    <div className='px-4 md:px-12 mt-4 space-y-8'>
      <div>
        <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>{title}</p>
        <div className=''>
          <Swiper
            slidesPerView={7}
            spaceBetween={10}
            navigation={true}
            style={{ color: 'white' }}
            // breakpoints={{
            //   300: {
            //     slidesPerView: 3,
            //     spaceBetween: 5,
            //   },
            //   540: {
            //     slidesPerView: 4,
            //     spaceBetween: 10,
            //   },
            //   670: {
            //     slidesPerView: 5,
            //     spaceBetween: 10,
            //   },
            //   800: {
            //     slidesPerView: 6,
            //     spaceBetween: 10,
            //   },
            //   940: {
            //     slidesPerView: 7,
            //     spaceBetween: 10,
            //   },
            //   1024: {
            //     slidesPerView: 8,
            //     spaceBetween: 10,
            //   },
            // }}
            // pagination={{
            //   clickable: true,
            // }}

            modules={[Navigation]}
            className='mySwiper'
          >
            {data.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard key={movie.id} data={movie} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default MovieList
