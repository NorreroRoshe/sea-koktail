'use client'
import cn from 'classnames';
import { Disclosure, Transition } from '@headlessui/react';
import { useTranslation } from 'next-i18next';
import { MdKeyboardArrowRight } from 'react-icons/md';

type CollapseProps = {
  item: any;
  translatorNS: string;
  variant?: 'gray' | 'transparent';
};

export const Accordion: React.FC<CollapseProps> = ({
  item,
  translatorNS,
  variant = 'gray',
}) => {
  const { t } = useTranslation(translatorNS);
  const { id, title, content } = item;
  return (
    <div className="w-full">
      <div className="w-full mx-auto mb-4 shadow-category bg-skin-fill rounded group accorquestion">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-5 py-4 2xl:px-6 2xl:py-6 text-base font- text-start text-skin-base focus:outline-none">
                <span
                  className={cn(
                    'text-sm font-extrabold leading-relaxed text-heading pe-2 accorquestion_titleto',
                    {
                      'md:text-base': variant === 'gray',
                      'md:text-base lg:text-lg': variant === 'transparent',
                    }
                  )}
                >
                  {t(title)}
                </span>
                {open && (
                  <span className='accor_btn_plus'>
                  -
                  </span>
                )}
                {!open && (
                  <span className='accor_btn_plus'>
                  +
                  </span>
                )}
                </Disclosure.Button>

              <Transition
                show={open}
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-5 opacity-0"
                enterTo="transform scale-10 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-5 opacity-0"
              >
                {open && (
                  <Disclosure.Panel static>
                    <div className="px-5 pb-4 2xl:pb-7  2xl:px-6  -mt-1 2xl:mt-0 leading-7 text-sm 2xl:text-15px  text-skin-base opacity-70">
                      {t(content)}
                    </div>
                  </Disclosure.Panel>
                )}
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Accordion;
