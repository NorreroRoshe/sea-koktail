import Image from 'next/image';
import cn from 'classnames';
import Link from 'next/link';
import cls from './Ui.module.scss';
import { siteSettings } from '@/settings/site-settings';
import logoC from "../../assets/img/polulogo.svg"

const Polulogo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  href = siteSettings.logo.href,
  ...props
}) => {
  return (
    <Link
      href={href}
      className={cn('inline-flex focus:outline-none', className)}
      {...props}
    >
      <h2 className={`${cls.logo_main} ${cls.logo_main_polu}`}>
        <img
        src={logoC.src}
        alt={siteSettings.logo.alt}
        loading="eager"
        />
      </h2>
    </Link>
  );
};

export default Polulogo;
