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
        path: '/ProductiOnline?ProductTypes=1',
        label: 'Продукты',
        subMenu: [
          {
            id: 12,
            path: '/ProductiOnline?ProductTypes=1',
            label: 'Все продукты',
          },
          {
            id: 0,
            path: '/ProductiOnline/IkraKrasnaya?ProductTypes=1&Categories=1',
            label: 'Икра красная',
          },
          {
            id: 1,
            path: '/ProductiOnline/IkraChernaya?ProductTypes=1&Categories=2',
            label: 'Икра черная',
          },
          {
            id: 2,
            path: '/ProductiOnline/IkraShuchya?ProductTypes=1&Categories=3',
            label: 'Икра щучья и северных рыб',
          },
          {
            id: 3,
            path: '/ProductiOnline/KrabiILobsteri?ProductTypes=1&Categories=4',
            label: 'Крабы и лобстеры',
          },
          {
            id: 4,
            path: '/ProductiOnline/KrevetkiILangustini?ProductTypes=1&Categories=5',
            label: 'Креветки и лангустины',
          },
          {
            id: 5,
            path: '/ProductiOnline/Moreproducti?ProductTypes=1&Categories=6',
            label: 'Морепродукты',
          },
          {
            id: 6,
            path: '/ProductiOnline/RibaSvejomorojennaya?ProductTypes=1&Categories=7',
            label: 'Рыба свежемороженая',
          },
          {
            id: 7,
            path: '/ProductiOnline/RibaOxlojdennaya?ProductTypes=1&Categories=8',
            label: 'Рыба охлажденная',
          },
          {
            id: 8,
            path: '/ProductiOnline/SteikiIFile?ProductTypes=1&Categories=9',
            label: 'Стейки и филе',
          },
          {
            id: 9,
            path: '/ProductiOnline/RibaVyalennaya?ProductTypes=1&Categories=10',
            label: 'Рыба вяленая, солёная и копченая',
          },
          {
            id: 10,
            path: '/ProductiOnline/Polufabrikati?ProductTypes=1&Categories=11',
            label: 'Полуфабрикаты',
          },
          {
            id: 11,
            path: '/ProductiOnline/KonserviIPreservi?ProductTypes=1&Categories=12',
            label: 'Консервы и пресервы',
          }
        ]
      },
      {
        id: 2,
        path: '/Restaurant?ProductTypes=1&Categories=1',
        label: 'Ресторан',
        subMenu: [
          {
            id: 1,
            path: '/Restaurant?ProductTypes=1&Categories=1',
            label: 'Холодные закуски',
          },
          {
            id: 2,
            path: '/Restaurant?ProductTypes=1&Categories=2',
            label: 'Горячие закуски',
          },
          {
            id: 3,
            path: '/Restaurant?ProductTypes=1&Categories=3',
            label: 'Салаты',
          },
          {
            id: 4,
            path: '/Restaurant?ProductTypes=1&Categories=4',
            label: 'Супы',
          },
          {
            id: 5,
            path: '/Restaurant?ProductTypes=1&Categories=5',
            label: 'Горячие блюда',
          },
          {
            id: 6,
            path: '/Restaurant?ProductTypes=1&Categories=6',
            label: 'Морепродукты',
          },
          {
            id: 7,
            path: '/Restaurant?ProductTypes=1&Categories=7',
            label: 'Роллы',
          },
          {
            id: 8,
            path: '/Restaurant?ProductTypes=1&Categories=8',
            label: 'Сэндвичи',
          },
          {
            id: 9,
            path: '/Restaurant?ProductTypes=1&Categories=9',
            label: 'Салаты',
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
        path: '/Outlet',
        label: 'Outlet',
      },
      {
        id: 1,
        path: '/Factory',
        label: 'Производство',
      },
      {
        id: 1,
        path: '/Collaboration',
        label: 'Сотрудниество',
      },
      {
        id: 1,
        path: '/Contacts',
        label: 'Контакты',
      },
      {
        id: 1,
        path: '/DostavkaOplata',
        label: 'Доставка',
      },
    ],
  },
};
