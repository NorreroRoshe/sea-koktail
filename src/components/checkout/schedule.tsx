'use client'

import React, { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { observer } from 'mobx-react';
import { useStore } from '@/hooks/useStore';

const deliveryDateSchedule = [
  'Сегодня',
  'Завтра',
  'Послезавтра'
];

const Schedule: React.FC = observer(() => {
  const { t } = useTranslation('common');

  const store = useStore();
  const userStore = store.auth;
  
  const [dateSchedule, setDateSchedule] = useState(deliveryDateSchedule[0]);
  const [timeSchedule, setTimeSchedule] = useState('');


  // const [casvevwac, setcasvevwac] = useState(true); // для проверки userStore.flagOrderTimes

  useEffect(() => {
    userStore.getOrderTimes();
  }, []);

  useEffect(() => {
    // Определяем индекс на основе выбранной даты
    const dateIndex = deliveryDateSchedule.indexOf(dateSchedule);
    if (userStore.orderTimes.length > dateIndex) {
      setTimeSchedule(userStore.orderTimes[dateIndex][0] || '');
    }
  }, [dateSchedule, userStore.orderTimes]);
  
  useEffect(() => {
    // Устанавливаем значение dateSchedule в зависимости от flagOrderTimes
    if (userStore.flagOrderTimes) {
      setDateSchedule(deliveryDateSchedule[0]);
    } else {
      setDateSchedule(deliveryDateSchedule[1]);
    }
  }, [userStore.flagOrderTimes]);

  function getDay(date: string) {
    const day = date.split(',')[0];
    return day;
  }

  function getMonth(date: string) {
    const month = date.split(',')[1];
    return month;
  }


  useEffect(() => {
    if (dateSchedule) {
      const deliveryType = deliveryDateSchedule.indexOf(dateSchedule);
      userStore.setDayType(deliveryType);
    }
  }, [dateSchedule]);

  useEffect(() => {
    if (timeSchedule) {
      userStore.setDateTime(timeSchedule);
    }
  }, [timeSchedule]);


  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <RadioGroup value={dateSchedule} onChange={setDateSchedule}>
          <RadioGroup.Label className="sr-only">
            {t('text-delivery-schedule')}
          </RadioGroup.Label>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
            {deliveryDateSchedule.map((date) => (


              (date !== 'Сегодня' || userStore.flagOrderTimes) && (

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
                        className={`text-base font-semibold ${
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
              )
            ))}
          </div>
        </RadioGroup>
        {/* End of date schedule */}

          <RadioGroup
            className="mt-10"
            value={timeSchedule}
            onChange={setTimeSchedule}
          >
            <RadioGroup.Label className="sr-only">
              {t('text-delivery-schedule')}
            </RadioGroup.Label>
            <div className="flex justify-between flex-wrap lg:grid gap-3 grid-cols-3 sm:grid-cols-3 lg:grid-cols-3">
              {userStore.orderTimes[deliveryDateSchedule.indexOf(dateSchedule)]?.map((time) => (
                <RadioGroup.Option
                  key={time}
                  value={time}
                  className="cursor-pointer focus:outline-none"
                >
                  {({ active, checked }) => (
                    <div className="flex items-center">
                      <span
                        className={cn(
                          'flex w-6 h-6 rounded-full',
                          checked
                            ? 'border-[6px] border-skin-primary'
                            : 'border-2 border-gray-200'
                        )}
                      />
                      <RadioGroup.Label
                        as="p"
                        className="text-sm text-black ms-2"
                      >
                        {time}
                      </RadioGroup.Label>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          
        {/* End of time schedule */}
      </div>
    </div>
  );
});

export default Schedule;
