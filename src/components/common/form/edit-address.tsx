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
import AuthService from '@/api/Auth/AuthService';
import AsyncSelectMap from './async-select-map';


const EditAddressForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const [{ data }, setState] = useState<any>([]); //дата не всегда заполнялась , просто влязи стейт и засунули в него ответ с сервером
  const { data: item } = useModalState();
  const { closeModal } = useModalAction();
  const [textError, setTextError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
      flag: 0,
    },
  });

  // const onSubmit = async ({ id, title, text }: IEditAddressReq) => {
  //   try {
  //     await userStore.editUserAddress({
  //       id: item.id,
  //       title,
  //       text
  //     }).then((data) => {
      
  //       console.log(text,'datadatsss')
      
  //       if (data?.data?.message === "Запрос выполнен успешно") {
  //         closeModal();
  //       }
  //       if (data?.message  === `Не удалось преобразовать адрес ${text} в координаты: проверьте корректность адреса или попробуйте указать координаты вручную`) {
  //       setTextError(`Не удалось преобразовать адрес ${text} в координаты: проверьте корректность адреса или попробуйте указать координаты вручную`);
  //       }
        
  //     })
  //     const response = await userStore.getUserAddress();
  //     setState(response as any);
  //     // closeModal();
  //   } catch (error) {
  //     console.error('Ошибка при обновлении данных:', error);
  //   }
  // };

  const onSubmit = async ({ id, title, text, flag }: IEditAddressReq) => {
    try {
      // Вызов функции для получения координат с помощью Yandex Geocode API
      const response = await AuthService.getValidAddress({ data: text });
  
      const geoObject = response.data.response.GeoObjectCollection.featureMember[0].GeoObject;
      const coordinates = geoObject.Point.pos.split(" ").map(Number); // [longitude, latitude]
      const longitude = coordinates[0];
      const latitude = coordinates[1];
  
      console.log('Coordinates:', latitude, longitude);
  
      // Вызываем функцию checkLocation и выводим результат в консоль
      const resultText = checkLocation(latitude, longitude);
      console.log('Location check result:', resultText);
  
      // Вызываем editUserAddress с соответствующим значением флага
      await userStore.editUserAddress({ 
        id: item.id,
        title, 
        text, 
        flag: resultText === 'Внутри ЖК "Западный Порт"' ? 1 :
              resultText === 'В пределах МКАД' ? 2 :
              resultText === 'В пределах ЦКАД' ? 3 :
              4 // Если доставка не осуществляется 
      })
      .then((data) => {
        console.log(text, 'datadatsss');
  
        if (data?.data?.message === "Запрос выполнен успешно") {
          closeModal();
        }
        if (data?.message === `Не удалось преобразовать адрес ${text} в координаты: проверьте корректность адреса или попробуйте указать координаты вручную`) {
          setTextError(`Не удалось преобразовать адрес ${text} в координаты: проверьте корректность адреса или попробуйте указать координаты вручную`);
        }
      });
  
      const responseAdd = await userStore.getUserAddress();
      setState(responseAdd as any);
    } catch (error) {
      console.error('Error:', error);
      setTextError(`Не удалось преобразовать адрес ${text} в координаты: проверьте корректность адреса или попробуйте указать координаты вручную`);
    }
  };
  

  // MKAD boundaries for checking if inside MKAD
  const mkadBounds = {
    topLeft: [55.917, 37.355],   // North-West
    bottomRight: [55.573, 37.865] // South-East
  };

  // Example residential complex boundary (simplified)
  const residentialComplexBounds = {
    topLeft: [55.752401, 37.514332],    // North-West (dummy coordinates)
    bottomRight: [55.747263, 37.520424]  // South-East (dummy coordinates)
  };

  function checkLocation(latitude: any, longitude: any) {
    if (isInsideBounds(latitude, longitude, residentialComplexBounds)) {
      return 'Внутри ЖК "Западный Порт"';
    } else if (latitude >= mkadBounds.bottomRight[0] && latitude <= mkadBounds.topLeft[0] &&
      longitude >= mkadBounds.topLeft[1] && longitude <= mkadBounds.bottomRight[1]) {
      return 'В пределах МКАД';
    } else if (isNearMoscow(latitude, longitude)) {
      return 'В пределах ЦКАД';
    } else {
      return 'В данной зоне доставка не осуществляется';
    }
  }

  function isInsideBounds(latitude: any, longitude: any, bounds: any) {
    return latitude >= bounds.bottomRight[0] && latitude <= bounds.topLeft[0] &&
      longitude >= bounds.topLeft[1] && longitude <= bounds.bottomRight[1];
  }

  function isNearMoscow(latitude: any, longitude: any) {
    const distance = calculateDistance(latitude, longitude, 55.7558, 37.6173); // Moscow center
    return distance <= 50; // Check if the distance is within 50km of Moscow center
  }

  function calculateDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  function deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }
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
            error={titleError || errors.title?.message}
          />
        </div>
        <div className="grid grid-cols-1 mb-6 gap-7">
          {/* <TextArea
            label="Адрес"
            placeholder={item.text}
            {...register('text', {
              // required: 'Адрес обязателен',
            })}
            error={textError || errors.text?.message}
            className="text-skin-base"
            variant="solid"
          /> */}
          <AsyncSelectMap
            label={`Введите адрес. Адрес должен быть введен по примеру: Город Москва, Смоленская ул., 8 кв. 15`}
            {...register('text', { required: 'Адрес обязателен' })}
            error={textError || errors.text?.message}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
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
