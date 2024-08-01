"use client"
import React from 'react';
import s from './MirrorAdvertisement.module.scss';
import Link from 'next/link';

export const MirrorAdvertisement: React.FC = () => {
  return (
    <section className={s.section_mirrorAd}>
      <div className={s.mirrorAd_back}>
        {/* <div className={s.mirrorAd_container}> */}
          {/* <h2 className={s.mirrorAd_desc_title}>Отражение стиля</h2> */}
          {/* <p className={s.mirrorAd_desc_text}>
            Наш каталог предлагает широкий выбор зеркал разных стилей, чтобы удовлетворить любой
            вкус.
          </p> */}
          {/* <button className={s.mirrorAd_desc_btn}>Перейти в каталог</button> */}
        {/* </div> */}
        {/* <div></div> */}
      </div>
    </section>
  );
};
