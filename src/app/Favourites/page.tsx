"use client"

import Breadcrumb from '@/components/ui/breadcrumb';
import React, { useEffect } from 'react';
import cls from './Favourites.module.scss';
import { useFavorite } from '../../hooks/useFavorite';
import Link from 'next/link';
import FavEmpty from './empty-fav';
import FavAddCart from './FavAddCart';
import PP from '@/assets/placeholders/product-placeholder.png';
import Image from '@/components/ui/image';
import { useStore } from '@/hooks/useStore';
import {observer} from "mobx-react";

const Favourites: React.FC = observer(() => {

  const store = useStore();
  const favoritesStore = store.favorites;
  const productStore = store.product;
  const authStore = store.auth;

  const favorites = favoritesStore.favoriteItems;
  const ids = favoritesStore.ids;
  const { deleteFromFavorite } = useFavorite();

  useEffect(() => {
    ids &&
      ids.map(
        (id) =>
          !favorites.map((item) => item?.id).includes(id) &&
            productStore.getDetProduct({ ProductId: id }).then((pld) => {
            //TODO fix
            //@ts-ignore
            favoritesStore.getFavorite(pld.data);
          }),
      );
    console.log(ids)
  }, [ids]);

  if (!authStore.isAuth || ids.length === 0) {
    return <FavEmpty />;
  }

  return (
    <section className={cls.favourites}>
      <div className={`${cls.favourites_container} ${cls.container}`}>
        <Breadcrumb />
        <div className={cls.favourites_header}>
          <h1 className={cls.header_title}>Избранное</h1>
        </div>
        <div className={cls.favourites_comparison}>
          <div className={cls.favourites_product}>
            <div className={cls.product_list}>
              <div className={cls.product_item}>
                <ul
                  className={cls.item_f}
                  style={{
                    transform: 'translate3d(0px, 0px, 0px)',
                    transition: 'transform 0s cubic-bezier(0.1, 0, 0.25, 1) 0s',
                  }}>
                  {favorites.map((favorite) => (
                    <li key={favorite?.id} className={cls.item_unit}>
                      <div className={cls.item_unit_wrapp}>
                        <span
                          onClick={() => deleteFromFavorite(favorite?.id)}
                          className={cls.unit_wrapp_close}></span>

                        <Link href={`/Product/${favorite?.id}`}>
                          {!!favorite?.files[0] ? (
                            <img src={favorite?.files[0]?.url} alt={favorite?.files[0]?.name} className={cls.photo_wrapp_img} />
                          ) : (
                            <div className="w-auto flex items-center justify-center">
                              {/* <img src={PP} alt='404!'/> */}
                              <Image src={PP} alt={'404!'} className={cls.allproduct_goods_img} />
                            </div>
                          )}
                        </Link>
                        <div className={cls.item_unit_title}>
                          {favorite?.name} {favorite?.article}
                        </div>
                        {favorite?.discount ? (
                          <div className={cls.item_unit_prices}>
                            <div className={cls.item_unit_prices_box}>
                              <span className={cls.prices_price}>
                                {favorite?.price - (favorite?.price * favorite?.discount) / 100} руб.
                              </span>
                              <span className={cls.prices_discount}>
                                {favorite?.price} руб.
                              </span>
                            </div>
                            <div className={cls.prices_procent}>
                              <div className={cls.procent_number}>-{favorite?.discount}%</div>
                            </div>
                          </div>
                        ) : (
                          <span className={cls.prices_discount}>
                            {favorite?.price} руб.
                          </span>
                        )}
                        <FavAddCart product={favorite} />
                        <div className={cls.item_unit_data}>
                            {!!favorite.diameter && (
                              <div className={cls.unit_data_item}>
                                <span>Диаметр:</span>
                                {favorite?.diameter}
                              </div>
                            )}
                            {!!favorite.height && (
                              <div className={cls.unit_data_item}>
                                <span>Высота:</span>
                                {favorite?.height}
                              </div>
                            )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Favourites;
