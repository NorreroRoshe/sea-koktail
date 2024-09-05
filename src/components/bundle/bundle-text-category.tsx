"use client"
import useWindowSize from '@/utils/use-window-size';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { SwiperSlide } from '@/components/ui/carousel/slider';
import SectionHeader from '../common/section-header';
import {BlyudaCategoriesKonkret} from '../GoodsCatalogue/BlyudaCategoriesKonkret';
const Carousel = dynamic(() => import('@/components/ui/carousel/carousel'), {
  ssr: false,
});

interface Props {
  className?: string;
  data: any;
  ProductTypesArray: number[];
  CategoriesArray: number[];
}

const breakpoints = {
  '1002': {
    slidesPerView: 4,
    spaceBetween: 16,
  },
  '840': {
    slidesPerView: 4,
    spaceBetween: 25,
  },
  '0': {
    slidesPerView: 3,
    spaceBetween: 12,
  },
};

const BundleTextCategory: React.FC<Props> = ({ className = '', ProductTypesArray, CategoriesArray, data }) => {
  const { width } = useWindowSize();
  return (
    <div className={cn('heightFull', className)}>
      {/* {width! < 1536 ? ( */}
      {width! < 2000 ? (
        <>
          <Carousel breakpoints={breakpoints}>
            {data.subcategories?.map((item: any) => (
              <SwiperSlide key={`bundle-key-${item.id}`}>
                <BlyudaCategoriesKonkret ProductTypesArray={ProductTypesArray} CategoriesArray={CategoriesArray} subcategory={item} />
              </SwiperSlide>
            ))}
          </Carousel>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.subcategories?.map((item: any, id: any) => (
            <BlyudaCategoriesKonkret key={id} ProductTypesArray={ProductTypesArray} CategoriesArray={CategoriesArray} subcategory={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BundleTextCategory;
