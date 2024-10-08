'use client'
import { Fragment, useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import { useRouter, usePathname } from 'next/navigation';
import LogoutIcon from '@/components/iconsCode/account-logout';
import { useLogoutMutation } from '@/framework/basic-rest/auth/use-logout';
import { useModalAction } from '../common/modal/modal.context';

type Option = {
  name: string;
  slug?: string;
  icon?: JSX.Element;
};

export default function AccountNavMobile({ options }: { options: Option[] }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { openModal } = useModalAction();
  const pathname = usePathname();
  
  const currentSelectedItem = pathname
    ? options.find((o) => o.slug === pathname)!
    : options[0];
  const [selectedItem, setSelectedItem] = useState<Option>(currentSelectedItem);
  useEffect(() => {
    setSelectedItem(currentSelectedItem);
  }, [currentSelectedItem]);

  function handleItemClick(slugs: any) {
    setSelectedItem(slugs);
    router.push(slugs.slug);
  }

  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }

  const { mutate: logout } = useLogoutMutation();

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative w-full font-body">
          <Listbox.Button className="text-skin-base relative w-full p-4 md:p-5 text-start  rounded focus:outline-none cursor-pointer border border-skin-base flex items-center">
            {selectedItem?.icon}
            <span className="flex truncate items-center text-sm md:text-15px font-extrabold ps-2.5 relative">
              {t(selectedItem?.name)}
            </span>
            <span className="absolute inset-y-0 end-4 md:end-5 flex items-center pointer-events-none">
              <FaChevronDown
                className="w-3 md:w-3.5 h-3 md:h-3.5 text-skin-base text-opacity-70"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute z-20 w-full py-2.5 mt-1.5 overflow-auto bg-skin-fill rounded-md shadow-dropDown max-h-72 focus:outline-none text-sm md:text-15px"
            >
              {options?.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `cursor-pointer relative py-3 px-4 md:px-5 ${active
                      ? 'text-skin-base bg-skin-dropdown-hover'
                      : 'text-skin-base'
                    }`
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <span className="flex items-center">
                      {option?.icon}
                      <span
                        className={`block truncate ps-2.5 md:ps-3 ${selected ? 'font-extrabold' : 'font-normal'
                          }`}
                      >
                        {t(option?.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active && 'text-amber-600'}
                                 absolute inset-y-0 start-0 flex items-center ps-3`}
                        />
                      ) : null}
                    </span>
                  )}
                </Listbox.Option>
              ))}
              <button
                className="w-full flex items-center text-sm lg:text-15px text-skin-base py-3 px-4 md:px-5 cursor-pointer focus:outline-none"
                onClick={() => logout()}
              >
                <span className="flex-shrink-0 flex justify-center">
                  <LogoutIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />
                </span>
                <span className="block truncate ps-2.5 md:ps-3">
                  {t('Выйти с аккаунта')}
                </span>
              </button>
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
