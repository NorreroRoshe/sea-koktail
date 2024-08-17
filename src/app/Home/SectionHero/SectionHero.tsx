"use client"
import cls from './SectionHero.module.scss';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // путь к slick.css
import 'slick-carousel/slick/slick-theme.css'; // путь к slick-theme.css
import { BrandDesc } from './BrandDesc/BrandDesc';


export const SectionHero: React.FC = () => {

  const CustomNextArrow = (props: any) => {
    const { className, onClick } = props;
    return <div className={`${className} ${cls.custom_next}`} onClick={onClick} />;
  };

  const CustomPrevArrow = (props: any) => {
    const { className, onClick } = props;
    return <div className={`${className} ${cls.custom_prev}`} onClick={onClick} />;
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    // centerMode: true,
    // centerPadding: '205px',
  };

  return (
    <section className={cls.section_hero}>
      <h1 className={cls.visually_hidden}>Morskoi Koktail</h1>
      <div className={`${cls.hero__container}`}>
        <Slider className={cls.main_slider} {...sliderSettings}>
          <div className={`${cls.hero_slider} ${cls.slider1}`}>
            <div className={`${cls.container} ${cls.containerito}`}>
              <div className={cls.container_bano}>
                {/* <div className={cls.bano_textito}>1 января - 31 января</div> */}
                <div className={cls.bano_title}>Добро пожаловать <br />в Морской Коктейль </div>
                {/* <div className={cls.bano_reklamo}>Свет, мебель, аксессуары<br />  и многое другое<br />с особыми ценами*</div> */}
                {/* <div className={cls.bano_kupito}>Купить</div> */}
                {/* <div className={cls.bano_skidkito}>Скидки не&nbsp;суммируются с&nbsp;другими акциями и&nbsp;предложениями.</div> */}
              </div><br />
            </div>
          </div>
          <div className={`${cls.hero_slider} ${cls.slider2}`}>
            <div className={`${cls.container}`}>
              {/* <h2 className={cls.slider_header}>Новинки нашего магазина</h2> */}
              <Link href='/' className={`${cls.bano_reklamo} ${cls.bano_title_s}`}>Попробуй море на вкус!</Link>
              {/* <Link href='/Chapter' className={cls.bano_kupito_s}>Перейти к новинкам</Link> */}
            </div>
          </div>
          <div className={`${cls.hero_slider} ${cls.slider4}`}>
            <div className={`${cls.container} ${cls.container_s3}`}>
              {/* <h2 className={cls.slider_header}>Воплоти свои идеи вместе с нами !</h2> */}
              <p className={`${cls.bano_reklamo} ${cls.bano_title_s} ${cls.bano_title_ssa}`}>Магазин-Ресторан морепродуктов</p>
              <Link href='/ProductiOnline?ProductTypes=2&Page=0' className={cls.bano_kupito_s}>В магазин</Link>
            </div>
          </div>
          <div className={`${cls.hero_slider} ${cls.slider3}`}>
            <div className={`${cls.container} ${cls.container_s3}`}>
              {/* <h2 className={cls.slider_header}>Воплоти свои идеи вместе с нами !</h2> */}
              <p className={`${cls.bano_reklamo} ${cls.bano_title_s} ${cls.bano_title_ssa}`}>Готовим из того что продаем</p>
              <Link href='/Restaurant?ProductTypes=1&Categories=518&Page=0' className={cls.bano_kupito_s}>В ресторан</Link>
            </div>
          </div>
        </Slider>
        {/* <BrandDesc /> */}
      </div>
    </section>
  );
};

export default SectionHero;
