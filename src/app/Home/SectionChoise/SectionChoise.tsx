"use client"

import React from 'react';
import cls from './SectionChoise.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import scala6 from '../../../assets/img/img/laScala6Orex.jpg';

export const SectionChoise: React.FC = () => {
  return (
    <section className={cls.section_butterfly}>
      <h2 className={cls.section_butterfly_cdvsz}>Категории</h2>
      <div className={cls.butterfly_back}>
        <Link href='/ProductiOnline?ProductTypes=1&Page=0' className={cls.krugi}>
        </Link>
        <Link href='/Restaurant?ProductTypes=1&Categories=1' className={cls.krugi1}>
        </Link>
      </div>
    </section>
  );
};