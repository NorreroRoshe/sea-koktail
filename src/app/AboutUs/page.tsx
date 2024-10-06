"use client"
import React from 'react';
import cls from './AboutUs.module.scss';
import aboutone from '@/assets/img/89.jpg';
import aboutTwo from '@/assets/img/99.jpg';
import asdcaS from '@/assets/img/109.jpg';
import { usePathname } from 'next/navigation'
import Breadcrumb from '@/components/ui/breadcrumb';


const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
};


const AboutUs = () => {
  const page = usePathname();
  return (
    <>
      <div className={cls.section_collaboration}>
        <div className={cls.container} style={{ marginLeft: '40px' }}>
          <Breadcrumb />
        </div>
        <div className={cls.content_title}>О компании</div>
        <div className={cls.content}>
          <div className={cls.content_img_ssa}>
            <div className={cls.content_img_s}>
              <div className={cls.content_img_p}></div>
            </div>
            <div className={cls.container}>
              <div>
                {/* <img
                  className={cls.content_img_cidada}
                  alt=""
                  src={cidada.src}
                  title=""
                /> */}
                <span
                  className={cls.about_head}
                  style={{
                    textAlign: 'center',
                    display: 'block',
                    marginTop: '50px'
                  }}>
                    Добро пожаловать в мир настоящего гастрономического удовольствия: &quot;МОРСКОЙ КОКТЕЙЛЬ&quot; -  магазин для истинных ценителей морепродуктов
                  <br />
                </span>
                <div className={cls.about_desc_wrapper}>
                  <img
                    className={cls.desc_wrapper_image}
                    alt=""
                    src={aboutone.src}
                    title=""
                  />
                  <div className={cls.desc_wrapper_text}>
                    <h3 className={cls.desc_wrapper_text_title}>О компании:</h3>
                    <span className={cls.about_desc}>
                        Занимаясь добычей рыбы, производством красной икры и морскими деликатесами Дальнего Востока более 15 лет, мы запустили новый ПРОЕКТ и создали магазин морепродуктов. 
                        Так появилась компания &quot;МОРСКОЙ КОКТЕЙЛЬ&quot;.
                      <br />
                      <br />
                        Занимаясь добычей рыбы, производством красной икры и морскими деликатесами Дальнего Востока более 15 лет, мы запустили новый ПРОЕКТ и создали магазин морепродуктов. 
                        Так появилась компания &quot;МОРСКОЙ КОКТЕЙЛЬ&quot;. 
                      <br />
                      <br />
                        В нашем магазине не только полезные и вкусные морепродукты:  икра дикого лосося, крабы, креветки, лобстеры, устрицы, морской гребешок, разнообразие рыбы, в том числе северная рыбка (омуль, чир, нельма, муксун), а также отдел ресторанной кулинарии, где покупатели могут попробовать и оценить  качественные суши, роллы, сеты из морских деликатесов, мегагаполезный Бургеркраб 🍔из сочного нежного краба с авторскими соусами,варёные раки и другие полезные вкусности. 
                      <br />
                      <br />
                        Доверьтесь нашему опыту и наслаждайтесь бесподобным вкусом вместе с нами! 
                    </span>
                  </div>
                </div>
                <div className={`${cls.about_desc_wrapper} ${cls.about_desc_wrapper_reverse}`}>
                  <img
                    className={cls.desc_wrapper_image}
                    alt=""
                    src={aboutTwo.src}
                    title=""
                  />
                  <div className={cls.desc_wrapper_text}>
                    <h3 className={cls.desc_wrapper_text_title}>Наши преимущества:</h3>
                    <span className={cls.about_desc}>
                      ✔️ Эксклюзивная ресторанная кулинария. 
                      <br />
                      <br />
                      ✔️ Специализированные аквариумы с морской и пресной водой позволяют приобрести живых устриц, крабов и раков. 
                      <br />
                      <br />
                      ✔️ Интернет-магазин с быстрой доставкой на дом! 
                      <br />
                      <br />
                      ✔️ Ежедневные дегустации! 
                      <br />
                      <br />
                      ✔️ Прямые поставки свежайшей охлажденной рыбы сёмги и форели из холодных вод Баренцева моря. 
                      <br />
                      <br />
                      ✔️ Вся продукция проходит строгий контроль качества с момента вылова, включая соблюдение температурного режима при транспортировке.
                      <br />
                      <br /> 
                      ✔️ Шоковая заморозка, непосредственно после вылова, позволяет сохранить не только вкус и аромат, но и полезные свойства морепродуктов и рыбы. В результате - на вашем столе качественные и натуральные продукты высшего качества. 
                      <br />
                      <br />
                      ✔️ С нами вы можете быть уверены в свежести и качестве каждого продукта!
                      <br />
                      <br />
                      &quot;Свежесть у рыбы бывает только одна — первая, она же и последняя&quot; - как в компании &quot;МОРСКОЙ КОКТЕЙЛЬ&quot;  
                    </span>
                  </div>
                </div>
                <div className={`${cls.about_desc_wrapper_sdq} ${cls.about_desc_wrapper}`}>
                  <img
                    className={`${cls.desc_wrapper_image} ${cls.desc_wrapper_image_gif}`}
                    alt=""
                    src={asdcaS.src}
                    title=""
                  />
                  <div className={cls.desc_wrapper_text}>
                    <h3 className={cls.desc_wrapper_text_title}>Задачи компании:</h3>
                    <span className={cls.about_desc}>
                      ✔️ Наша задача, сделать &quot;море&quot; доступным для большинства людей, чтобы люди России полюбили морепродукты как и мы! Ведь морские деликатесы - это не только вкусно, но и полезно!
                    </span>

                    <br />
                      <br />
                    Попробуй море на вкус! 🌊
                    <br />
                    <br />
                      МЫ РАБОТАЕМ, ЧТОБЫ ВАМ БЫЛО ВКУСНО🔥👌 
                    <br />
                    <br />
                      С любовью, КОМАНДА Компании МОРСКОЙ КОКТЕЙЛЬ🍸🍣🦐
                  </div>
                </div>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
        {/* <ReturnForm pageMess={page} /> */}
      </div>
    </>
  );
};

export default AboutUs;
