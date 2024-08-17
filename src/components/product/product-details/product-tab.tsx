'use client'
import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import Heading from '@/components/ui/heading';
import ProductReviewRating from './product-review-rating';
import Link from 'next/link';
import cls from '../Product.module.scss';
import logoButterfly from '../../../assets/img/logoButterfly.png';
import { useStore } from '@/hooks/useStore';
import { Product } from '@/types/Product/product.types';

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

type ProductInfoProps = {
  detProduct: Product;
};

export const chandelierTypeArray = [
  'NONE',
  'Большие люстры',
  'С хрусталями',
  'С абажурами',
  'Подвесные',
  'Потолочные',
  'Овальные',
];

const arrayColor = [
  'NONE',
  'Золотой',
  'Бронзовый',
  'Сильвер',
  'Никель',
  'Белый',
  'Черный',
  'Прозрачный',
  'Бежевый',
];

export const ProductDetailsTab: React.FC<ProductInfoProps> = ({ detProduct }) => {

  const store = useStore();
  const collectionStore = store.collection;
  
  let [tabHeading] = useState({
    'Подробнее о позиции': ''
  });

  const collections = collectionStore.collections;

  const currCollections = React.useMemo(() => collections.find((col) => col.id == detProduct.collectionId),
    [collections],
  );

  useEffect(() => {
    // TODO поиск по id коллекции
    // getCollection({ name: detProduct.collectionId });
    collectionStore.getCollection({ name: detProduct.article?.split('/')[0] });
  }, [detProduct.collectionId]);

  const attributeLabels: any = {
    calorie: 'Ккал',
    carbohydrate: 'Углеводы',
    protein: 'Белки, г',
    outQuantity: '‍Грамовка',
    fat: '‍Жиры, г',
    storageConditions: '‍‍Хранение, t'
  };
  
  const getAttributeLabel = (key: any) => attributeLabels[key] || key;

  return (
    <div className="w-full xl:px-2 py-11 lg:py-14 xl:py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="block space-s-8" style={{borderTop: '1px solid #0c69c7'}}>
        </Tab.List>
        <Tab.Panels className="mt-6 lg:mt-9">
          <Tab.Panel className={`lg:flex ${cls.tab_wrapp}`}>
            {detProduct.attribute?.some(attribute => attribute.key) && (
              <div className="flex-shrink-0 lg:w-[400px] pt-5 lg:pt-0">
                <Heading
                  variant="mediumHeading"
                  className="xl:text-lg mb-4 pt-0.5"
                >
                  Состав:
                </Heading>
                <div className="border border-skin-four rounded">
                  <table className="w-full text-skin-base text-15px">
                    <tbody>
                      
                      {detProduct?.attribute
                        ?.filter((attribute) => attribute.value)
                        .map((attribute) => (
                          <tr key={attribute.id} className="border-b font-normal border-skin-four last:border-b-0">
                            <td className="px-4 lg:px-5 xl:px-6 py-3">
                              {getAttributeLabel(attribute.key)}:
                            </td>
                            <td className="border-s border-skin-four px-4 lg:px-5 xl:px-6 py-3 text-end w-24 lg:w-28 xl:w-36">
                              {attribute.value}
                            </td>
                          </tr>
                      ))}
                      
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {detProduct?.description && (
              <div className="text-sm sm:text-15px text-skin-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7 lg:ps-10 xl:ps-14 2xl:ps-20">
                <h2>Описание: </h2>
                <p>
                  {detProduct.description}
                </p>
              </div>
            )}
          </Tab.Panel>
          <Tab.Panel>
            <ProductReviewRating />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
