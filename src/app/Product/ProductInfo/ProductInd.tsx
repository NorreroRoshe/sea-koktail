"use client"

import cls from './ProductInfo.module.scss';
import { useState } from 'react';
import Button from '@/components/ui/button';
import Counter from '@/components/ui/counter';
import useWindowSize from '@/utils/use-window-size';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@/components/ui/carousel/thumbnail-carousel';
import { useTranslation } from 'next-i18next';
import CartIcon from '@/components/iconsCode/cart-icon';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import LabelIcon from '@/components/iconsCode/label-icon';
import { IoArrowRedoOutline } from 'react-icons/io5';
import ZvonokShareBox from '@/components/ui/zvonok-share-box';
import { ProductDetailsTab, chandelierTypeArray } from '@/components/product/product-details/product-tab';
import { useCart } from '@/hooks/useCart';
import { useModalAction } from '@/components/common/modal/modal.context';
import { useFavorite } from '@/hooks/useFavorite';
import { Product } from '@/types/Product/product.types';
import { useStore } from '@/hooks/useStore';
import { observer } from "mobx-react";

type ProductInfoProps = {
  detProduct: Product;
};

export const ProductInd: React.FC<ProductInfoProps> = observer(({ detProduct }) => {

  const store = useStore();
  const favoritesStore = store.favorites;
  const cartStore = store.cart;
  const authStore = store.auth
  const { openModal, closeModal } = useModalAction();

  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const { width } = useWindowSize();
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  let discountPercentage = (detProduct.discount * detProduct.price) / 100;
  const mainPrice = Math.round(detProduct.price - discountPercentage)
  const { addToFavorite, deleteFromFavorite } = useFavorite();

  const { t } = useTranslation('common');

  // const cartCount = useAppSelector((state) => {
  //   if (detProduct && detProduct.id) {
  //     return cartProductCountByIdSelector(detProduct.id, state);
  //   }
  //   return 0; // Или какое-то другое значение по умолчанию
  // });

  const cartCount = () => {
    if (detProduct && detProduct.id) {
      return cartStore.cart.find((row) => row.id === detProduct.id)?.count || 0;
    }
    return 0; // Или какое-то другое значение по умолчанию
  };

  const { addToCart } = useCart();


  const isFavorite = () => {
    if (detProduct && detProduct.id) {
      return !!favoritesStore.ids.find((obj) => obj === detProduct.id);
    }
    // Вернуть какое-то значение по умолчанию, если  detProduct или id не существуют
    return /* значение по умолчанию */;
  };

  // const isFavorite = useAppSelector((state) => {
  //   if ( detProduct &&  detProduct.id) {
  //     return selectFavoritesItemById(state,  detProduct.id);
  //   }
  //   // Вернуть какое-то значение по умолчанию, если  detProduct или id не существуют
  //   return /* значение по умолчанию */;
  // });

  const handleAddToCart = () => {
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    detProduct && addToCart(detProduct.id);
    toast('Добавлено в корзину', {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };


  function addToWishlist() {
    setAddToWishlistLoader(true);
    const toastStatus: string = !isFavorite ? 'Добавлено в избранные' : 'Убрано из избранных';
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    detProduct && isFavorite() ? deleteFromFavorite(detProduct.id || '') : addToFavorite(detProduct?.id || '');
    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }



	function handleLogin() {
		openModal("LOGIN_VIEW");
	}
  
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  return (
    <div className={`${cls.product_info_container} ${cls.product_info_container_s} ${cls.container}`}>
      <div className="pt-6 md:pt-7 pb-2">
        <div className="lg:grid grid-cols-10 gap-7 2xl:gap-8">
          <div className="col-span-5 xl:col-span-6 overflow-hidden mb-6 md:mb-8 lg:mb-0">
            {!!detProduct ? (
              <ThumbnailCarousel popupProduct={detProduct}
                thumbnailClassName="xl:w-[700px] 2xl:w-[900px]"
                galleryClassName="xl:w-[150px] 2xl:w-[170px]"
              />
            ) : (
              // <div className="w-auto flex items-center justify-center">
              //   <Image 
              //     src={PP}
              //     alt={'404!'}
              //     width={900}
              //     height={680}
              //   />
              // </div>
              <span></span>
            )}
          </div>

          <div className="flex-shrink-0 flex flex-col col-span-5 xl:col-span-4 xl:ps-2">
            <div className="pb-3 lg:pb-5">
              <div className="md:mb-2.5 block -mt-1.5">
                <h2 className="text-skin-base text-lg md:text-xl xl:text-2xl font-extrabold transition-colors duration-300">
                  {detProduct?.name}
                </h2>
                <h2
                  style={{
                    color: '#9a9ca5',
                    fontWeight: 400,
                    lineHeight: '30px',
                    marginTop: '10px',
                    marginBottom: '50px',
                  }}
                  className="text-skin-base text-lg md:text-xl xl:text-2xl font-extrabold transition-colors duration-300">
                  {/* Арт.: */}
                   <strong style={{ color: '#424551' }}>{detProduct.article}</strong>
                </h2>
              </div>

              <div className="flex items-center mt-5">
                <div className="text-skin-base font-extrabold text-base md:text-xl xl:text-[22px]">
                  Цена: {mainPrice} <span>₽</span>
                </div>
                {!!discountPercentage && (
                  <>
                    <del className="text-sm md:text-15px ps-3 text-skin-base text-opacity-50">
                      {detProduct?.price} <span>₽</span>
                    </del>
                    <span className="inline-block rounded font-extrabold text-xs md:text-sm bg-skin-tree bg-opacity-20 text-skin-tree uppercase px-2 py-1 ms-2.5">
                      -{detProduct.discount}% {t('off')}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* <div className="pb-2">
              {detProduct && detProduct.productType !== "1" && (
                <>
                  {detProduct.availability && detProduct.availability > 0 ? (
                    <div
                      className="text-base whitespace-nowrap border-sink-base"
                      style={{
                        width: 'fit-content',
                        fontSize: '14px',
                      }}
                    >
                      В наличии:&nbsp;
                      <span
                        style={{
                          width: 'fit-content',
                          fontSize: '14px',  // Corrected the font size to 14px
                          color: '#6bb431',
                        }}
                      >
                        {detProduct.availability} {detProduct.unit}
                      </span>
                    </div>
                  ) : (
                    <div
                      className="whitespace-nowrap"
                      style={{
                        border: '1px solid',
                        width: 'fit-content',
                        padding: '0px 8px',
                        fontSize: '12px',
                        borderRadius: '5px',
                        color: '#f73d34',
                      }}
                    >
                      Нету в наличии
                    </div>
                  )}
                </>
              )}
            </div> */}

                <div className="pb-2 ewbres">
                    <span
                      className="text-sm font-extrabold qevrbte">
                      В наличии
                    </span>
                </div>
            
            <div className="pb-2">
                <div
                  className="whitespace-nowrap"
                  style={{
                    width: 'fit-content',
                    fontSize: '12px',
                  }}>код товара:<span style={{ marginLeft: '10px', fontSize: '17px' }}>
                  {detProduct.nomNumber}
                  </span>
                </div>
            </div>

            <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
              <div className="grid grid-cols-2 gap-2.5">
                {authStore.isAuth ? 
                    cartCount() > 0 ? (
                      <Counter variant="single" product={detProduct} />
                    ) : (
                      <Button
                        onClick={handleAddToCart}
                        className="w-full px-1.5"
                        loading={addToCartLoader}
                        >
                        <CartIcon color="#ffffff" className="me-3" />
                        Добавить в корзину
                      </Button>
                    ):(
                    <Button
                      onClick={handleLogin}
                      className="w-full px-1.5"
                      loading={addToCartLoader}
                      >
                      <CartIcon color="#ffffff" className="me-3" />
                      Добавить в корзину
                    </Button>
                  )
                }

                  <Button
                    variant="border"
                    onClick={authStore.isAuth ? addToWishlist : handleLogin}
                    loading={addToWishlistLoader}
                    className={`group hover:text-skin-primary ${isFavorite() && 'text-skin-primary'}`}
                    style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                    {isFavorite() ? (
                      <>
                        <IoIosHeart className="text-2xl md:text-[26px] me-2 transition-all" />
                        <span>Удалить из избранных</span>
                      </>
                    ) : (
                      <>
                        <IoIosHeartEmpty className="text-2xl md:text-[26px] me-2 transition-all group-hover:text-skin-primary" />
                        <span>В избранные</span>
                      </>
                    )}
                  </Button>
                {/* <div className="relative group">
                  <Button
                    variant="border"
                    className={`w-full hover:text-skin-primary ${shareButtonStatus === true && 'text-skin-primary'
                      }`}
                    onClick={handleChange}
                  >
                    <IoArrowRedoOutline className="text-2xl md:text-[26px] me-2 transition-all group-hover:text-skin-primary" />
                    {t('Заказать звонок')}
                  </Button>
                  <ZvonokShareBox
                    className={`absolute z-10 end-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${shareButtonStatus === true
                      ? 'visible opacity-100 top-full'
                      : 'opacity-0 invisible top-[130%]'
                      }`}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <ProductDetailsTab detProduct={detProduct} />
      </div>
    </div>
  );
});

export default ProductInd;