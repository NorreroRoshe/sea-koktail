'use client'
import {useEffect, useRef, useState} from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { useUI } from '@/contexts/ui.context';
import MenuIcon from '@/components/iconsCode/menu-icon';
import { siteSettings } from '@/settings/site-settings';
import { useActiveScroll } from '@/utils/add-active-scroll';
import Container from '@/components/ui/container';
import Logo from '@/components/ui/logo';
import Polulogo from '@/components/ui/polulogo';  
import HeaderMenu from './header-menu';
import Search from '@/components/common/search';
import { Drawer } from '@/components/common/drawer/drawer';
import { getDirection } from '@/utils/get-direction';
import SearchBig from '@/components/common/searchBig';
import SearchIcon from '@/components/iconsCode/search-icon';
import CloseIcon from '@/components/iconsCode/close-icon';
import { useModalAction } from '@/components/common/modal/modal.context';
import useOnClickOutside from '@/utils/use-click-outside';
import cls from './header.module.scss';
import {observer} from "mobx-react";
import Image from 'next/image';
import carhovpol from "../../../assets/img/4092559_search_magnifier_mobile ui_zoom_icon.svg";
import HeaderPhone from "../Header/HeaderPhone";
import {useStore} from '@/hooks/useStore';
const CartButton = dynamic(() => import('@/components/cart/cart-button'), {
  ssr: false,
});
const FavoritesButton = dynamic(() => import('@/components/cart/favorites-button'), {
  ssr: false,
});
const AuthButton = dynamic(() => import('@/components/auth/auth-button'), {
  ssr: false,
});
const MobileMenu = dynamic(
  () => import('./mobile-menu')
);

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

interface Header0Props {
  setSearchBigVisible: (visible: boolean) => void;
  searchBigVisible: boolean;
}

