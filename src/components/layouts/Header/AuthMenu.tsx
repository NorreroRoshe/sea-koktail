'use client'
import Link from "next/link";
import React from "react";
import Auth from "../../../assets/img/authperson2.svg";
import Image from "next/image";
import cls from "./Header.module.scss";
import {observer} from "mobx-react";
import { useStore } from "@/hooks/useStore";

interface IBtnProps {
  children: string;
  onClick: () => void;
}

interface Props {
	href?: string;
	btnProps?: IBtnProps;
	isAuthorized?: boolean;
	children?: any;
}

//ошибка с кнопкой войти елси вдруг будет , сделать юзэффект который будет отлавливать , если вдруг кнопка будет пустая то в таком случае делаем логаут

const AuthMenu: React.FC<Props> = observer(({ isAuthorized, href, btnProps, children }) => {
  
  const store = useStore();
  const authStore = store.auth
  
  console.log(isAuthorized,'isAuthorized')

	return authStore.isAuth ? (
		<Link
      href={`${href}` ?? ''}
      className="text-sm lg:text-16px text-skin-base font-normal focus:outline-none z-10">
      <Image
        className={cls.notauth}
        src={Auth}
        alt='authPerson' 
        style={{ width: '26px', height: '26px' }}
      />
		</Link>
	) : (
    <div
    className={cls.notauth}
			{...btnProps}
    />
	);
});

export default AuthMenu;
