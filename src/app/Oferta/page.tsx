"use client"
import Reacr from 'react';
import Container from '@/components/ui/container';
import Heading from '@/components/ui/heading';
import OfertaHeroSection from '@/components/ui/oferta-hero-section';
import { oferta } from '@/settings/oferta-settings';
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

const PrivacyPage: React.FC = () => {
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
      <OfertaHeroSection heroTitle="Публичная оферта интернет-магазина" />
      <div className="py-12 lg:py-16 2xl:py-20 xl:px-16 2xl:px-24 3xl:px-36">
        <Container>
          <div className="flex flex-col md:flex-row">
            <nav className="hidden sm:block md:w-72 xl:w-3/12 mb-8 2xl:mb-0 lg:-mt-2">
              <ul className="sticky lg:top-20 z-10" style={{top: '10rem'}}>
                {oferta?.map((item, index) => (
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
              {oferta?.map((item) => (
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

export default PrivacyPage;

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