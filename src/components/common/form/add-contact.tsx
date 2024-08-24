"use client"
import React, { useEffect, useState } from "react";
import CloseButton from '@/components/ui/close-button';
import Input from '@/components/ui/form/input';
import Button from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  useModalState,
  useModalAction,
} from '@/components/common/modal/modal.context';
import {observer} from "mobx-react";
import { useTranslation } from 'next-i18next';
import { IAddPhoneReq } from '@/types/Auth/auth.dtos';
import { useStore } from '@/hooks/useStore';

interface ContactFormValues {
  title: string;
  number: string;
  default: boolean;
}

const AddContactForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const [{ data }, setState] = useState<any>([]); //дата не всегда заполнялась , просто влязи стейт и засунули в него ответ с сервером
  // const { data } = useModalState();
  
  const [isDefault, setIsDefault] = useState(false);
  
  const { closeModal } = useModalAction();
  const [textError, setTextError] = useState<string | null>(null);

  const store = useStore();
  const userStore = store.auth;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddPhoneReq>({
    defaultValues: {
      title: '',
      text: '',
      flag: false,
    },
  });

  const onSubmit = async ({ title, text, flag }: IAddPhoneReq) => {
    try {
      await userStore.addUserPhone({
        title,
        text,
        flag: isDefault ? true : false
      }).then((data) => {
      
        console.log(text,'datadatsss')
      
        if (data?.data?.message === "Запрос выполнен успешно") {
          closeModal();
        }
        if (data?.message  === `Неверный формат номера телефона`) {
        setTextError(`Неверный формат номера телефона. Пример правильного формата: +7 либо 7 либо 8 ... 9999999999`);
        }
        
      })
      const response = await userStore.getUserPhone();
      setState(response as any);
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    }
  };

  return (
    <div className="w-full md:w-[510px] mx-auto p-5 sm:p-8 bg-skin-fill rounded-md">
      <CloseButton onClick={closeModal} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Название контакта"
            {...register('title'
            // , { required: 'Название контакта обязательна' }
            )}
            error={errors.title?.message}
          />
        </div>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Контактный номер"
            {...register('text'
            // , {
            //   required: 'Контактный номер обязателен',
            // }
            )}
            error={textError || errors.text?.message}
          />
        </div>
        <div className="mb-6">
          <input
            id="default-type"
            type="checkbox"
            className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none focus:checked:bg-skin-primary hover:checked:bg-skin-primary checked:bg-skin-primary"
            // {...register("default")}
            onChange={(e) => setIsDefault(e.target.checked)} // Обновление состояния при изменении чекбокса
          />
          <label
            htmlFor="default-type"
            className="align-middle ms-3 text-sm text-skin-muted"
          >
            {t("Сделать номер основным")}
          </label>
        </div>
        {/* <div className="mb-6">
          <input
            id="default-type"
            type="checkbox"
            className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none   focus:checked:bg-skin-primary hover:checked:bg-skin-primary checked:bg-skin-primary"
            {...register('default', {
              required: 'forms:default-type-required',
            })}
          />
          <label
            htmlFor="default-type"
            className="align-middle ms-3 text-sm text-skin-muted"
          >
            {t('Сделать номер основным')}
          </label>
        </div> */}
        <Button className="h-11 md:h-12 w-full mt-1.5" type="submit">
          {t('Сохранить контакт')}
        </Button>
      </form>
    </div>
  );
});

export default AddContactForm;
