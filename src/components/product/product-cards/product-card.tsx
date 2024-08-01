'use client'
import { useState, useEffect } from 'react';
import cn from 'classnames';
import { useModalAction } from '@/components/common/modal/modal.context';
import useWindowSize from '@/utils/use-window-size';
import CartIcon from '@/components/iconsCode/cart-icon';
import { AddToCart } from '@/components/product/add-to-cart';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@/assets/placeholders';
import Counter from '@/components/ui/counter';
import { toast } from 'react-toastify';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import { useStore } from '@/hooks/useStore';
import { Product } from '@/types/Product/product.types';
import { observer } from "mobx-react";

interface ProductProps {
  product: Product;
  className?: string;
}

const RenderPopupOrAddToCart = observer(({ data }: { data: Product }) => {

  const store = useStore();
  const cartStore = store.cart;
  const authStore = store.auth
  const { openModal, closeModal } = useModalAction();

  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);

  const { t } = useTranslation('common');
  const { id
    // , quantity,
    //  product_type
  } = data ?? {};
  const { width } = useWindowSize();

  const cartCount = cartStore.cart.find((row) => row.id === id)?.count || 0;

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    if (typeof id === 'string') addToCart(id);
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


	function handleLogin() {
		openModal("LOGIN_VIEW");
	}
  

  const iconSize = width! > 1024 ? '19' : '17';

  return (
    <div style={{ bottom: '127px', zIndex: 1000, right: '29px' }}>
      {authStore.isAuth ? 
        (
          cartCount > 0 ? (
            <Counter variant='popupcollection' product={data} />
          ) : (
            <button
              className="inline-flex bg-skin-primary rounded-full w-8 lg:w-10 h-8 lg:h-10 text-skin-inverted text-4xl items-center justify-center focus:outline-none focus-visible:outline-none"
              aria-label="Count Button"
              onClick={handleAddToCart}
            >
              <CartIcon />
            </button>
          )
        ):(
        <button
          className="inline-flex bg-skin-primary rounded-full w-8 lg:w-10 h-8 lg:h-10 text-skin-inverted text-4xl items-center justify-center focus:outline-none focus-visible:outline-none"
          aria-label="Count Button"
          onClick={handleLogin}
        >
          <CartIcon />
        </button>
        )
      }
    </div>
  )
})

const ProductCard: React.FC<ProductProps> = observer(({ product, className }) => {
  const { id, price, discount, article, urls, name } = product ?? {};

  const imageUrl = urls ? urls[0] : '';

  const { openModal } = useModalAction();

  const { t } = useTranslation('common');
  function handlePopupView() {
    openModal('PRODUCT_VIEW', { productId: id });
  }
  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
      title={name}
    >
      <div
        onClick={handlePopupView}
        className="relative flex-shrink-0">
        <div className="flex overflow-hidden max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative mb-5" style={{marginTop: '12px'}}>
          <img
            src={imageUrl ?? productPlaceholder}
            alt={name || 'Product Image'}
            max-width={230}
            max-height={190}
            className="object-cover bg-skin-thumbnail"
          />
        </div>
        <div className="w-full h-full absolute top-0 pt-2.5 md:pt-3.5 px-3 md:px-4 lg:px-[18px] z-10 -mx-0.5 sm:-mx-1">
          {discount ? (
            <span className="text-[11px] md:text-xs font-bold text-skin-inverted uppercase inline-block bg-skin-primary rounded-full px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t('акция')}
            </span>
          ) : ''}
        </div>
      </div>
      <div className="inline-block product-count-button-position">
        <RenderPopupOrAddToCart data={product} />
      </div>

      <div
        onClick={handlePopupView}
        className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <h2 className="text-skin-base text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5" style={{ fontWeight: '500' }}>
          <span>{article}</span>
        </h2>
        <div className="space-s-2 mb-1 lg:mb-1.5">
          <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-base">
            <span>{price}</span> ₽
          </span>
        </div>
        {/* <h2 className="text-skin-base text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5" style={{ fontWeight: '500' }}>
          <span>Арт.:</span> {name}
        </h2> */}
      </div>
    </article>
  );
});

export default ProductCard;
