"use client"
import Reacr from 'react';
import Container from '@/components/ui/container';
import Heading from '@/components/ui/heading';
import SoglashenieHeroSection from '@/components/ui/soglashenie-hero-section';
import { soglashenie } from '@/settings/soglashenie-settings';
import { Link, Element } from 'react-scroll';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

// import { GetStaticProps } from 'next';
import DownloadApps from '@/components/common/download-apps';
import Breadcrumb from '@/components/ui/breadcrumb';
function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(' ').join('_');
}

const Soglashenie: React.FC = () => {
  const { t } = useTranslation('privacy');
  return (
    <>
      {/* <Seo
        title="Privacy"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="privacy"
      /> */}
      <Container>
        <Breadcrumb />
      </Container>

      
      
      <SoglashenieHeroSection heroTitle="Соглашение об использовании материалов и сервисов интернет-сайта (пользовательское соглашение)" />
      <div className="py-12 lg:py-16 2xl:py-20 xl:px-16 2xl:px-24 3xl:px-36">
      <Container>
        <h2 style={{textAlign: 'center', marginTop: '50px', marginBottom: '20px'}}>
          Уважаемый Пользователь, благодарим Вас за посещение нашего сайта!
        </h2>
        <p style={{textAlign: 'center', marginBottom: '80px'}}>
          Прочитайте настоящее Соглашение, прежде чем начать пользоваться Сайтом. Вы обязаны соблюдать условия настоящего Соглашения, заходя на Сайт, используя сервисы, услуги и приложения, предлагаемые на Сайте. В случае если Вы не согласны с условиями Соглашения, Вы не можете пользоваться Сайтом или использовать любые сервисы, услуги и приложения, предлагаемые на Сайте, а также посещать страницы, размещенные в доменной зоне Сайта. Начало использования Сайта означает надлежащее заключение настоящего Соглашения и Ваше полное согласие со всеми его условиями.
        </p>
      </Container>
        <Container>
          <div className="flex flex-col md:flex-row">
            <nav className="hidden sm:block md:w-72 xl:w-3/12 mb-8 2xl:mb-0 lg:-mt-2">
              <ul className="sticky lg:top-20 z-10" style={{top: '10rem'}}>
                {soglashenie?.map((item, index) => (
                  <li key={index}>
                    <Link
                      spy={true}
                      offset={-120}
                      smooth={true}
                      duration={200}
                      to={makeTitleToDOMId(t(item.title))}
                      activeClass="text-skin-primary font-extrabold borderColor relative ps-3"
                      className="block transition-all cursor-pointer py-3 text-sm lg:text-15px text-skin-base font-extrabold"
                    >
                      {t(item.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:w-9/12 md:ps-8">
              {soglashenie?.map((item) => (
                // @ts-ignore
                <Element
                  key={item.title}
                  id={makeTitleToDOMId(t(item.title))}
                  className="mb-8 lg:mb-12 last:mb-0 order-list-enable"
                >
                  <Heading className="mb-4 lg:mb-6 font-body" variant="title">
                    {t(item.title)}
                  </Heading>
                  <div
                    className="text-skin-muted text-sm lg:text-15px leading-7 space-y-5"
                    dangerouslySetInnerHTML={{
                      __html: t(item.description),
                    }}
                  />
                </Element>
              ))}
            </div>
            {/* End of content */}
          </div>
        </Container>
      </div>
      <DownloadApps />
    </>
  );
}

export default Soglashenie;

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale!, [
//         'common',
//         'forms',
//         'menu',
//         'privacy',
//         'footer',
//       ])),
//     },
//   };
// };


// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale || 'en', [
//         'common',
//         'forms',
//         'menu',
//         'privacy',
//         'footer',
//       ])),
//     },
//   };
// };