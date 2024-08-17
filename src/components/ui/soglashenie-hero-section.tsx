'use client'
import { useTranslation } from 'next-i18next';
import { Attachment } from '@/framework/basic-rest/types';
import useWindowSize from '@/utils/use-window-size';
import Breadcrumb from '@/components/ui/breadcrumb';
import cn from 'classnames';

interface HeaderProps {
  backgroundThumbnail?: Attachment | string;
  heroTitle?: string;
  mobileBackgroundThumbnail?: Attachment | string;
  variant?: 'default' | 'white';
}

const SoglashenieHeroSection: React.FC<HeaderProps> = ({
  backgroundThumbnail = '/assets/images/page-hero-bg.png',
  heroTitle = 'text-page-title',
  mobileBackgroundThumbnail = '/assets/images/page-hero-bg-mobile.png',
  variant = 'default',
}) => {
  const { t } = useTranslation('common');
  const { width } = useWindowSize();
  return (
    <div
      className={cn(
        'flex justify-center md:min-h-[250px] lg:min-h-[288px] py-20 w-full bg-cover bg-no-repeat bg-center page-header-banner',
        {
          'style-variant-white': variant === 'white',
        }
      )}
      style={{
        background: `#14739b`,
      }}
    >
      <div className="w-full flex flex-col items-center justify-center relative">
        <h2
          className={cn(
            'text-xl md:text-2xl lg:text-3xl 2xl:text-[40px] font-extrabold text-center',
            {
              'text-skin-base': variant === 'default',
              'text-skin-inverted': variant === 'white',
            }
          )}
        >
          <span
            style={{ color: 'white', marginBottom: '27px' }}
            className="font-manrope block font-extrabold mb-3 md:mb-4 lg:mb-5 2xl:mb-7 ">
            {t(heroTitle)}
          </span>
        </h2>
        <p style={{ color: 'white', textAlign: 'center', fontSize: '15px', maxWidth: '90%' }}>
          Настоящее Соглашение является публичной офертой и определяет условия использования материалов и сервисов, размещенных на сайте в сети Интернет по адресу: https://morskoi-koktail.ru, посетителями и пользователями данного интернет-сайта (далее - Сайт).
        </p>
      </div>
    </div>
  );
};

export default SoglashenieHeroSection;
