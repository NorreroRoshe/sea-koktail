'use client'
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "simplebar"; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import "simplebar/dist/simplebar.css";
import cls from "./Header.module.scss";


import { useRouter } from "next/navigation";
import { useStore } from "@/hooks/useStore";
import Cookies from 'js-cookie';

interface ISearchWindowProps {
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchWindow: React.FC<ISearchWindowProps> = ({ searchOpen, setSearchOpen }) => {

  const store = useStore();
  const productStore = store.product

  const product = productStore.searchProduct;
  const search = productStore.filters.SearchQuery;

  // const { push, pathname } = useRouter();

  const [SearchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== undefined) {
      setSearchQuery(Cookies.get("handleSearch") || "");
    }
  }, [search]);

  const handleSearch = () => {
    productStore.getSearchProducts({
      SearchQuery,
    })
      .then(() => {
        setSearchOpen(false);
      });
    if (typeof window !== 'undefined') {
      localStorage.setItem("product", JSON.stringify(product));
      localStorage.setItem("SearchQuery", SearchQuery);
    }
  };

  return (
    <div
      className={`${cls.search__form_window} ${searchOpen ? cls.search__form_window_open : ""
        }`}>
      {SearchQuery ? (
        product?.map((product) => (
          <Link
            key={product.id}
            href={`/Product/${product.id}`}
            className={cls.search__form_product}>
            <img
              src={product.urls[0]}
              alt=""
              className={cls.form_product_img}
            />
            <div className={cls.form_product_desc}>
              <div className={cls.form_product_article}>
                <span className={cls.product_article_class}>
                  {product.name}
                </span>
                &nbsp;
                <span className={cls.product_article_title}>
                  {product.article}
                </span>
              </div>
              <span className={cls.form_product_price}>
                {product.price} руб.
              </span>
            </div>
          </Link>
        ))
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "10px",
            lineHeight: "32px",
            fontSize: "22px",
            color: "#5d5d5d",
          }}>
          Ваш запрос пока пуст!
          <br />
          ВВедите запрос !)
        </div>
      )}
      <Link onClick={handleSearch} href="/SearchPage" className={cls.form_window_btn}>
        Все результаты
      </Link>
    </div>
  );
};

export default SearchWindow;
