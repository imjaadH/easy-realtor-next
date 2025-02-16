'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Scrollbar, A11y, Grid } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'

import Image from 'next/image'
type Props = {
  images: { path: string }[]
}
const ImageSwiper = ({ images }: Props) => {
  return (
    <Swiper
      slidesPerView={1}
      modules={[Pagination, Scrollbar, A11y, Grid]}
      pagination={{ clickable: true }}
      grid={{ rows: 1, fill: 'row' }}
      scrollbar={{ draggable: true }}
      className='w-full rounded-md'
    >
      {images.map((item, index) => (
        <SwiperSlide key={index}>
          <Image
            fill
            alt='media-image'
            src={`/api/media?key=${encodeURIComponent(item.path)}`}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSwiper
