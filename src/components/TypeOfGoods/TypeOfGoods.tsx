import React from 'react';
import Link from 'next/link';
import cls from './TypeOfGoods.module.scss';
import { useStore } from '@/hooks/useStore';

export const TypeOfGoods: React.FC = () => {

  // const store = useStore();
  // const collectionStore = store.collection;
  
  // collectionStore.getCollections({Count: 100})

  return (
    <section className={cls.section_product}>
      <div className={cls.mb50}></div>
      {/* {collectionStore.isLoading && <div>Идет загрузка</div>} */}
      <div className={`${cls.container} ${cls.product__container}`}>
        {/* <h2 className={cls.product_heading}>{title}</h2> */}
        <div className={cls.product__categories}>
          {/* {collectionStore?.collections.map((collection) => (
            <Link
              href={`/Collections/${collection.id}`}
              key={collection.id}
              className={cls.product__categories_item}>
              <span className={cls.product__categories_link}>
                <img
                  src={collection.preview ?? 'default_image_url'}
                  className={cls.product__categories_img}
                />
                <p className={cls.product__categories_description}>{collection.name}</p>
              </span>
            </Link>
          ))} */}
        </div>
      </div>
    </section>
  );
};
