"use client"
import Link from 'next/link';
import { LinkProps } from 'next/link';
import Image from 'next/image';
import SectionHeader from '../common/section-header';
import cls from '../GoodsCatalogue/GoodsCatalogue.module.scss';
import { ISubcategory } from '@/settings/site-path-cathegory';

interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
  className?: string;
  thumbnailClassName?: string;
  href: LinkProps['href'];
  bundle: ISubcategory;
  // {
  //   subName?: string;
  //   href?: string;
  //   types?: string;
  //   mainPhoto?: any;
  // };
}

const BundleCardCategory: React.FC<Props> = ({
  bundle,
}) => {

  console.log(bundle,'data.subcategories')

  // const { image, title, description } = bundle;
  return (
    <>
      <div className={cls.catalogDepartmentCategories}>
        {/* {bundle.map((subcategory: ISubcategory, index: number) => ( */}
          <div className={cls.catalogCategoryCellsca}>
            <Link href={bundle.href + bundle.types} className={cls.catalogCategoryCellLink}>
              <div className={`${cls.catalogCategoryfegrhtrewq} ${cls.catalogCategoryveqwd}`}>
                <div className={cls.catalogCategoryImageContainer}>
                  <Image
                    width={200}
                    height={200}
                    src={bundle.mainPhoto}
                    alt={bundle.subName}
                    draggable="false"
                    loading="lazy"
                    className={`${cls.lazyImg} ${cls.catalogCategoryImage}`}
                  />
                </div>
                <div className={`${cls.catalogCategoryTitleWrapper} ${cls.catalogCategoryTitleWrappercevw}`}>
                  <h3 className={`${cls.catalogCategoryTitle} ${cls.catalogCategoryTitleeweb}`}>{bundle.subName}</h3>
                </div>
              </div>
            </Link>
          </div>
        {/* ))} */}
      </div>
    </>
          
  );
};

export default BundleCardCategory;
