'use client'

import { useState } from 'react';;
import { useForm } from 'react-hook-form';
// import { useSignUpMutation, SignUpInputType } from '@/framework/basic-rest/basic-rest/auth/use-signup';
import { useTranslation } from 'next-i18next';
import Image from '../ui/image';
import { useModalAction } from '@/components/common/modal/modal.context';
import Switch from '@/components/ui/switch';
import CloseButton from '@/components/ui/close-button';
import cn from 'classnames';
import { ROUTES } from '@/utils/routes';
import Input from '../ui/form/input';
import PasswordInput from '../ui/form/password-input';
import Button from '../ui/button';
import Logo from '../ui/logo';
import Link from 'next/link';
import signupphoto from '@/assets/img/ButtImg/SignUp.jpg';
import { useStore } from '@/hooks/useStore';
import { IPasswordResetReq } from '@/types/Auth/auth.dtos';
import { useRouter } from 'next/navigation';
import {useSearchParams} from 'next/navigation';

interface PasswordResetProps {
  isPopup?: boolean;
  className?: string;
}

const PasswordReset: React.FC<PasswordResetProps> = ({
  isPopup = true,
  className,
}) => {

  const store = useStore();
  const authStore = store.auth

  const params = useSearchParams()
  const router = useRouter();

  const searchEmail = params.get('email') as string
  const searchCode = params.get('code') as string
  
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordResetReq>();

  
  function onSubmit({ password }: IPasswordResetReq) {
    authStore.passwordReset({
      code: searchCode,
      email: searchEmail,
      password,
    })


    .then((data) => {
      
      if (data?.data?.message === "Запрос выполнен успешно") {
          router.push('/SuccessChangePassword');
      } else {
        if (data?.message === "Внутренняя ошибка сервера") {
          setPasswordError('Внутренняя ошибка сервера');
          setEmailError(null);
        }
        else if (data?.message === "Пароль должен быть не менее 8 символов") {
          setPasswordError("Пароль должен быть не менее 8 символов");
          setEmailError(null);
        }
        else if (data?.message === "Неправильный код подтверждения") {
          setPasswordError("Ошибка! Пожалуйста повторите операцию позже!");
          setEmailError(null);
        }
        else if (data?.message === "Пользователь не найден") {
          setPasswordError("Пользователь не найден!");
          setEmailError(null);
        }
        else if (data?.message === "Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы.") {
          setPasswordError("Пароль должен содержать минимум 8 символов, включая заглавные и строчные буквы, цифры и специальные символы.");
          setEmailError(null);
        }
        else if (data?.message === "Undefined variable $validator") {
          setPasswordError("Ошибка при смене пароля, пожалуйса повторите позже");
          setEmailError(null);
        }
        else if (data?.message === "Passwords must have at least one uppercase ('A'-'Z').") {
          setEmailError(null);
          setPasswordError("Пароль должен содержать хотя бы одну заглавную букву ('A'-'Z').");
        } 
        else {
          setPasswordError('Ошибка при смене пароля');
        }
      }
    })
  }
  return (
    <div
      className={cn(
        'flex bg-skin-fill mx-auto rounded-lg w-full lg:w-[1000px] 2xl:w-[1200px]',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex bg-skin-fill mx-auto rounded-lg overflow-hidden w-full">
        <div className="md:w-[55%] xl:w-[60%] registration hidden md:block">
          <Image
            src={signupphoto}
            alt="sign up"
            width={800}
            height={620}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 lg:px-12  rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-skin-base font-semibold text-xl sm:text-2xl  sm:pt-3 ">
              {t('Сброс пароля')}
            </h4>
            {/* <div className="text-sm sm:text-base text-body text-center mt-3 mb-1">
              {t('Следуйте инструкциям, и вы сможете восстановить ваш пароль')}
            </div> */}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              {/* <Input
                label={t('Введите почту еще раз')}
                type="email"
                variant="solid"
                {...register('email', {
                  required: `${t('E-mail обязателен')}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t('Некорректный email'),
                  },
                })}
                error={emailError || errors.email?.message}
              />
              <PasswordInput
                label={t('Введите код который пришел на почту')}
                error={codeError || errors.code?.message}
                {...register('code', {
                  required: `${t('Некорректный код')}`,
                })}
              /> */}
              <PasswordInput
                label={t('Введите новый пароль')}
                error={passwordError || errors.password?.message}
                {...register('password', {
                  required: `${t('Некорректный пароль')}`,
                })}
              />
              <div className="relative"
              >
                <Button
                  type="submit"
                  // loading={authStore.isLoading}
                  // disabled={authStore.isLoading}
                  className="h-11 md:h-12 w-full mt-2 font-15px md:font-15px tracking-normal"
                  variant="formButton"
                >
                  {t('Сменить пароль')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
