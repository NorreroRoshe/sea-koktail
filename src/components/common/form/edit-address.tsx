"use client"
import React, { useEffect, useState } from "react";
import Input from '@/components/ui/form/input';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useModalState } from '@/components/common/modal/modal.context';
import { useModalAction } from '@/components/common/modal/modal.context';
import CloseButton from '@/components/ui/close-button';
import { IEditAddressReq } from '@/types/Auth/auth.dtos';
import Heading from '@/components/ui/heading';
// import Map from '@/components/ui/map';
import { useTranslation } from 'next-i18next';
import { useStore } from '@/hooks/useStore';
import {observer} from "mobx-react";
import { formatAddress } from '@/utils/format-address';
import AsyncSelectMap from './async-select-map';


const EditAddressForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const [{ data }, setState] = useState<any>([]); //дата не всегда заполнялась , просто влязи стейт и засунули в него ответ с сервером
  const { data: item } = useModalState();
  const { closeModal } = useModalAction();

  const store = useStore();
  const userStore = store.auth;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditAddressReq>({
    defaultValues: {
      id: 0,
      title: '',
      text: '',
    },
  });

  const onSubmit = async ({ id, title, text }: IEditAddressReq) => {
    try {
      await userStore.editUserAddress({
        id: item.id,
        title,
        text
      });
      const response = await userStore.getUserAddress();
      setState(response as any);
      closeModal();
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
    }
  };

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-skin-fill rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('Редактирование адреса доставки')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Наименование"
            placeholder={item.title}
            {...register('title'
            // , { required: 'Название обязательна' }
            )}
            error={errors.title?.message}
          />
        </div>
        <div className="grid grid-cols-1 mb-6 gap-7">
          <TextArea
            label="Адрес"
            placeholder={item.text}
            {...register('text', {
              // required: 'Адрес обязателен',
            })}
            error={errors.text?.message}
            className="text-skin-base"
            variant="solid"
          />
          {/* <AsyncSelectMap /> */}
        </div>
        <div className="flex w-full justify-end">
          <Button className="h-11 md:h-12 mt-1.5" type="submit">
            {t('Сохранить изменения')}
          </Button>
        </div>
      </form>
    </div>
  );
});

export default EditAddressForm;
