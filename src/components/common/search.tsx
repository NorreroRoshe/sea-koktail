'use client'
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useSearchQuery } from '@/framework/basic-rest/product/use-search';
import SearchBoxModal from '@/components/common/search-box-modal';
import SearchProduct from '@/components/common/search-product';
import SearchProductHits from '@/components/common/search-product-hits';
import useFreezeBodyScroll from '@/utils/use-freeze-body-scroll';
import { useUI } from '@/contexts/ui.context';
import cls from './Common.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useStore } from '@/hooks/useStore';
import { observer } from "mobx-react";
type Props = {
  className?: string;
  searchId?: string;
  variant?: 'border' | 'fill';
};

const data = [
  {
    "id": "search1",
    "name": "Ролл запеченный с угрём ",
    "slug": "268",
    "description": "Vegetables are parts of plants that are consumed by humans or other animals as food. the first meaning remains commonly used and is applied to plants collectively to ask all edible plant matter, including the flowers, fruits, stems, leaves, roots, and seeds. An alternate definition of the term is applied somewhat arbitrarily, often by culinary and cultural tradition. it's going to exclude foods derived from some plants that are fruits, flowers, nuts, and cereal grains, but include savoury fruits like tomatoes and courgettes, flowers like broccoli, and seeds like pulses.",
    "image": {
      "id": 1,
      "thumbnail": "/assets/images/products/p-1.jpg",
      "original": "/assets/images/products/p-1.jpg"
    },
    "quantity": 70,
    "price": 600,
    "sale_price": 600,
    "unit": "1 each",
  },
  {
    "id": "search2",
    "name": "Икра осетра классик ж/б 500 гр",
    "slug": "228",
    "description": "Vegetables are parts of plants that are consumed by humans or other animals as food. the first meaning remains commonly used and is applied to plants collectively to ask all edible plant matter, including the flowers, fruits, stems, leaves, roots, and seeds. An alternate definition of the term is applied somewhat arbitrarily, often by culinary and cultural tradition. it's going to exclude foods derived from some plants that are fruits, flowers, nuts, and cereal grains, but include savoury fruits like tomatoes and courgettes, flowers like broccoli, and seeds like pulses.",
    "image": {
      "id": 1,
      "thumbnail": "/assets/images/products/p-3.jpg",
      "original": "/assets/images/products/p-3.jpg"
    },
    "quantity": 70,
    "price": 36500,
    "sale_price": 36500,
    "unit": "1 each",
  },
  {
    "id": "search3",
    "name": "Мясо 1-ой фаланги камчатского краба 14+ см в/м 1 кг",
    "slug": "27",
    "description": "Vegetables are parts of plants that are consumed by humans or other animals as food. the first meaning remains commonly used and is applied to plants collectively to ask all edible plant matter, including the flowers, fruits, stems, leaves, roots, and seeds. An alternate definition of the term is applied somewhat arbitrarily, often by culinary and cultural tradition. it's going to exclude foods derived from some plants that are fruits, flowers, nuts, and cereal grains, but include savoury fruits like tomatoes and courgettes, flowers like broccoli, and seeds like pulses.",
    "image": {
      "id": 1,
      "thumbnail": "/assets/images/products/p-2.jpg",
      "original": "/assets/images/products/p-2.jpg"
    },
    "unit": "1 Bag",
    "product_type": "variable",
    "quantity": 70,
    "price": 7900,
    "sale_price": 7900,
  }
]

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Search = observer(({
      className = 'md:w-[730px] 2xl:w-[800px]',
      searchId = 'search',
      variant = 'border'}: Props) => {
    const searchParams = useSearchParams();

    const store = useStore();
    const productStore = store.product;

    const router = useRouter();
    const pathname = usePathname();

    const [searchOpen, setSearchOpen] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = useState(searchParams.get('SearchQuery') ?? '');


    const debouncedString = useDebounce(inputValue || '', 1000);

    const handleGetSearchProducts = () => {
      //Какую фуннкцию он выполняет ?
      //Эта функция для того чтобы ее повесить на кнопку поиска , чтобы он начал искать
      if (debouncedString !== '') {
          productStore.getSearchProducts({
          SearchQuery: debouncedString,
          Count: 3,
        });
      };
    };

    useEffect(() => {
      // if (debouncedString !== '')             Делаем так чтобы отправлялся запрос с пустой строкой на сервер
      handleGetSearchProducts();
    }, [debouncedString]);




    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      productStore.setSearchName(e.target.value);
      setInputValue(e.target.value);
    };

    const onButtonClick = () => {
      router.push(`/SearchPage?SearchQuery=${inputValue.replace('+', '%2B')}`);
      handleGetSearchProducts();

      setInputFocus(false);
      closeMobileSearch();
      closeSearch();
    }


    const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        router.push(`/SearchPage?SearchQuery=${inputValue.replace('+', '%2B')}`);
        handleGetSearchProducts();

        setInputFocus(false);
        closeMobileSearch();
        closeSearch();
      }

    };



    const onKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeSearch();
          break;
      }
    };

    React.useEffect(() => {
      document.addEventListener('keydown', onKeydown);
      return () => document.removeEventListener('keydown', onKeydown);
    }, []);

    useEffect(() => {
      // Обнулять searchString только при переходе на другие страницы, кроме /SearchPage
      if (pathname !== '/SearchPage') {
        setInputValue('');
      }
    }, [pathname]);


    const {
      displayMobileSearch,
      closeMobileSearch,
      displaySearch,
      closeSearch,
    } = useUI();

    const [searchText, setSearchText] = useState('');
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    // const { data, isLoading } = useSearchQuery({
    //   text: searchText,
    // });
    useFreezeBodyScroll(
      inputFocus === true || displaySearch || displayMobileSearch
    );
    console.log(data,'datadatadata')
    // function handleSearch(e: React.SyntheticEvent) {
    //   e.preventDefault();
    // }
    function handleAutoSearch(e: React.FormEvent<HTMLInputElement>) {
      setSearchText(e.currentTarget.value);
    }

    function clear() {
      setInputValue('');
      setInputFocus(false);
      closeMobileSearch();
      closeSearch();
    }

    function clearText() {
      setInputValue('');
    }
    function handleCloseSearch() {
      setInputFocus(false);
      closeMobileSearch();
      closeSearch();
    }
    function enableInputFocus() {
      setInputFocus(true);
      setSearchOpen(true)
    }

    return (
      <div
        // ref={ref}
        className={cn(
          'w-full transition-all duration-200 ease-in-out',
          className
        )}
      >
        <div
          className={cn('overlay cursor-pointer', {
            open: displayMobileSearch,
            'input-focus-overlay-open': inputFocus === true,
            'open-search-overlay': displaySearch,
          })}
          onClick={handleCloseSearch}
        />
        {/* End of overlay */}

        <div className="w-full flex flex-col justify-center flex-shrink-0 relative z-30">
          <div className="flex flex-col mx-auto w-full" style={{ zIndex: 31 }}>
            <SearchBoxModal
              searchId={searchId}
              name="search"
              value={inputValue}
              onSubmit={handleSearch}
              // onChange={handleAutoSearch}
              onKeyDown={handleEnterKeyPress}
              onClear={clearText}
              onFocus={() => enableInputFocus()}
              variant={variant}
            />
          </div>
          {/* End of searchbox */}

          {inputFocus && (
            <div className={`w-full absolute top-[56px] start-0 py-2.5 bg-skin-fill rounded-md flex flex-col overflow-hidden shadow-dropDown z-30 ${cls.searchmodal_wrapp}`}>
              <div className={cls.searchmodal_butflex}>
                <button
                  type="submit"
                  className={cls.butflex_btn}
                  onClick={() => onButtonClick()}
                >
                  <span>Искать</span>
                </button>
                <button
                  type="submit"
                  className={cls.butflex_close_btn}
                  onClick={handleCloseSearch}
                >
                  <svg className="ui-9F9ST" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.00045 24L24 0.999999M23.9995 24L0.999999 1" stroke="currentColor" stroke-miterlimit="10"></path>
                  </svg>
                </button>
              </div>
              {/* <SearchWindow setSearchOpen={setSearchOpen} searchOpen={searchOpen} /> */}

              {inputValue.length > 0 && (
                <div>
                  {/* <div className={cls.searchproduct_title}>Результат поиска</div> */}
                  {/* <div className={`w-full ${cls.product_serch_present}`}> */}
                  <div
                    className={`py-2.5 ps-5 pe-10 scroll-snap-align-start transition-colors duration-200 ${cls.serch_present_sec}`}
                    onClick={clear}
                  >
                    <SearchProduct handleSearch={onButtonClick} />
                  </div>
                </div>
                // </div>
              )}
              {/* Хиты продаж */}
              {inputValue === '' && (
                <div>
                  <div className={cls.searchproduct_title}>Хиты продаж</div>
                  {/* {isLoading
                      ? Array.from({ length: 3 }).map((_, idx) => (
                        <div className={`w-full ${cls.product_serch_present}`}>
                      <div
                        key={`search-result-loader-key-${idx}`}
                        className="py-2.5 ps-5 pe-10 scroll-snap-align-start"
                      >
                        <SearchResultLoader
                          key={idx}
                          uniqueKey={`top-search-${idx}`}
                        />
                      </div>
                </div>
                    ))
                    :  */}
                  <div className={`w-full ${cls.product_serch_present}`}>
                    {data?.slice(0, 3).map((item, index) => (
                      <div
                        key={`search-result-key-${index}`}
                        className={`py-2.5 ps-5 pe-10 scroll-snap-align-start transition-colors duration-200 ${cls.serch_present_secs}`}
                        onClick={clear}
                      >
                        <SearchProductHits item={item} key={index} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

// Search.displayName = 'Search';

export default Search;
