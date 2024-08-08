'use client'
import {
  Swiper,
  SwiperSlide,
  Navigation,
  Thumbs,
} from '@/components/ui/carousel/slider';
import { SwiperOptions } from 'swiper/types';
// import Image from '@/components/ui/image';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { getDirection } from '@/utils/get-direction';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Product } from '@/types/Product/product.types';

interface Props {
  gallery?: any[];
  thumbnailClassName?: string;
  galleryClassName?: string;
  popupProduct?: Product;

}

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  '0': {
    slidesPerView: 4,
  },
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  thumbnailClassName = 'xl:w-[480px] 2xl:w-[650px]',
  galleryClassName = 'xl:w-28 2xl:w-[130px]',
  popupProduct
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  // const { locale } = useRouter();
  const dir = getDirection('ltr');
  
  return (
    <div className="w-full xl:flex xl:flex-row-reverse">
      <div
        style={{ display: 'flex', justifyContent: 'center' }}
        className={cn(
          'w-full xl:ms-5 mb-2.5 md:mb-3 overflow-hidden rounded-md relative',
          // border border-skin-base
          thumbnailClassName
        )}
      >
        <Swiper
          id="productGallery"
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          {...swiperParams}
        >
          {popupProduct?.files?.map((file, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <img
                src={file.url}
                alt={`Product Image ${index + 1}`}
                width={650}
                height={590}
                className="rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
          <div
            ref={prevRef}
            className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center cursor-pointer justify-center rounded-full bg-skin-follll transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
            style={{color: '#fff'}}
          >
            {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </div>
          <div
            ref={nextRef}
            className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl flex items-center justify-center cursor-pointer rounded-full bg-skin-follll  transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform -translate-y-1/2 shadow-navigation"
            style={{color: '#fff'}}
          >
            {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </div>
        </div>
      </div>
      {/* End of product main slider */}

      <div className={`flex-shrink-0 ${galleryClassName}`}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={0}
          watchSlidesProgress={true}
          freeMode={true}
          observer={true}
          observeParents={true}
          breakpoints={galleryCarouselBreakpoints}
        >
          {popupProduct?.files?.map((file, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center cursor-pointer rounded overflow-hidden border border-skin-base transition hover:opacity-75"
            >
              <img
                src={file.url}
                alt={`Product ${index + 1}`}
                width={170}
                height={170}
                style={{margin: '0 auto'}}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
