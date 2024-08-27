import React from 'react'

import cls from './NotFoundBlock.module.scss'

import { useModalAction } from "@/components/common/modal/modal.context";

const NotAuthBlock: React.FC = () => {
  const { openModal } = useModalAction();
  function handleLogin() {
    openModal("LOGIN_VIEW");
  }
  return (
    <div className={cls.root}>
      <h1>
        <br />
        Вы не авторизованы! </h1>
      <p className={cls.description}>Если вы хоитите увидеть ваш заказ, то пожалуйста авторизуйтесь </p>
      <p onClick={handleLogin} className={cls.description_btn}>Авторизоваться</p>
    </div>
  )
}

export default NotAuthBlock;