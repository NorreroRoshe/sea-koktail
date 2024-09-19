// "use client"
// import React, { useEffect, useState } from 'react';
// import { TiPencil } from 'react-icons/ti';
// import { TiDelete } from 'react-icons/ti';
// import { IDeleteAddressReq } from '@/types/Auth/auth.dtos';

// import { AiOutlinePlus } from 'react-icons/ai';
// import { RadioGroup } from '@headlessui/react';
// import { useModalAction } from '@/components/common/modal/modal.context';
// import { formatAddress } from '@/utils/format-address';
// import Button from '@/components/ui/button';
// import { useTranslation } from 'next-i18next';
// import {observer} from "mobx-react";
// import { IAddressFormat } from "@/types/Auth/auth.dtos";
// import { useStore } from '@/hooks/useStore';

// const AddressGrid: React.FC<{ address?: any }> = observer(({ address }) => {
//   const { t } = useTranslation('common');
//   const { openModal } = useModalAction();

//   const store = useStore();
//   const userStore = store.auth;


//   function handlePopupEdit(item: any) {
//     openModal('ADDRESS_EDIT', item);
//   }

//   function handlePopupView(item: any) {
//     openModal('ADDRESS_VIEW_AND_EDIT', item);
//   }
// const flag = 4;
//   address = address || [];

//   const onClickRemoveAddress = async (id: number) => {
//     if (window.confirm('Вы действительно хотите удалить данный адрес ?')) {
//         await userStore.deleteUserAddress(id) ;
//         await userStore.getUserAddress();
//     }
//   };






//   // const [selected, setSelected] = useState(address[0]);

//   const [selected, setSelected] = useState<any>(null);

//   useEffect(() => {
//     if (address && address.length > 0) {
//       setSelected(address[0]);
//     }
//   }, [address]);


//   useEffect(() => {
//     if (selected) {
//       userStore.setAddress(selected.text);
//     }
//   }, [selected]);

//   return (
//     <div className="text-15px h-full flex flex-col justify-between -mt-4 md:mt-0">
//       <RadioGroup
//         value={selected}
//         onChange={setSelected}
//         className="md:grid md:grid-cols-2 md:gap-5 auto-rows-auto space-y-4 md:space-y-0"
//       >
//         <RadioGroup.Label className="sr-only">{t('address')}</RadioGroup.Label>
//         {address?.length > 0 ? (
//           address?.map((item: any, index: any) => (
//             <RadioGroup.Option
//               key={index}
//               value={item}
//               disabled={item?.flag === 4}  {/* Отключаем элемент, если flag === 4 */}
//               className={({ checked, disabled }) =>
//                 `${checked ? 'border-skin-primary' : 'border-skin-base'}
//                   border-2 relative shadow-md focus:outline-none rounded-md p-5 block cursor-pointer min-h-[112px] h-full group address__box 
//                   ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`  {/* Стили для disabled элемента */}
//               }
//             >
//               <RadioGroup.Label
//                 as="h3"
//                 className="text-skin-base font-semibold mb-2 -mt-1"
//               >
//                 {item?.title}

//                 {flag === 4 && (
//                   <div className="text-skin-red mt-1 text-sm">
//                     {t('На данный адрес доставка невозможна, пожалуйста введите другой адрес')}
//                   </div>
//                 )}
//               </RadioGroup.Label>
//               <RadioGroup.Description
//                 as="div"
//                 className="text-skin-muted leading-6"
//               >
//                 {item?.text}
//               </RadioGroup.Description>
//               <div className="flex absolute end-3 top-3 z-10 lg:opacity-0 transition-all address__actions">
//                 <button
//                   onClick={() => handlePopupEdit(item)}
//                   className="flex justify-center items-center bg-skin-primary h-6 w-6 rounded-full text-skin-inverted text-opacity-80 text-base"
//                   style={{marginRight: '5px'}}
//                 >
//                   <TiPencil />
//                 </button>
//                 <button
//                   onClick={() => onClickRemoveAddress(item?.id)}
//                   className="flex justify-center items-center bg-[#F35C5C] h-6 w-6 rounded-full text-skin-inverted text-opacity-80 text-base"
//                 >
//                   <TiDelete  />
//                 </button>
//               </div>
//             </RadioGroup.Option>
//           ))
//         ) : (
//           <div className="border-2 border-skin-base rounded font-semibold p-5 px-10 text-skin-red flex justify-start items-center min-h-[112px] h-full">
//             {t('У вас нету адресов')}
//           </div>
//         )}
//         <button
//           className="w-full border-2 transition-all border-skin-base rounded font-semibold p-5 px-10 cursor-pointer text-skin-primary flex justify-start hover:border-skin-primary items-center min-h-[112px] h-full"
//           onClick={handlePopupView}
//         >
//           <AiOutlinePlus size={18} className="me-2" />
//           {t('Добавить адрес')}
//         </button>
//       </RadioGroup>
// {/* 
//       <div className="flex sm:justify-end mt-5 md:mt-10 lg:mt-20 save-change-button">
//         <Button className="w-full sm:w-auto">{t('Сохранить изменения')}</Button>
//       </div> */}
//     </div>
//   );
// });

