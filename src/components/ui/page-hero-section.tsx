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

const PageHeroSection: React.FC<HeaderProps> = ({
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
          Настоящая Политика конфиденциальности персональных данных (далее - Политика) составлена в соответствии с требованиями Федерального закона от 27.07.2006 г. №152-ФЗ «О персональных данных» (далее - Закон о персональных данных) и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, размещенных на Сайте в сети Интернет по адресу:  https://morskoi-koktail.ru.
          Настоящая политика конфиденциальности в отношении обработки персональных данных применяется ко всей информации, которую можно получить о Пользователе (далее – Пользователь) сайта в сети Интернет по адресу: https://morskoi-koktail.ru/, его сервисов, программ и продуктов (далее - Сайт).
          Использование сервисов Сайта означает безоговорочное согласие Пользователя с настоящей Политикой и указанными в ней условиями обработки его персональной информации; в случае несогласия с этими условиями Пользователь должен воздержаться от использования сервисов.
          Настоящая Политика применяется только к Сайту https://morskoi-koktail.ru. Сайт  https://morskoi-koktail.ru не контролирует и не несет ответственности за сайты третьих лиц, на которые Пользователь может перейти по ссылкам, доступным на Сайте https://morskoi-koktail.ru.</p>
      </div>
    </div>
  );
};

export default PageHeroSection;
