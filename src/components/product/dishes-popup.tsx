'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/utils/routes';
import Button from '@/components/ui/button';
import Counter from '@/components/ui/counter';
import ThumbnailCarousel from '@/components/ui/carousel/thumbnail-carousel';
import Image from '@/components/ui/image';
import CartIcon from '@/components/iconsCode/cart-icon';
import Heading from '@/components/ui/heading';
import Text from '@/components/ui/text';
import LabelIcon from '@/components/iconsCode/label-icon';
import { IoCallOutline } from 'react-icons/io5';
import RelatedProductFeed from '@/components/product/feeds/related-product-feed';
import ZvonokShareBox from '@/components/ui/zvonok-share-box';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
import useWindowSize from '@/utils/use-window-size';
import { useModalAction } from '@/components/common/modal/modal.context';
import CloseButton from '@/components/ui/close-button';
import PP from '@/assets/placeholders/product-placeholder.png';
import { useFavorite } from '@/hooks/useFavorite';
import { useCart } from '@/hooks/useCart';
import { IoClose } from 'react-icons/io5';
import { Product } from '@/types/Product/product.types';
import { useStore } from '@/hooks/useStore';
import { chandelierTypeArray } from './product-details/product-tab';
import {observer} from 'mobx-react';
import cls from './Product.module.scss';

export const RelatedBreakpoints = {
  '1536': {
    slidesPerView: 6,
  },
  '1280': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 4,
  },
  '640': {
    slidesPerView: 3,
  },
  '360': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

export type ProductPopupProps = {
  popupProduct?: Product;
};

