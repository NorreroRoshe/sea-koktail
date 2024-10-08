'use client'
import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import LocationIcon from '@/components/iconsCode/contact/location-icon';
import PhoneIcon from '@/components/iconsCode/contact/phone-icon';
import MailIcon from '@/components/iconsCode/contact/mail-icon';
import Text from '@/components/ui/text';
import Heading from '@/components/ui/heading';

const data = [
  {
    id: 1,
    slug: '/',
    icon: (
      <LocationIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px]" />
    ),
    name: 'text-office-location',
    description: 'text-office-location-details',
  },
  {
    id: 2,
    slug: '/',
    icon: (
      <PhoneIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px]" />
    ),
    name: 'text-phone',
    description: 'text-phone-details',
  },
  {
    id: 3,
    slug: '/',
    icon: (
      <MailIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px]" />
    ),
    name: 'text-email',
    description: 'text-email-details',
  },
];
const ContactInformation: FC = () => {
  const { t } = useTranslation('common');
  return (
    <>
      {data.length > 0 && (
        <div className="px-5 lg:px-0 xl:px-12 sm:grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-7 max-w-[1420px] mx-auto space-y-7 sm:space-y-0 pt-1">
          {data?.map((item: any) => (
            <div
              key={`contact--key${item.id}`}
              className="flex flex-col lg:flex-row max-w-xs lg:max-w-sm xl:pe-7"
            >
              <div className="flex-shrink-0 w-14 xl:w-16">{item.icon}</div>
              <div className="lg:ps-3 2xl:ps-4 mt-4 lg:mt-0">
                <Heading variant="title" className="mb-2 lg:mb-2.5 font-bold">
                  {t(item.name)}
                </Heading>
                <Text>{t(item.description)}</Text>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ContactInformation;
