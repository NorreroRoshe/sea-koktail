import Counter from '@/components/ui/counter';
import cls from '@/components/GoodsCatalogue/GoodsCatalogue.module.scss';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/Product/product.types';
import { useStore } from "@/hooks/useStore";
import {observer} from "mobx-react";
import { useModalAction } from "@/components/common/modal/modal.context";

interface Props {
  cartCount: any;
  product: Product;
}

export const AddToCart = observer(({ cartCount, product }: Props) => {
  const { addToCart, deleteFromCart, isLoading } = useCart();

  const store = useStore();
  const authStore = store.auth
	const { openModal } = useModalAction();

  const handleAddToCart = () => {
    addToCart(product.id)
  }

  const handleDeleteFromCart = () => {
    deleteFromCart(product.id)
  }

	function handleLogin() {
		openModal("LOGIN_VIEW");
	}
  return (
  <>
  {authStore.isAuth ? 
    (
      cartCount > 0 ? (
        <button
        onClick={()=>handleDeleteFromCart()}
        className={`${cls.cartlike__btn1} ${ cartCount ? cls.cartlike__btn1_active : ''}`}>
        </button>
      ) : (
        <button
          onClick={()=>handleAddToCart()}
          className={`${cls.cartlike__btn1} ${
            cartCount ? cls.cartlike__btn1_active : ''
          }`}></button>
    )
    ):(
      <button
      onClick={handleLogin}
      className={`${cls.cartlike__btn1} ${
        cartCount ? cls.cartlike__btn1_active : ''
      }`}></button>
    )
  }
  </>
  );
});
