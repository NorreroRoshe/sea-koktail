"use client"
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import Logo from '../ui/logo';
import Input from '../ui/form/input';
import Button from '../ui/button';
import CloseButton from '../ui/close-button';
import { useModalAction } from '../common/modal/modal.context';
import PasswordInput from '../ui/form/password-input';

const SuccessChangePassword = () => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();

  return (
    <div className="py-6 px-5 sm:p-8 bg-skin-fill mx-auto rounded-lg w-full sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
          {t('Этот сайт использует файлы cookie и сервисы сбора технических данных посетителей (данные об IP-адресе, местоположении и т.д.) для обеспечения работоспособности и улучшения качества обслуживания. Продолжая использовать наш сайт, Вы автоматически соглашаетесь с использованием данных технологий.')}
        </p>
      </div>
    </div>
  );
};

export default SuccessChangePassword;