const DishesPopup: React.FC<ProductPopupProps> = observer(({ popupProduct }) => {


  const store = useStore();
  const favoritesStore = store.favorites;
  const cartStore = store.cart;
  const authStore = store.auth
  
  const { width } = useWindowSize();
  const { openModal, closeModal } = useModalAction();
  const router = useRouter();
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  // const [favorite, setFavorite] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] = useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);

  let discountPercentage = 0; // Или какое-то другое значение по умолчанию

  if (popupProduct && popupProduct.discount) {
    discountPercentage = (popupProduct.discount * popupProduct.price) / 100;
  }

  let mainPrice = 0; // Или другое значение по умолчанию

  if (popupProduct && popupProduct.price) {
    mainPrice = Math.round(popupProduct.price - discountPercentage);
  }

  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };

  function navigateToProductPage() {
    closeModal();
    router.push(`${ROUTES.PRODUCT}/${popupProduct?.id}`);
  }

  // const cartCount = useAppSelector((state) => cartProductCountByIdSelector(popupProduct.id, state));

  const cartCount = () => {
    if (popupProduct && popupProduct.id) {
      return cartStore.cart.find((row) => row.id === popupProduct.id)?.count || 0;
    }
    return 0; // Или какое-то другое значение по умолчанию
  };


  // const isFavorite = useAppSelector((state) => selectFavoritesItemById(state, popupProduct.id));

  const isFavorite = () => {
    if (popupProduct && popupProduct.id) {
      return !!favoritesStore.ids.find((obj) => obj === popupProduct.id);
    }
    // Вернуть какое-то значение по умолчанию, если popupProduct или id не существуют
    return /* значение по умолчанию */;
  };


  const { addToFavorite, deleteFromFavorite } = useFavorite();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    popupProduct && addToCart(popupProduct.id);
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
    popupProduct && isFavorite() ? deleteFromFavorite(popupProduct.id || '') : addToFavorite(popupProduct?.id || '');
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

  const attributeLabels: any = {
    calorie: 'Ккал',
    carbohydrate: 'Углеводы',
    protein: 'Белки, г',
    outQuantity: '‍Грамовка',
    fat: '‍Жиры, г',
    storageConditions: '‍‍Хранение, t'
  };
  
  const getAttributeLabel = (key: any) => attributeLabels[key] || key;
  
  const isParentMatched = popupProduct?.hierarchicalParent === 513 ||
  popupProduct?.hierarchicalParent === 514 ||
  popupProduct?.hierarchicalParent === 515 ||
  popupProduct?.hierarchicalParent === 516;

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] 2xl:w-[1360px] mx-auto p-1 lg:p-0 xl:p-3 bg-skin-fill rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-4 md:px-6 lg:p-8 2xl:p-10 mb-9 lg:mb-2 pt-4 md:pt-7 2xl:pt-10">
          <div className={`lg:flex items-start justify-between ${cls.cevwscvwa}`}>
            <div className="xl:flex items-center justify-center overflow-hidden mb-6 md:mb-8 lg:mb-0">
              {!!popupProduct ? (
                <ThumbnailCarousel popupProduct={popupProduct} />
              ) : (
                <div className="w-auto flex items-center justify-center">
                  <Image src={PP} alt={'404!'} width={650} height={590} />
                </div>
              )}
            </div>
            {popupProduct && (
              <div className="flex-shrink-0 flex flex-col lg:ps-5 xl:ps-8 2xl:ps-10 lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
                <div className="pb-5">
                  <div
                    className={`mb-2 md:mb-2.5 block -mt-1.5 ${cls.efwgrtebrwd} ${cls.efwgrtebrwdegvw}`}
                    // onClick={navigateToProductPage}
                    role="button">
                    <h2 className="text-skin-base text-lg md:text-xl xl:text-2xl font-extrabold transition-colors duration-300 hover:text-skin-primary">
                      {popupProduct.name}&nbsp;
                      <strong>{popupProduct.article}</strong>
                    </h2>
                    {/* {!!popupProduct.availability ? (
                      <div
                        className="text-base whitespace-nowrap border-sink-base"
                        style={{
                          width: 'fit-content',
                          fontSize: '14px'
                        }}>
                        В наличии: <span
                        style={{
                          width: 'fit-content',
                          fontSize: '124x',
                          color: '#6bb431'
                        }}>{popupProduct.availability} шт.</span>
                      </div>) : (
                      <div
                        className="whitespace-nowrap"
                        style={{
                          border: '1px solid',
                          width: 'fit-content',
                          padding: '0px 8px',
                          fontSize: '12px',
                          borderRadius: '5px',
                          color: '#f73d34'
                        }}>Нету в наличии</div>
                    )} */}
                  </div>
                </div>

                <div className="pb-2">


                {popupProduct?.attribute
                    ?.filter((attribute) => attribute.value)
                    .map((attribute, ids) => (
                    <span
                      key={ids}
                      className="text-sm font-extrabold"
                      style={{ color: '#787a80', fontSize: '17px' }}>
                          {getAttributeLabel(attribute.key)}:
                      <span style={{ marginLeft: '10px', fontSize: '17px' }}>{attribute.value}</span>
                      <br />
                    </span>
                  ))}

                    <span
                      className="text-sm font-extrabold"
                      style={{ color: '#787a80', fontSize: '17px' }}>
                      код товара:
                      <span style={{ marginLeft: '10px', fontSize: '17px' }}>
                        {popupProduct.nomNumber}
                      </span>
                    </span>
                </div>

                  <div className={`flex items-center mt-5 ${cls.fegrhbetrgweas}`}>                    
                  </div>
                  <div className={`flex items-center mt-5 ${cls.fegrhbetrgweas}`}>                    
                  </div>

                <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">

                  <div className="grid grid-cols-2 gap-2.5 items-center">
                    <div className="text-skin-base font-extrabold text-base md:text-xl xl:text-[22px]">
                      {/* {Math.round(popupProduct.price - discountPercentage)} */}
                      {mainPrice}
                      <span>₽</span>
                       {/* / 180г */}
                    </div>





                    {authStore.isAuth ? 
                        (
                          cartCount() > 0 ? (
                            <Counter variant="single" product={popupProduct} />
                          ) : (
                            <Button
                              onClick={handleAddToCart}
                              className="w-full px-1.5"
                              loading={addToCartLoader}
                              >
                              <CartIcon color="#ffffff" className="me-3" />
                              Добавить в корзину
                            </Button>
                        )
                        ):(
                        <Button
                          onClick={handleLogin}
                          className="w-full px-1.5"
                          loading={addToCartLoader}
                          >
                          <CartIcon color="#ffffff" className="me-3" />
                        </Button>
                        )
                      }



                  </div>
                </div>
                

              </div>
            )}
        </div>

            <div className="pt-6 xl:pt-8">
              <p>Состав:</p>
              <Text variant="small">
                {popupProduct?.description}
              </Text>
            </div>

            {isParentMatched && (
              <div className="pt-6 xl:pt-8">
                <p>Комплект:</p>
                <Text variant="small">
                  Соевый соус, васаби, имбирь, палочки
                </Text>
              </div>
            )}
            
            {/* <div className="pt-6 xl:pt-8">
              <p>Алергены:</p>
              <Text variant="small">
              {popupProduct?.description}
              </Text>
            </div> */}
          </div>
        </div>
    </div>
  );
});

export default DishesPopup;
