import React from 'react'

import cls from './NotFoundBlock.module.scss'

import { useModalAction } from "@/components/common/modal/modal.context";

const NotFoundOrder: React.FC = () => {
  return (
    <div className={cls.root}>
      <h1>
        <br />
        Заказ не найден !</h1>
    </div>
  )
}

export default NotFoundOrder;