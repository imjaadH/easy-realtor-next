import Image from 'next/image'

type Props = {
  images: string[]
}
export const ImageGallery = ({ images }: Props) => {
  return (
    <div>
      <div className='container mx-auto  p-2  '>
        {/* <!-- Bento Grid Container --> */}
        <div className='grid auto-rows-[192px] grid-cols-3 gap-2'>
          {images.map((_, i) => (
            <div
              key={i}
              className={`relative row-span-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden ${
                i === 3 || i === 6 ? 'col-span-2' : ''
              } `}
            >
              <Image
                src={`/api/media?key=${encodeURIComponent(_)}`}
                className='object-cover rounded-lg hover:scale-105 transition-transform duration-300 peer'
                alt='image'
                fill
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
