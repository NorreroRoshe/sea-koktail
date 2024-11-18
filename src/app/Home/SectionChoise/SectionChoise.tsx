// "use client"

// import React from 'react';
// import cls from './SectionChoise.module.scss';
// import Image from 'next/image';
// import Link from 'next/link';
// import scala6 from '../../../assets/img/img/laScala6Orex.jpg';

// export const SectionChoise: React.FC = () => {
//   return (
//     <section className={cls.section_butterfly}>
//       <h2 className={cls.section_butterfly_cdvsz}>Категории</h2>
//       <div className={cls.butterfly_back}>
//         <Link href='/ProductiOnline?ProductTypes=2&Page=0' className={cls.krugi}>
//         </Link>
//         <Link href='/Restaurant?ProductTypes=1&Categories=518&Page=0' className={cls.krugi1}>
//         </Link>
//       </div>
//     </section>
//   );
// };


"use client";

import React from "react";
import cls from "./SectionChoise.module.scss";
import Image from "next/image";
import Link from "next/link";

// Импорты изображений
import productsImage from "../../../assets/img/img/currently___debora_s.png";
import restaurantImage from "../../../assets/img/img/shutterstock_4848103.jpg";

export const SectionChoise: React.FC = () => {
  return (
    <section className={cls.section_butterfly}>
      <h2 className={cls.section_butterfly_cdvsz}>Категории</h2>
      <div className={cls.butterfly_back}>
        {/* Продукты */}
        <Link href='/ProductiOnline?ProductTypes=2&Page=0' className={cls.krugi}>
          <div className={cls.image_wrapper}>
            {/* <Image
              src={productsImage}
              alt="Продукты"
              layout="fill"
              objectFit="cover"
              className={cls.image}
            /> */}

            <Image
              src={productsImage}
              alt="Продукты"
              fill
              sizes="(max-width: 1200px) 300px, (max-width: 900px) 200px, 450px"
              quality={30} // Сжатие изображения
              className={cls.image}
            />
            <span className={cls.image_text}>Продукты</span>
          </div>
        </Link>

        {/* Ресторан */}
        <Link href='/Restaurant?ProductTypes=1&Categories=518&Page=0' className={cls.krugi}>
          <div className={cls.image_wrapper}>
            <Image
              src={restaurantImage}
              alt="Ресторан"
              fill
              sizes="(max-width: 1200px) 300px, (max-width: 900px) 200px, 450px"
              quality={30} // Сжатие изображения
              className={cls.image}
            />
            <span className={cls.image_text}>Ресторан</span>
          </div>
        </Link>
      </div>
    </section>
  );
};
