import { useModalAction } from '@/components/common/modal/modal.context';
import { useTranslation } from 'next-i18next';

const AddressSamovivozGrid: React.FC<{ address?: any }> = ({ address }) => {
  const { t } = useTranslation('common');


  address = address || [];


  return (
    <div className="text-15px h-full flex flex-col justify-between -mt-4 md:mt-0">
      <div className="md:grid md:grid-cols-2 md:gap-5 auto-rows-auto space-y-4 md:space-y-0">
        <div className="sr-only">{t('address')}</div>
        <div
          className="border-2 relative shadow-md focus:outline-none rounded-md p-5 block cursor-pointer min-h-[112px] h-full group address__box"
        >
          <div className="text-skin-base font-semibold mb-2 -mt-1">
            г. Москва
          </div>
          <div className="text-skin-muted leading-6">
            ул. Большая Филевская дом 3, корп 2
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressSamovivozGrid;
