'use client'

import { useState } from 'react';
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
import interl from '../../assets/img/SignIn.jpg';
import { AuthStore } from '@/store/authStore';
import { ISingInReq, IResendConfirmReq } from '@/types/Auth/auth.dtos';
import { useStore } from '@/hooks/useStore';
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation';

export interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ isPopup = true, className }) => {

  const store = useStore();
  const authStore = store.auth;
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();
  const [remember, setRemember] = useState(false);
  const [openResetCode, setOpenResetCode] = useState(false)
  const [newCode, setNewCode] = useState(false)
  const [ifCode, setIfCode] = useState(false)
  const [secEemailError, setSecEemailError] = useState<string | null>(null);

  const router = useRouter();

  const pathname = usePathname();

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISingInReq>();

  const {
    register: registerSecondForm,
    handleSubmit: handleSubmitSecondForm,
    formState: { errors: errorsSecondForm },
  } = useForm<IResendConfirmReq>();


  function onSubmit({ email, password }: ISingInReq) {
    authStore.signIn({
      email,
      password,
      rememberMe: true,
    })
      .then((data) => {

        if (!data?.message) {
          closeModal();

          if (pathname === '/CompleteOrder') {
            router.refresh();
          } else {
            router.push('/MyAccount/account-settings');
          }
          // router.push('/MyAccount/account-settings');
        } else {

          if (data?.message === 'Неверный пароль') {
            setPasswordError('Неверный пароль');
            setEmailError(null);
          }
          else if (data?.message === 'Неудачная попытка входа') {
            setEmailError('Неудачная попытка входа');
            setPasswordError(null);
          }
          else if (data?.message === 'Пользователь не найден') {
            setEmailError('Пользователь не найден');
            setPasswordError(null);
          }
          else if (data?.message === 'Почта не подтверждена') {
            setEmailError('Почта не подтверждена');
            setPasswordError(null);
          } else {
            setEmailError('Ошибка при входе');
            setPasswordError('Ошибка при входе');
          }
        }
      });
  }

  function onResetSubmit({ email }: IResendConfirmReq) {
    authStore.emailResendConfirm({ email })
      .then((data) => {
        if (data?.data?.message === "Запрос выполнен успешно") {
          setOpenResetCode(false);
          setIfCode(true);
          setNewCode(true);
        } else {
          if (data?.message === "Пользователь не найден") {
            setSecEemailError('Пользователь не найден');
          }
          else {
            setSecEemailError("Ошибка при входе");
          }
        }
      });
  }

  function handleSignUp() {
    return openModal('SIGN_UP_VIEW');
  }

  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }

  return (
    <div className={cn('w-full lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative', className)}>
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <div className="flex bg-skin-fill mx-auto rounded-lg overflow-hidden">
        <div className="md:w-[55%] xl:w-[60%] registration hidden md:block">
          <Image src={interl} alt="signin Image" width={800} height={621} className="w-full" />
        </div>
        <div className="w-full md:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 ">
            <div onClick={closeModal}>
              <Logo />
            </div>
            <h4 className="text-skin-base font-semibold text-xl sm:text-2xl sm:pt-3 ">
              {t('Авторизоваться')}
            </h4>
            <div className="text-sm sm:text-15px text-body text-center mt-3 mb-1">
              {t('Нет аккаунта?')}
              <br />
              <button
                type="button"
                className="text-skin-primary sm:text-15px text-sm ms-1 font-semibold  hover:no-underline focus:outline-none"
                onClick={handleSignUp}>
                {t('Создать аккаунт')}
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate>
            <div className="flex flex-col space-y-3.5">
              <Input
                label={t('Почта')}
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
                label={t('Пароль')}
                error={passwordError || errors.password?.message}
                {...register('password', {
                  required: `${t('Пароль обязателен')}`,
                })}
              />
              <div className="flex items-center justify-center">
                {/* <div className="flex items-center flex-shrink-0">
                  <label className="switch relative inline-block w-10 cursor-pointer">
                    <Switch checked={remember} onChange={setRemember} 
                    {...register('password', {
                      required: `${t('Пароль обязателен')}`,
                    })}/>
                  </label>
                  <label
                    htmlFor="remember"
                    className="flex-shrink-0 text-sm text-heading ps-5 mt-1 cursor-pointer">
                    {t('Запомнить меня')}
                  </label>
                </div> */}
                <div className="flex ms-auto mt-[3px]">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-skin-primary sm:text-15px text-sm ms-1 font-semibold hover:no-underline focus:outline-none">
                    {t('Забыли пароль ?')}
                  </button>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  // loading={authStore.isLoading}
                  // disabled={authStore.isLoading}
                  className="h-11 md:h-12 w-full mt-2 font-15px md:font-15px tracking-normal"
                  variant="formButton">
                  {t('Войти')}
                </Button>
              </div>
            </div>
          </form>

          <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-10 mb-6 sm:mb-7">
            <hr className="w-full border-gray-300" />
            {!newCode &&
              <span className="absolute -top-2.5 px-2 bg-skin-fill">
                {t('Если вам не пришла ссылка на почту, то')}
              </span>}
          </div>

          {!ifCode && (
            <div className="text-sm sm:text-15px text-skin-muted text-center">
              <div onClick={() => {
                setOpenResetCode(true);
                setIfCode(true);
              }}>
                <button
                  type="button"
                  // onClick={onResetSubmit}
                  className="text-skin-base underline font-700 hover:no-underline focus:outline-none"
                >
                  {t('Нажмите сюда чтобы повторно пройти верификацию')}
                </button>
              </div>
            </div>
          )}






          {openResetCode && (
            <form
              onSubmit={handleSubmitSecondForm((data) => onResetSubmit(data))}
              className="flex flex-col justify-center"
              noValidate
            >
              <Input
                label={t('Введите адрес Email на который пришёл код')}
                type="email"
                variant="solid"
                {...registerSecondForm('email', {
                  required: `${t('Email обязателен')}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t('Некорректный email'),
                  },
                })}
                error={secEemailError || errorsSecondForm.email?.message}
              />
              <Button
                type="submit"
                variant="formButton"
                className="h-11 md:h-12 w-full mt-5"
              >
                {t('Получить повторно код подтверждения')}
              </Button>
            </form>
          )}

          {newCode && (
            <div className="text-sm sm:text-15px text-skin-muted text-center">
              <span
                // type="button"
                className="text-skin-base font-normal font-700 focus:outline-none"
                style={{ opacity: '0.7' }}
              >
                <span className='text-22px font-normal hover:no-underline underline'
                  style={{ color: 'rgb(2, 178, 144)', opacity: '1' }}
                >Мы выслали вам повторно код на вашу почту!</span>
                <br />
                <br />
                Пожалуйста проверьте на вашей почте в папке &apos;Входящие&apos; либо в папке &apos;Cпам&apos;.
                <br />
                В случае если кода нет ни в одной из папок на указанной почте, то просим связаться с нами по почте &apos;seacocktailinfo@gmail.com&apos;, либо по номеру телефона +7-903-730-30-01.
              </span>
            </div>
          )}
          <div className="flex flex-col items-center justify-center relative text-sm">
            <span className="mt-14 text-sm text-skin-base opacity-70">
              {t('Следите за нами в соцсетях')}
            </span>
          </div>

          <div className="flex justify-center mt-5 space-x-2.5">
            <button className="group flex items-center justify-center cursor-pointer h-10 w-10 rounded-full border border-skin-one hover:border-skin-primary transition-all focus:border-skin-primary focus:text-skin-primary focus:outline-none">
              <FaInstagram className="h-4 w-4 text-skin-base text-opacity-50 transition-all group-hover:text-skin-primary focus:text-skin-primary" />
            </button>
            <button className="group flex items-center justify-center cursor-pointer h-10 w-10 rounded-full border border-skin-one hover:border-skin-primary transition-all focus:border-skin-primary focus:text-skin-primary focus:outline-none">
              <FaTelegramPlane className="h-4 w-4 text-skin-base text-opacity-50 transition-all group-hover:text-skin-primary  focus:text-skin-primary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
