'use client'
import React, { useEffect, useState } from "react";
import { ROUTES } from '@/utils/routes';
import { searchProductPlaceholder } from '@/assets/placeholders';
import cls from './Common.module.scss';
import Link from 'next/link';
import SearchResultLoader from '@/components/ui/loaders/search-result-loader';
import { useStore } from "@/hooks/useStore";
import {observer} from "mobx-react";

type SearchProductProps = {
  handleSearch?: () => void;
};

const SearchProduct: React.FC<SearchProductProps> = observer ( ({handleSearch}) => {

  
  const store = useStore();
  const productStore = store.product;
  
  const product = productStore.searchProduct;

  return (
    productStore.isLoading ?
      (
        // <div className={`w-full ${cls.product_serch_present}`}>
        <div style={{ display: "flex", flexDirection: "row", width: '580px', height: '205px', marginBottom: '20px' }}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={`search-result-loader-key-${idx}`}
              className="py-2.5 ps-5 pe-10 scroll-snap-align-start"
            >
              <SearchResultLoader key={idx} uniqueKey={`top-search-${idx}`} />
            </div>
          ))}
        </div>
        // </div>
      ) : (
        <div>
          <div className={cls.searchproduct_wrapper_flex}>
            {product?.map((product) => (
              <Link
                href={`${ROUTES.PRODUCT}/${product.id}`}
                key={`ключ-результата-поиска-${product.id}`}
                className={`group w-full h-auto flex justify-start items-center ${cls.searchproduct_wrapp}`}
              >
                <div className={`relative flex w-12 h-12 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4 ${cls.searchproduct_img}`}>
                  <img
                    src={product.urls[0]}
                    width={48}
                    height={48}
                    loading="eager"
                    alt={product.name || 'Product Image'}
                    className="bg-skin-thumbnail object-cover"
                  />
                </div>
                <div className={cls.priduct_tile}>
                  <div className={cls.priduct_tile_ho}>{product.name}</div>
                  <div className={cls.priduct_tile_ho}>{product.article}</div>
                  <span className={`${cls.priduct_tile_pr_tw} ${cls.priduct_tile_pr}`} data-testid="price">
                    {product.price}
                    <span className={cls.priduct_tile_pr_znak}>₽</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className={cls.parent_wind_container}>
            <button onClick={handleSearch} className={cls.form_window_btn}>
              Все результаты поиска
            </button>
          </div>
        </div>
      ))
});

export default SearchProduct;