// export default AddressGrid;

"use client"

import React, { useEffect, useState } from 'react';
import { TiPencil, TiDelete } from 'react-icons/ti';
import { AiOutlinePlus } from 'react-icons/ai';
import { RadioGroup } from '@headlessui/react';
import { useModalAction } from '@/components/common/modal/modal.context';
import { useTranslation } from 'next-i18next';
import { observer } from "mobx-react";
import { useStore } from '@/hooks/useStore';

const AddressGrid: React.FC<{ address?: any }> = observer(({ address }) => {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();

  const store = useStore();
  const userStore = store.auth;

  function handlePopupEdit(item: any) {
    openModal('ADDRESS_EDIT', item);
  }

  function handlePopupView(item: any) {
    openModal('ADDRESS_VIEW_AND_EDIT', item);
  }

  address = address || [];

  const onClickRemoveAddress = async (id: number) => {
    if (window.confirm('Вы действительно хотите удалить данный адрес ?')) {
      await userStore.deleteUserAddress(id);
      await userStore.getUserAddress();
    }
  };

  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    if (address && address.length > 0) {
      setSelected(address[0]);
    }
  }, [address]);

  useEffect(() => {
    if (selected) {
      userStore.setAddress(selected.text);
    }
  }, [selected]);

  return (
    <div className="text-15px h-full flex flex-col justify-between -mt-4 md:mt-0">
      <RadioGroup
        value={selected}
        onChange={setSelected}
        className="md:grid md:grid-cols-2 md:gap-5 auto-rows-auto space-y-4 md:space-y-0"
      >
        <RadioGroup.Label className="sr-only">{t('address')}</RadioGroup.Label>
        {address?.length > 0 ? (
          address?.map((item: any, index: any) => (
            <RadioGroup.Option
              key={index}
              value={item}
              disabled={item?.flag === 4}
              className={({ checked, disabled }) =>
                `${checked ? 'border-skin-primary' : 'border-skin-base'}
                  border-2 relative shadow-md focus:outline-none rounded-md p-5 block cursor-pointer min-h-[112px] h-full group address__box 
                  ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`  // Стили для disabled элемента
              }
            >
              <RadioGroup.Label
                as="h3"
                className="text-skin-base font-semibold mb-2 -mt-1"
              >
                {item?.title}
                {item?.flag === 4 && (
                  <div className="text-skin-red mt-1 text-sm">
                    {t('На данный адрес доставка невозможна, пожалуйста измените или добавьте другой адрес')}
                  </div>
                )}
              </RadioGroup.Label>
              <RadioGroup.Description
                as="div"
                className="text-skin-muted leading-6"
              >
                {item?.text}
              </RadioGroup.Description>
              <div className="flex absolute end-3 top-3 z-10 lg:opacity-0 transition-all address__actions">
                {/* <button
                  onClick={() => handlePopupEdit(item)}
                  className="flex justify-center items-center bg-skin-primary h-6 w-6 rounded-full text-skin-inverted text-opacity-80 text-base"
                  style={{ marginRight: '5px' }}
                >
                  <TiPencil />
                </button> */}
                <button
                  onClick={() => onClickRemoveAddress(item?.id)}
                  className="flex justify-center items-center bg-[#F35C5C] h-6 w-6 rounded-full text-skin-inverted text-opacity-80 text-base"
                >
                  <TiDelete />
                </button>
              </div>
            </RadioGroup.Option>
          ))
        ) : (
          <div className="border-2 border-skin-base rounded font-semibold p-5 px-10 text-skin-red flex justify-start items-center min-h-[112px] h-full">
            {t('У вас нету адресов')}
          </div>
        )}
        <button
          className="w-full border-2 transition-all border-skin-base rounded font-semibold p-5 px-10 cursor-pointer text-skin-primary flex justify-start hover:border-skin-primary items-center min-h-[112px] h-full"
          onClick={handlePopupView}
        >
          <AiOutlinePlus size={18} className="me-2" />
          {t('Добавить адрес')}
        </button>
      </RadioGroup>
    </div>
  );
});

export default AddressGrid;
