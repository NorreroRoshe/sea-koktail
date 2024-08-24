"use client"
import React, { useEffect, useState } from "react";
import Input from '@/components/ui/form/input';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useModalState } from '@/components/common/modal/modal.context';
import { useModalAction } from '@/components/common/modal/modal.context';
import CloseButton from '@/components/ui/close-button';
import { IAddAddressReq } from '@/types/Auth/auth.dtos';
import Heading from '@/components/ui/heading';
import { useTranslation } from 'next-i18next';
import { useStore } from '@/hooks/useStore';
import {observer} from "mobx-react";
import { formatAddress } from '@/utils/format-address';
import AsyncSelectMap from './async-select-map';


const AddAddressForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const [{ data }, setState] = useState<any>([]);

  const { openModal, closeModal } = useModalAction();

  const [textError, setTextError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  
  const store = useStore();
  const userStore = store.auth;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAddAddressReq>({
    defaultValues: {
      title: '',
      text: '',
    },
  });

  const onSubmit = async ({ title, text }: IAddAddressReq) => {
    try {
      await userStore.addUserAddress({
        title,
        text
      }).then((data) => {
      
        console.log(text,'datadatsss')
      
        if (data?.data?.message === "Запрос выполнен успешно") {
          closeModal();
        }
        if (data?.message  === `Не удалось преобразовать адрес ${text} в координаты: проверьте корректность адреса или попробуйте указать координаты вручную`) {
        setTextError(`Не удалось преобразовать адрес ${text} в координаты: проверьте корректность адреса или попробуйте указать координаты вручную`);
        }
        
      })
      const response = await userStore.getUserAddress();
      setState(response as any);
    } catch (error) {
      console.error('errorerror', error);
    }
  };

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-skin-fill rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('Добавьте адрес доставки')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Наименование"
            {...register('title'
            , { required: 'Название обязательна' }
            )}
            error={titleError || errors.title?.message}
          />
        </div>
        <div className="grid grid-cols-1 mb-6 gap-7">
          <TextArea
            // label={<>Введите адрес <br/> <span style={{color: '#686464'}}>Адрес быть введен по примеру: Город Москва, Смоленская ул., 8 кв. 15</span></>}
            label={`Введите адрес. Адрес должен быть введен по примеру: Город Москва, Смоленская ул., 8 кв. 15`}
            {...register('text',
             {
              required: 'Адрес обязателен',
            }
            )}
            error={textError || errors.text?.message}
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

export default AddAddressForm;
