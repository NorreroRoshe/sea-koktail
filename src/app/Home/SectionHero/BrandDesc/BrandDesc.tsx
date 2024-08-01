"use client"
import cls from './BrandDesc.module.scss';

export const BrandDesc: React.FC = () => {
  return (
    <article className={cls.main_text}>
      <div className={cls.old_container}>
        <h1>
          Butterfly Lighting Company - это <span>место, где вы найдете</span> самые современные и
          стильные люстры для вашего дома!
        </h1>
        <p>
          Мы специализируемся на производстве высококачественных люстр, которые станут настоящим
          украшением вашего интерьера.
        </p>
        <p>
          Наша компания предлагает широкий выбор люстр различных стилей и размеров, чтобы
          удовлетворить потребности каждого клиента. Мы используем только лучшие материалы и
          технологии, чтобы гарантировать долговечность и надежность наших изделий.
        </p>
      </div>
    </article>
  );
};

export default BrandDesc;
