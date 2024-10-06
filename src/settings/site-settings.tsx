"use client"
import { CNFlag } from '@/components/iconsCode/language/CNFlag';
import { DEFlag } from '@/components/iconsCode/language/DEFlag';
import { ILFlag } from '@/components/iconsCode/language/ILFlag';
import { SAFlag } from '@/components/iconsCode/language/SAFlag';
import { USFlag } from '@/components/iconsCode/language/USFlag';
import sd from '@/assets/img/bravormain.png';

export const siteSettings = {
  name: 'Морской Коктейль',
  description: 'Описание Морской Коктейль',
  author: {
    name: 'Морской Коктейль',
    websiteUrl: 'http://МорскойКоктейль.ru/Home',
    address: '',
  },
  logo: {
    // url: '/assets/img/Buttlogo.png',
    alt: 'Морской Коктейль',
    href: '/',
    width: 128,
    height: 50,
  },
  defaultLanguage: 'en',
  currencyCode: 'RUB',
  site_header: {
    menu: [
      // {
      //   id: 0,
      //   path: '/Restaurant'
      //   label: 'Все товары',
      // },
      {
        id: 1,
        path: '/ProductiOnline?ProductTypes=2',
        label: 'Продукты',
        subMenu: [
          {
            id: 16,
            path: '/ProductiOnline?ProductTypes=2',
            label: 'Все продукты',
          },
          {
            id: 0,
            path: '/ProductiOnline?ProductTypes=2&Categories=20',
            label: 'Икра красная',
          },
          {
            id: 1,
            path: '/ProductiOnline?ProductTypes=2&Categories=19',
            label: 'Икра черная',
          },
          {
            id: 2,
            path: '/ProductiOnline?ProductTypes=2&Categories=73',
            label: 'Крабы и лобстеры',
          },
          {
            id: 3,
            path: '/ProductiOnline?ProductTypes=2&Categories=49',
            label: 'Креветки и лангустины',
          },
          {
            id: 4,
            path: '/ProductiOnline?ProductTypes=2&Categories=88',
            label: 'Морские деликатесы',
          },
          {
            id: 5,
            path: '/ProductiOnline?ProductTypes=2&Categories=134',
            label: 'Рыба',
          },
          {
            id: 6,
            path: '/ProductiOnline?ProductTypes=2&Categories=146',
            label: 'Живые морепродукты',
          },
          {
            id: 7,
            path: '/ProductiOnline?ProductTypes=2&Categories=109',
            label: 'Стейки и филе',
          },
          {
            id: 8,
            path: '/ProductiOnline?ProductTypes=2&Categories=152',
            label: 'Рыба вяленая, солёная и копченая',
          },
          {
            id: 9,
            path: '/ProductiOnline?ProductTypes=2&Categories=332',
            label: 'Полуфабрикаты',
          },
          {
            id: 10,
            path: '/ProductiOnline?ProductTypes=2&Categories=41',
            label: 'Консервы и пресервы',
          },
          {
            id: 11,
            path: '/ProductiOnline?ProductTypes=2&Categories=209',
            label: 'Снеки',
          },
          {
            id: 12,
            path: '/ProductiOnline?ProductTypes=2&Categories=223',
            label: 'Соусы',
          },
          {
            id: 14,
            path: '/ProductiOnline?ProductTypes=2&Categories=483',
            label: 'Напитки',
          },
          {
            id: 15,
            path: '/ProductiOnline?ProductTypes=2&Categories=498',
            label: 'Вода',
          }
        ]
      },
      {
        id: 2,
        path: '/Restaurant?ProductTypes=1&Categories=518',
        label: 'Ресторан',
        subMenu: [
          {
            id: 1,
            path: '/Restaurant?ProductTypes=1&Categories=518',
            label: 'Закуски',
          },
          {
            id: 2,
            path: '/Restaurant?ProductTypes=1&Categories=521',
            label: 'Горячее',
          },
          {
            id: 3,
            path: '/Restaurant?ProductTypes=1&Categories=519',
            label: 'Салаты',
          },
          {
            id: 4,
            path: '/Restaurant?ProductTypes=1&Categories=517',
            label: 'Супы',
          },
          {
            id: 5,
            path: '/Restaurant?ProductTypes=1&Categories=522',
            label: 'Витрина',
          },
          {
            id: 6,
            path: '/Restaurant?ProductTypes=1&Categories=513',
            label: 'Роллы',
          },
          {
            id: 7,
            path: '/Restaurant?ProductTypes=1&Categories=514',
            label: 'Теплые роллы',
          },
          {
            id: 8,
            path: '/Restaurant?ProductTypes=1&Categories=520',
            label: 'Сэндвичи',
          },
          {
            id: 9,
            path: '/Restaurant?ProductTypes=1&Categories=515',
            label: 'Суши',
          },
          {
            id: 10,
            path: '/Restaurant?ProductTypes=1&Categories=516',
            label: 'Сашими',
          },
          {
            id: 11,
            path: '/Restaurant?ProductTypes=1&Categories=526',
            label: 'Бургеры',
          }
        ],
        // subMenu1: [
        //   {
        //     id: 0,
        //     path: '/Restaurant/Accessories',
        //     label: 'Аксессуры для мебели',
        //   },
        //   {
        //     id: 1,
        //     path: '/sub-menu-1',
        //     label: 'Средство по уходу за обивкой',
        //   },
        //   {
        //     id: 2,
        //     path: '/sub-menu-2',
        //     label: 'Декоративные подушки',
        //   },
        //   {
        //     id: 3,
        //     path: '/vintage',
        //     label: 'Пледы',
        //   },
        //   {
        //     id: 4,
        //     path: '/standard',
        //     label: 'Покрывала',
        //   }
        // ],
        subMenu2: [
          {
            id: 0,
            path: '/sub-menu-1',
            label: 'Доставка и сборка',
          },
          {
            id: 1,
            path: '/sub-menu-1',
            label: 'Условия доставки',
          },
          {
            id: 2,
            path: '/sub-menu-2',
            label: 'Условия монтажа',
          },
          {
            id: 9,
            path: '/vintage',
            label: 'Беспланая доставка и сборка',
          }
        ],
        subMenu3: [
          {
            id: 0,
            path: '/PUPUPU',
            label: 'Популярная позиция',
          },
          {
            id: 1,
            path: '/POPOPOPO',
            label: 'Диван Polo Rofo',
            article: '12536',
            price: '98000₽',
            finalPrice: '88000₽',
            url: sd,
            // url: '../assets/img/Buttlogo.png',
          }
        ],
      }
    ],
    MainMenu: [
      {
        id: 1,
        path: '/AboutUs',
        label: 'О нас',
      },
      {
        id: 1,
        path: '/Contacts',
        label: 'Контакты',
      },
      {
        id: 1,
        path: '/DostavkaOplata',
        label: 'Доставка и оплата',
      },
    ],
  },
};
