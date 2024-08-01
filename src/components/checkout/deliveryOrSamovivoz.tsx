import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';

interface DeliveryOrSamovivozProps {
  deliveryDateSchedule: string[];
  dateSchedule: string;
  setDateSchedule: any;
  // Dispatch<SetStateAction<string>>;
}

export default function DeliveryOrSamovivoz({ deliveryDateSchedule, dateSchedule, setDateSchedule }: DeliveryOrSamovivozProps) {
  const { t } = useTranslation('common');
  function getDay(date: string) {
    const day = date.split(',');
    return day[0];
  }
  function getMonth(date: string) {
    const month = date.split(',');
    return month[1];
  }

  return (
    <div className="w-full">
      <div className="w-full mx-auto aewgrbeawsc">
        <RadioGroup value={dateSchedule} onChange={setDateSchedule}>
          <RadioGroup.Label className="sr-only">
            {t('text-delivery-schedule')}
          </RadioGroup.Label>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
            {deliveryDateSchedule.map((date) => (
              <RadioGroup.Option
                key={date}
                value={date}
                className={({ active, checked }) =>
                  cn(
                    'relative rounded-lg shadow-md px-5 py-3 cursor-pointer focus:outline-none',
                    checked
                      ? 'bg-skin-primary text-skin-inverted'
                      : 'bg-gray-100'
                  )
                }
              >
                {({ checked }) => (
                  <div className="text-center">
                    <RadioGroup.Label
                      as="p"
                      className={`text-base font-semibold  ${
                        checked ? 'text-skin-inverted' : 'text-gray-900'
                      }`}
                    >
                      {getDay(date)}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className={`text-15px ${
                        checked ? 'text-skin-inverted' : 'text-gray-500'
                      }`}
                    >
                      {getMonth(date)}
                    </RadioGroup.Description>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}