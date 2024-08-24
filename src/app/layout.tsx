"use client"

import "@/styles/MainLayout.scss";
import "@/styles/drawer-lib.css";
import "@/styles/tailwind.css";
import "@/styles/global.css";
import "@/styles/scrollbar.css";
import "@/styles/swiper-carousel.scss";
import "@/styles/ImgSlick.scss";
import "@/styles/allCategories.scss";
import "@/styles/custom-plugins.css";
import "@/styles/toastyfy.scss";
import React, { Suspense, useEffect } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import HighlightedBar from "@/components/layouts/header0/highlighted-bar";
import Footer from "@/components/layouts/Footer";
import MobileNavigation from "@/components/layouts/mobile-navigation/mobile-navigation";
import ScrollToTop from 'react-scroll-to-top';
import { CartProvider } from "@/contexts/cart/cart.context";
import { UIProvider } from "@/contexts/ui.context";
import { ModalProvider } from "@/components/common/modal/modal.context";
import { ToastContainer } from "react-toastify";
import ManagedModal from "@/components/common/modal/managed-modal";
import ManagedDrawer from "@/components/common/drawer/managed-drawer";
import Header0 from "@/components/layouts/header0/header0";
import { QueryClient, QueryClientProvider } from "react-query";
import { useStore } from "@/hooks/useStore";
import { useRef, useState} from 'react';


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const store = useStore();
  const authStore = store.auth;
  const cartStore = store.cart;
  const favoritesStore = store.favorites;

  const [searchBigVisible, setSearchBigVisible] = useState(false);



	const queryClient = new QueryClient();

  const isAuth = authStore.isAuth;

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

  useEffect(() => {
    authStore.refreshToken();
  }, []);

  // useEffect(() => {            //когда неавторизованные то приходят сильно много ошибок в нетворке
  //   const interval = setInterval(() => {
  //     if(+new Date() > +localStorage.getItem("access_token_expires") || 0){
  //     refresh()
  //   }}, 1000
  //   ) 
  //   return () => clearInterval(interval)
  // }, [])

  // useEffect(() => { }, [state]);


  useEffect(()=> {
    if(authStore.isAuth) {
      cartStore.getUserCart();
    }else {
      cartStore.getUserLocalCart();
    }
  },[])



  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <QueryClientProvider client={queryClient}>
          <CartProvider>
            <UIProvider>
              <ModalProvider>
                <div className="wrapper">
                  <Header0 searchBigVisible={searchBigVisible} setSearchBigVisible={setSearchBigVisible}/>
                  <div className="content">
                    {children}
                    </div>
                  <Footer />
                  <MobileNavigation />
                  <ScrollToTop
                    style={{
                      backgroundColor: '#114f89',
                      borderRadius: '50%',
                      height: '65px',
                      width: '65px',
                      zIndex: 50,
                      bottom: '115px'
                      // bottom: '75px'
                    }}
                    className="scrollCustom"
                    smooth
                    top={250}
                    svgPath={''}
                  />
                  <ToastContainer />
                  <ManagedModal />
                  <ManagedDrawer />
                </div>
              </ModalProvider>
            </UIProvider>
          </CartProvider>
          </QueryClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
