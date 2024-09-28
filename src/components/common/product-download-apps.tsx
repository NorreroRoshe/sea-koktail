'use client'
import Image from '@/components/ui/image';
import cn from 'classnames';
// import Link from '@/components/ui/link';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import cls from './Common.module.scss'

const data = {
  title: 'app-heading',
  description: 'Привезем в удобное время, с помощью сервиса Яндекс.Доставка',
  // description: 'Привезем продукты в удобное время, с помощью сервиса Яндекс.Доставка',
  appImage: '/assets/images/crab_jxvq44xtkmu7.svg',
  accImage: '/assets/images/credit_card_hand_payment_pay_icon_143286.svg',
  abbImage: '/assets/images/free-icon-delivery-truck-2189145.svg',
  appButtons: [
    {
      id: 1,
      slug: '/#',
      altText: 'button-app-store',
      appButton: '/assets/images/app-store.png',
      buttonWidth: 170,
      buttonHeight: 56,
    },
    {
      id: 2,
      slug: '/#',
      altText: 'button-play-store',
      appButton: '/assets/images/play-store.png',
      buttonWidth: 170,
      buttonHeight: 56,
    },
  ],
};

interface Props {
  className?: string;
}

const ProductDownloadApps: React.FC<Props> = ({ className = 'pt-1.5 md:pt-0' }) => {
  const { appButtons, title, description, appImage, accImage, abbImage } = data;
  const { t } = useTranslation('common');
  return (
    <div className={cn('bg-skin-threesasd overflow-hidden', className)}>
      <div className={`max-w-[1920px] mx-auto px-4 sm:px-5 md:px-6 lg:px-16 xl:px-28 2xl:px-32 3xl:px-40 md:flex justify-between items-center ${cls.div_wrappp}`}
      style={{flexDirection: 'column', padding: '60px 50px 40px'}}>
        <h2 className={cls.down_title} style={{ paddingBottom: '20px', color: '#fff' }}>Почему нам доверяют</h2>

        <p className={`text-15px xl:text-base 2xl:text-[17px] leading-7 xl:leading-9 text-skin-base text-opacity-70 pb-5 lg:pb-7 pe-0 xl:pe-8 2xl:pe-20 ${cls.down_dessascs}`}
              style={{ lineHeight: '25px', paddingInlineEnd: '0', fontSize: '15px', textAlign: 'center', width: '100% !important', color: '#fff', margin: '0 auto'}}
              >
              Нам доверяют потому что , и тут нужно небольшое описание того почему нам доверяют...
            </p>
        <div className={cls.down_fwrap}
          style={{display: 'flex',justifyContent: 'space-between', width: '100%'}}>
          <div className="py-8 xl:py-10 2xl:py-14 text-center md:text-start"
          style={{ display: 'flex', flexDirection: `column` , alignItems: 'center', paddingBottom: 0, justifyContent: 'space-around'}}
          >
            <h3 className="text-[22px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-skin-base font-extrabold font-manrope -tracking-[0.2px] mb-3 lg:mb-4"
            // style={{marginBottom: '30px'}}
            >
              <Image
              src={appImage}
              alt={t('text-app-thumbnail')}
              width={140}
              height={100}
              className={cls.down_image}
              />
            </h3>
            <p className={`text-15px xl:text-base 2xl:text-[17px] leading-7 xl:leading-9 text-skin-base text-opacity-70 pb-5 lg:pb-7 pe-0 xl:pe-8 2xl:pe-20 ${cls.down_desc}`}
              style={{ lineHeight: '25px', paddingInlineEnd: '0', fontSize: '15px', textAlign: 'center', width: '25vw', color: '#fff'}}
              >
              Большой выбор морепродуктов премиум класса
            </p>
          </div>
          <div className="py-8 xl:py-10 2xl:py-14 text-center md:text-start"
          style={{ display: 'flex', flexDirection: `column` , alignItems: 'center', paddingBottom: 0, justifyContent: 'space-around'}}
          >
            <h3 className="text-[22px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-skin-base font-extrabold font-manrope -tracking-[0.2px] mb-3 lg:mb-4"
            style={{marginBottom: '30px'}}
            >
              {/* {t(title)} */}
              <Image
              src={accImage}
              alt={t('text-app-thumbnail')}
              width={140}
              height={100}
              className={cls.down_image}
              />
            </h3>
            <p className={`text-15px xl:text-base 2xl:text-[17px] leading-7 xl:leading-9 text-skin-base text-opacity-70 pb-5 lg:pb-7 pe-0 xl:pe-8 2xl:pe-20 ${cls.down_desc}`}
              style={{ lineHeight: '25px', paddingInlineEnd: '0', fontSize: '15px', textAlign: 'center', width: '25vw', color: '#fff'}}
              >
              Удобный способ оплаты: банковской картой или СБП.
            </p>
            </div>
        
          <div className={`py-8 xl:py-10 2xl:py-14 text-center md:text-start  ${cls.down_desc_wrp}`}
          style={{ display: 'flex', flexDirection: `column` , alignItems: 'center', paddingBottom: 0, justifyContent: 'space-around'}}
          >
            <h3 className="text-[22px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-skin-base font-extrabold font-manrope -tracking-[0.2px] mb-3 lg:mb-4"
            style={{marginBottom: '30px'}}
            >
              {/* {t(title)} */}
              <Image
              src={abbImage}
              alt={t('text-app-thumbnail')}
              width={140}
              className={`${cls.down_image} ${cls.cevwdacs}`}
              height={100}
              />
            </h3>
            <p className={`text-15px xl:text-base 2xl:text-[17px] leading-7 xl:leading-9 text-skin-base text-opacity-70 pb-5 lg:pb-7 pe-0 xl:pe-8 2xl:pe-20 ${cls.down_desc}`}
              style={{ lineHeight: '25px', paddingInlineEnd: '0', fontSize: '15px', textAlign: 'center', width: '25vw', color: '#fff'}}
              >
              {t(description)}
            </p>
          </div>
        </div>
        <div className={`py-8 xl:py-10 2xl:py-14 text-center md:text-start  ${cls.down_desc_wrp_s}`}
          style={{ display: 'flex', flexDirection: `column` , alignItems: 'center', paddingBottom: 0}}
          >
            <h3 className="text-[22px] md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-skin-base font-extrabold font-manrope -tracking-[0.2px] mb-3 lg:mb-4"
            style={{marginBottom: '30px'}}
            >
              {/* {t(title)} */}
              <Image
              src={abbImage}
              alt={t('text-app-thumbnail')}
              width={140}
              className={cls.down_image}
              height={100}
              />
            </h3>
            <p className={`text-15px xl:text-base 2xl:text-[17px] leading-7 xl:leading-9 text-skin-base text-opacity-70 pb-5 lg:pb-7 pe-0 xl:pe-8 2xl:pe-20 ${cls.down_desc}`}
              style={{ lineHeight: '25px', paddingInlineEnd: '0', fontSize: '15px', textAlign: 'center', width: '25vw', color: '#fff'}}
              >
              {t(description)}
            </p>
          </div>
        <div className="hidden md:flex items-end ps-4 2xl:ps-0 md:max-w-[480px] lg:max-w-[540px] xl:max-w-auto -me-16 lg:-me-8 3xl:me-24">
          {/* <Image
            src={appImage}
            alt={t('text-app-thumbnail')}
            width={597}
            height={500}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDownloadApps;
