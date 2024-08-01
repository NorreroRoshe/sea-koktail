import cls from './GoodsCatalogue.module.scss';
import SectionHeader from '../common/section-header';
import { ISubcategory, ISiteCategory } from '@/settings/site-path-cathegory';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import Link from 'next/link';

export interface ICatalogCategories {
  sitePathCategory?: ISiteCategory;
}

export const GoodsTitleCategories: React.FC<ICatalogCategories> = ({ sitePathCategory }) => {
  const pathname = usePathname();
  console.log(sitePathCategory, 'title')

  // Ищем подкатегорию, которая соответствует текущему pathname
  const matchingSubcategory = sitePathCategory?.subcategories?.find(
    (subcategory) => pathname?.includes(subcategory.href)
  );

  // Если подкатегория найдена, используем её subName, иначе categoryName
  const categoryName = matchingSubcategory?.subName || '';
  const categoryImage = matchingSubcategory?.mainPhoto || '';
  const categoryhref = matchingSubcategory?.href || '';
  const categoryTypes = matchingSubcategory?.types || '';

  return (
    <>
      <div className={`${cls.catalogDepartmentCategories_title} ${cls.catalogDepartmentCategories}`}>
        <div className={cls.catalogCategoryCellsca}>
          <Link href={categoryhref + categoryTypes} className={`${cls.catalogCategoryCellLink} ${cls.catalogCategoryCellLink_title}`}>
            <div className={`${cls.catalogCategoryfegrhtrewcqwsaq} ${cls.catalogCategory_title}`}>
              <div className={`${cls.catalogCategoryImageContaineasfgewr} ${cls.catalogCategoryImageContainer_title}`}>
                <Image
                  width={200}
                  height={200}
                  src={categoryImage}
                  alt={categoryName}
                  draggable="false"
                  loading="lazy"
                  className={`${cls.lazyImg} ${cls.catalogCategoryImage}`}
                />
              </div>
            </div>
            <SectionHeader
              sectionHeading={`${categoryName}`}
              sectionSubHeading=""
              headingPosition="left"
              className={cls.cectionHeader_title}
            />
          </Link>
        </div>
        {/* ))} */}
      </div>
    </>
  );
}