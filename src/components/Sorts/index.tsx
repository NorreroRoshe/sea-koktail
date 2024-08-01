'use client'
import React, { Fragment, FC, useState, useRef, useEffect } from 'react';
import { useOutsideAlerter } from '@/hooks/useClickOutside';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import { Listbox, Transition } from '@headlessui/react';
import { IoChevronDown, IoCheckmarkSharp } from 'react-icons/io5';
import { useTranslation } from 'next-i18next';

import cls from './Sorts.module.scss';
import { useStore } from '@/hooks/useStore';

type SortProps = {
  title: string;
};

type ISort = { name: string; id: number };

type Option = {
  name: string;
  url: string;
  value: string | number;
};

const options: Option[] = [
  // {
  //   name: 'по рейтингу (возрастание)',
  //   url: 'first',
  //   value: '0',
  // },
  // {
  //   name: 'по рейтингу (убывание)',
  //   url: 'second',
  //   value: '1',
  // },
  {
    name: 'по новинкам (возрастание)',
    url: 'third',
    value: '2',
  },
  {
    name: 'по новинкам (убывание)',
    url: 'fourth',
    value: '3',
  },
  // {
  //   name: 'по популярности',
  //   url: 'fourth',
  //   value: '4',
  // },
  {
    name: 'по цене (возрастание)',
    url: 'sixth',
    value: '5',
  },
  {
    name: 'по цене (убывание)',
    url: 'seventh',
    value: '6',
  },
];

const Sorts: FC<SortProps> = React.memo(({ title }) => {

  const store = useStore();
  const productStore = store.product;

  const filters = productStore.filters;
  const sort = productStore.sort;

  const { t } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const newParams = new URLSearchParams(params)
  const currentSelectedItem =params.get('sort_by')
    ? options.find((o) => o.value === params.get('sort_by'))!
    : options[0];
  const sort_by = params.get('sort_by');

  const [selectedItem, setSelectedItem] = useState<Option>(currentSelectedItem);

  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, [currentSelectedItem]);

  function handleItemClick(values: Option) {

    setSelectedItem(values);
    productStore.setSort(Number(values.value));

    const sort_by = params.get('sort_by');
    if(values.value !== options[0].value){
      newParams.set('sort_by',values.value.toString())
    }else {
      newParams.delete('sort_by')
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }

  useEffect(() => {
    const sortValue = sort_by !== null ? sort_by : '0';
    const sortValueString = Array.isArray(sortValue) ? sortValue[0] : sortValue;
    const sortValueNumber = parseInt(sortValueString, 10); // или используйте Number(sortValueString)

    productStore.setSort(sortValueNumber);
    console.log(sortValue, 'sortValue');
    console.log(sortValueString, 'sortValueString');

  }, [sort_by, sort]);

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative ms-2 lg:ms-0 min-w-[160px]">
          <div className="flex items-center fegrwews">
            <div className="icon_pered flex-shrink-0 text-15px me-2 text-skin-base text-opacity-70">
              {title}
            </div>
            <div className="icon_posle verbterweacs">
            </div>
            <Listbox.Button className="pe-5 text-skin-base text-sm font-semibold relative w-full text-start bg-skin-fill rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer dwfegwbfsdcs">
              <span className="icon_posle_doi block truncate aefwscdwsf" style={{color: '#fff'}}>{t(selectedItem.name)}</span>
              <span className="absolute top-1 end-0 flex items-end ps-1 pointer-events-none wfegrewe">
                <IoChevronDown
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute z-20 text-sm w-full py-1 mt-1 overflow-auto bg-skin-fill rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {options?.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active
                      ? 'text-skin-base bg-skin-dropdown-hover'
                      : 'text-skin-base'
                    }
                    cursor-pointer transition-all select-none relative py-2.5 ps-10 pe-4`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${selected ? 'font-extrabold' : 'font-normal'
                          } block truncate`}
                      >
                        {t(option.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-amber-600' : ''}
                                check-icon absolute inset-y-0 start-0 flex items-center ps-3`}
                        >
                          <IoCheckmarkSharp
                            className="w-5 h-5"
                            aria-hidden="true"
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
});

Sorts.displayName = 'Sorts';

export default Sorts;