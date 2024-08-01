import React, { useState } from 'react';
import s from './YandexMap.module.scss';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const YandexMap = () => {
  const [isGrayscale, setIsGrayscale] = useState(true);

  const toggleGrayscale = () => {
    setIsGrayscale(!isGrayscale);
  };

  return (
    <section className={s.section_butterfly}>
      <h3 className={s.s2fewefds}>Мы на картах</h3>
      <YMaps query={{ apikey: '2d4fdc10-d35f-47a4-8484-9119412d96f1' }}>
        <Map
          defaultState={{ center: [55.751574, 37.573856], zoom: 13 }}
          className={`${s.cartaas} ${isGrayscale ? s.grayscale : ''}`}
          onClick={toggleGrayscale}
        >
          <Placemark geometry={[55.751574, 37.573856]} />
        </Map>
      </YMaps>
    </section>
  );
};

export default YandexMap;
