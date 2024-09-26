'use client'

import { useState, useEffect } from 'react';
import { TiPencil } from 'react-icons/ti';
import { AiOutlinePlus } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { RadioGroup } from '@headlessui/react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { useModalAction } from '@/components/common/modal/modal.context';
import { useTranslation } from 'next-i18next';
import {observer} from "mobx-react";
import { useStore } from '@/hooks/useStore';

const ContactBox: React.FC<{ items?: any }> = observer(({ items }) => {
  const { t } = useTranslation('common');
  // let [contactData, setContactData] = useState(items?.data || []); // Initialize with an empty array if items or data is undefined
  const { openModal } = useModalAction();

  function handlePopupView(item: any) {
    openModal('PHONE_NUMBER', item);
  }

  function handlePopupViewEdit(item: any) {
    openModal('PHONE_NUMBER_EDIT', item);
  }

  items = items || [];

  const store = useStore();
  const userStore = store.auth;


  const onClickRemovePhone = async (id: number) => {
    if (window.confirm('Вы действительно хотите удалить данный адрес ?')) {
        await userStore.deleteUserPhone(id) ;
        await userStore.getUserPhone();
    }
  };

  // const [selected, setSelected] = useState(items[0] || null); // Initialize with null if contactData is empty

  const [selected, setSelected] = useState<any>(null);

  // useEffect(() => {
  //   if (items && items.length > 0) {
  //     setSelected(items[0]); // Default to the first item or set to null if no items
  //   }
  // }, [items]);

  useEffect(() => {
    if (items && items.length > 0) {
      // Поиск элемента с flag === true
      const flaggedItem = items.find((item: any) => item.flag === true);
      setSelected(flaggedItem || items[0]); // Установить найденный элемент или items[0], если такого элемента нет
    }
  }, [items]);

  useEffect(() => {
    if (selected) {
      userStore.setPhone(selected.text);
    }
  }, [selected]);

  return (
    <>
      <div className="text-[15px] text-skin-base">
        <RadioGroup
          value={selected}
          onChange={setSelected}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 auto-rows-auto"
        >
          <RadioGroup.Label className="sr-only">
            {t('text-default')}
          </RadioGroup.Label>
          {items?.length > 0 ? (
            items.map((item: any, index: any) => (
              <RadioGroup.Option
                key={index}
                value={item}
                className={({ active, checked }) =>
                  `${active ? 'border-skin-primary' : 'border-skin-base'}
                    ${checked ? 'border-skin-primary' : 'border-skin-base'}
                    border-2 relative shadow-md focus:outline-none rounded p-5 block cursor-pointer min-h-[112px] h-full group address__box`
                }
              >
                <RadioGroup.Label as="h2" className="font-semibold mb-2">
                  {item?.title}
                </RadioGroup.Label>
                <RadioGroup.Description as="div" className="opacity-70">
                  {item?.text}
                </RadioGroup.Description>
                <div style={{zIndex: 19}} className="flex absolute end-3 top-3 transition-all address__actions">
                  <div className="flex lg:opacity-0 transition-all address__actions">
                      <button
                        onClick={() => handlePopupViewEdit(item)}
                        className="flex justify-center items-center bg-skin-primary h-6 w-6 rounded-full text-skin-inverted text-opacity-80 text-base"
                        style={{marginRight: '5px'}}
                      >
                        <TiPencil />
                      </button>
                      <button
                        className="flex justify-center items-center bg-[#F35C5C] h-6 w-6 rounded-full text-skin-inverted text-opacity-80 text-base"
                        style={{marginRight: '5px'}}
                        onClick={() => onClickRemovePhone(item)}
                      >
                        <TiDelete fill={'#fff'} />
                      </button>
                    </div>
                    {item?.flag === true && (
                      <button
                        className="flex justify-center items-center bg-[#02b290] h-6 w-6 rounded-full text-skin-inverted text-opacity-80 text-base"
                      >
                        <IoCheckmarkCircle style={{ color: '#fff' }} />
                      </button>
                    )}
                </div>
              </RadioGroup.Option>
            ))
          ) : (
            <div className="border-2 border-skin-base rounded font-semibold p-5 px-10 text-skin-red flex justify-start items-center min-h-[112px] h-full">
              {t('У вас нету адресов')}
            </div>
          )}
          <button
            className="border-2 transition-all border-skin-base rounded font-semibold p-5 px-10 cursor-pointer text-skin-primary flex justify-start hover:border-skin-primary items-center min-h-[112px] h-full"
            onClick={handlePopupView}
          >
            <AiOutlinePlus size={18} className="me-2" />
            {t('Добавить номер телефона')}
          </button>
        </RadioGroup>
      </div>
    </>
  );
});

export default ContactBox;

function CheckIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
