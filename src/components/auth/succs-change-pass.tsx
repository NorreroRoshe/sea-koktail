'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import cn from 'classnames';
import { useModalAction } from '../common/modal/modal.context';
import { LoginInputType, useLoginMutation } from '@/framework/basic-rest/auth/use-login';
import CloseButton from '../ui/close-button';
import Image from '../ui/image';
import Logo from '../ui/logo';
import Input from '../ui/form/input';
import PasswordInput from '../ui/form/password-input';
import Switch from '../ui/switch';
import Button from '../ui/button';
import interl from '../../assets/img/SignUp.jpg';
import { useStore } from '@/hooks/useStore';
import { ISingInReq } from '@/types/Auth/auth.dtos';



export interface PassConfProps {
  isPopup?: boolean;
  className?: string;
}

const SuccsChangePass: React.FC<PassConfProps> = ({ isPopup = true, className }) => {
  const store = useStore();
  const authStore = store.auth

  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();

  return (
    <div style={{border: '1px solid black', borderRadius: '15px'}} className={cn('w-full lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative', className)}>
      
      <div className="flex bg-skin-fill mx-auto rounded-lg overflow-hidden">
        <div className="md:w-[50%] xl:w-[50%] registration hidden md:block">
          <Image src={interl} alt="signin Image" width={800} height={621} className="w-full" />
        </div>
        <div className="w-full md:w-[50%] xl:w-[50%] py-6 sm:py-10 px-4 sm:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 ">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <div className="text-sm sm:text-15px text-body text-center mt-3 mb-1">
              {t('Поздравляем, вы успешно сменили пароль!:)')}
              <br />
            </div>
            
            <Link href='/Signin' style={{borderRadius: '15px', border: '1px solid #0085FF', padding: '5px 15px', margin: '30px auto 0px', display: 'block', width: 'fit-content'}} className="text-skin-base font-semibold text-xl sm:text-2xl sm:pt-3 ">
              {t('Авторизоваться')}
            </ Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccsChangePass;
