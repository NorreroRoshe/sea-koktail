import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import sbp from '../../assets/img/social_icon/sbp.svg';
import cardses from '../../assets/img/social_icon/cardpay.png';

const deliveryDateSchedule = [
  { name: 'Банковская карта', icon: cardses },
  { name: 'СБП', icon: sbp },
];

export default function SposobOplati() {
  const { t } = useTranslation('common');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(deliveryDateSchedule[0]);

  return (
    <div className="w-full">
      <div className="w-full mx-auto">
        <RadioGroup value={selectedPaymentMethod} onChange={setSelectedPaymentMethod}>
          <RadioGroup.Label className="sr-only">
            {t('text-delivery-schedule')}
          </RadioGroup.Label>
          <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
            {deliveryDateSchedule.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option}
                className={({ active, checked }) =>
                  cn(
                    'relative rounded-lg shadow-md px-5 py-3 cursor-pointer focus:outline-none flex justify-center',
                    checked
                      ? 'bg-skin-primary text-skin-inverted'
                      : 'bg-gray-100'
                  )
                }
              >
                {({ checked }) => (
                  <div className="text-center flex justify-center items-center gap-3">
                    <RadioGroup.Label
                      as="span"
                      className={`text-base font-semibold ${
                        checked ? 'text-skin-inverted' : 'text-gray-900'
                      }`}
                    >
                      {option.name}
                    </RadioGroup.Label>
                    <img src={option.icon.src} alt={option.name} className='cvewasc'/>
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