const Header0: React.FC<Header0Props> = observer(({setSearchBigVisible, searchBigVisible}) => {
  const {
    displaySearch,
    displayMobileSearch,
    openSearch,
    closeSearch
  } = useUI();
  const { openModal } = useModalAction();
  const siteHeaderRef = useRef() as DivElementRef;
  const siteSearchRef = useRef() as DivElementRef;
  const store = useStore();
  const authStore = store.auth;
  const cartStore = store.cart;
  const favoritesStore = store.favorites;
  const isAuth = authStore.isAuth;

  const {
    openSidebar,
    closeSidebar,
    displaySidebar,
  } = useUI();
  const dir = getDirection('ltr');
  const contentWrapperCSS = dir === 'ltr' ? { left: 0 } : { right: 0 };
  useEffect(() => {


    //del cart
    // localStorage.removeItem("cart");

    if (isAuth) {
      favoritesStore.clearItems();
      cartStore.clearCart();
      cartStore.getUserCart();
      favoritesStore.getUserFavorites();
    }
  }, [isAuth]);

  // useEffect(() => {
  //   authStore.refreshToken();
  // }, []);


  useActiveScroll(siteHeaderRef, 40);
  useOnClickOutside(siteSearchRef, () => closeSearch());
  function handleLogin() {
    openModal('LOGIN_VIEW');
  }

  function handleMobileMenu() {
    return openSidebar();
  }
  
  function toggleSearchBig() {
    setSearchBigVisible(!searchBigVisible);
  }
  
  return (
    <>
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-two sticky-header sticky top-0 z-20 lg:relative w-full h-16 lg:h-auto dewrfsceas',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="innerSticky lg:w-full transition-all duration-200 ease-in-out body-font z-20" style={{background: '#0085FF'}}>
        <Container className={`top-bar h-16 lg:h-auto flex items-center justify-between py-3 ${cls.head_cont}`}>
          <div className={cls.efrvws}>
            <button
              aria-label="Menu"
              className={`flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none ${cls.qwfevdwf}`}             // ${cls.fegsartef}
              onClick={handleMobileMenu}
              // style={{padding: '12px 9px', background: '#fff', borderRadius: '50%', marginRight: '15px', marginBottom: '8px'}}
            >
              <MenuIcon />
            </button>
              <Logo className="logo -mt-1.5 md:-mt-1" style={{ marginRight: '-40px' }} />
          <Search
            searchId="top-bar-search"
            className={`lg:flex lg:max-w-[350px] lg:ms-8 lg:me-5 ${cls.header_search_main} ${cls.header_search_main_up}`}
          />
          </div>
          <div className="flex flex-shrink-0 space-s-5 xl:space-s-7" style={{alignItems: 'center'}}>
            <HeaderPhone />
            <div className={`flex flex-shrink-0 space-s-5 xl:space-s-7 ${cls.header_search_main_dev}`}>
              <CartButton className="lg:flex" />
              <FavoritesButton className="lg:flex" />
              <AuthButton className="lg:flex" />
            </div>
            <button
              aria-label="Menu"
              className={`flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none ${cls.fegrtef}`}
              onClick={toggleSearchBig}
              style={{padding: '9px', background: '#fff', borderRadius: '50%'}}
            >
              {searchBigVisible ? (
                <CloseIcon className="text-skin-base text-opacity-40" />
                ) : (
                <SearchIcon className="text-skin-base text-opacity-40" />
              )}
            </button>
          </div>
        </Container>
        {searchBigVisible && (
          <div className={cls.header_search_main_black}>
            <SearchBig
              searchId="top-bar-search"
              className={`lg:flex lg:max-w-[650px] ${cls.header_search_main}  ${cls.header_search_main_down}`}
            />
          </div>
        )}
        <div className={`navbar bg-skin-fill hidden ${cls.header_search_main_wrapp}`}>
          <Container className={`h-16 flex justify-between items-center ${cls.head_cont} ${cls.head_cont_polu}`}>
          <div className={cls.efrvws}>
              <button
                aria-label="Menu" 
                className={`flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none ${cls.qwfevdwf}`}      // ${cls.fegsartef}
                onClick={handleMobileMenu}
              >
                <MenuIcon />
              </button>
            <Logo className="logo -mt-1.5 md:-mt-1" style={{ marginRight: '-40px' }} />
            <Search
              searchId="top-bar-search"
              className={`lg:flex lg:max-w-[350px] lg:ms-8 lg:me-5 ${cls.header_search_main} ${cls.header_search_main_up}`}
            />
            </div>
            <div className="flex flex-shrink-0 space-s-5 xl:space-s-7" style={{alignItems: 'center'}}>
              <HeaderPhone />
              <div className={`flex flex-shrink-0 space-s-5 xl:space-s-7 ${cls.header_search_main_dev}`}>
                <CartButton className="lg:flex" />
                <FavoritesButton className="lg:flex" />
                <AuthButton className="lg:flex" />
              </div>
            <button
              aria-label="Menu"
              className={`flex flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none ${cls.fegrtef}`}
              onClick={toggleSearchBig}
              style={{padding: '9px', background: '#fff', borderRadius: '50%'}}
            >
              {searchBigVisible ? (
                <CloseIcon className="text-skin-base text-opacity-40" />
                ) : (
                <SearchIcon className="text-skin-base text-opacity-40" />
              )}
            </button>
            </div>
          </Container>
          {searchBigVisible && (
            <div className={cls.header_search_main_black}>
              <SearchBig
                searchId="top-bar-search"
                className={`lg:flex lg:max-w-[650px] ${cls.header_search_main}  ${cls.header_search_main_down}`}
              />
            </div>
          )}
        </div>
      </div>
    </header>
    <Drawer
    placement={dir === 'rtl' ? 'right' : 'left'}
    open={displaySidebar}
    onClose={closeSidebar}
    // handler={false}             //Возможна ошибка из-за того что здесь закоментил
    // showMask={true}
    // level={null}
    contentWrapperStyle={contentWrapperCSS}
    >
      <MobileMenu />
    </Drawer>
    </>

  );
});

export default Header0;
