// "use client"
// import React, { useEffect, useState } from "react";
// import Input from '@/components/ui/form/input';
// import Button from '@/components/ui/button';
// import TextArea from '@/components/ui/form/text-area';
// import { useForm } from 'react-hook-form';
// import { useModalState } from '@/components/common/modal/modal.context';
// import { useModalAction } from '@/components/common/modal/modal.context';
// import CloseButton from '@/components/ui/close-button';
// import { IAddAddressReq } from '@/types/Auth/auth.dtos';
// import Heading from '@/components/ui/heading';
// import { useTranslation } from 'next-i18next';
// import { useStore } from '@/hooks/useStore';
// import {observer} from "mobx-react";
// import { formatAddress } from '@/utils/format-address';
// import AsyncSelectMap from './async-select-map';
// import AddressSearch from './AddressSearch';


// const AddAddressForm: React.FC = observer(() => {
//   const { t } = useTranslation();
//   const [{ data }, setState] = useState<any>([]);

//   const { openModal, closeModal } = useModalAction();

//   const [textError, setTextError] = useState<string | null>(null);
//   const [titleError, setTitleError] = useState<string | null>(null);
  
//   const store = useStore();
//   const userStore = store.auth;

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<IAddAddressReq>({
//     defaultValues: {
//       title: '',
//       text: '',
//     },
//   });

  // const onSubmit = async ({ title, text }: IAddAddressReq) => {
  //   try {
  //     await userStore.addUserAddress({
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
  //   } catch (error) {
  //     console.error('errorerror', error);
  //   }
  // };

//   return (
//     <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-skin-fill rounded-md">
//       <CloseButton onClick={closeModal} />
//       <Heading variant="title" className="mb-8 -mt-1.5">
//         {t('Добавьте адрес доставки')}
//       </Heading>
//       <form onSubmit={handleSubmit(onSubmit)} noValidate>
//         <div className="mb-6">
//           <Input
//             variant="solid"
//             label="Наименование"
//             {...register('title'
//             , { required: 'Название обязательна' }
//             )}
//             error={titleError || errors.title?.message}
//           />
//         </div>
//         <div className="grid grid-cols-1 mb-6 gap-7">
//           <TextArea
//             // label={<>Введите адрес <br/> <span style={{color: '#686464'}}>Адрес быть введен по примеру: Город Москва, Смоленская ул., 8 кв. 15</span></>}
//             label={`Введите адрес. Адрес должен быть введен по примеру: Город Москва, Смоленская ул., 8 кв. 15`}
//             {...register('text',
//              {
//               required: 'Адрес обязателен',
//             }
//             )}
//             error={textError || errors.text?.message}
//             className="text-skin-base"
//             variant="solid"
//           />
//           {/* <AsyncSelectMap /> */}
//           {/* <AddressSearch /> */}
//         </div>
//         <div className="flex w-full justify-end">
//           <Button className="h-11 md:h-12 mt-1.5" type="submit">
//             {t('Сохранить изменения')}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// });

// export default AddAddressForm;




"use client"
import React, { useState } from 'react';
import Input from '@/components/ui/form/input';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useModalAction } from '@/components/common/modal/modal.context';
import CloseButton from '@/components/ui/close-button';
import Heading from '@/components/ui/heading';
import { useTranslation } from 'next-i18next';
import { useStore } from '@/hooks/useStore';
import { observer } from 'mobx-react';
import { IAddAddressReq } from '@/types/Auth/auth.dtos';
import AuthService from '@/api/Auth/AuthService';
import AsyncSelectMap from './async-select-map';
// import AddressSearch from './AddressSearch';

const AddAddressForm: React.FC = observer(() => {
  const { t } = useTranslation();
  const [textError, setTextError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [{ data }, setState] = useState<any>([]);
  const [isDefault, setIsDefault] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { closeModal } = useModalAction();
  const store = useStore();
  const userStore = store.auth;

  const { register, handleSubmit, formState: { errors } } = useForm<IAddAddressReq>({
    defaultValues: {
      title: '',
      text: '',
      flag: 0,
      defaultAddress: 0,
    },
  });

  const onSubmit = async ({ title, text, flag, defaultAddress } : IAddAddressReq) => {
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
  
      // Вызываем addUserAddress с соответствующим значением флага
      await userStore.addUserAddress({ 
        title,
        text,
        defaultAddress: isDefault ? 1 : 0,
        flag: resultText === 'Внутри ЖК "Западный Порт"' ? 1 :
              resultText === 'В пределах МКАД' ? 2 :
              resultText === 'В пределах ЦКАД' ? 3 :
              4 // Если доставка не осуществляется 
      })
      .then((data) => {
        // console.log(text, 'datadatsss');
  
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
        {t('Добавьте адрес доставки')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Наименование"
            {...register('title', { required: 'Название обязательна' })}
            error={titleError || errors.title?.message}
          />
        </div>
        <div className="mb-6">
          
          {/* <TextArea
            label={`Введите адрес. Адрес должен быть введен по примеру: Город Москва, Смоленская ул., 8 кв. 15`}
            {...register('text', { required: 'Адрес обязателен' })}
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

        <div className="mb-6 flex">
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
            {t("Сделать адресс основным")}
          </label>
        </div>

        <div className={`flex w-full justify-end ${isOpen ? 'edrwf' : 'edrserfwf'}`}>
          <Button className="h-11 md:h-12 mt-1.5" type="submit">
            {t('Сохранить изменения')}
          </Button>
        </div>
      </form>
    </div>
  );
});

export default AddAddressForm;
