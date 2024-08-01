import Image from 'next/image';
import cn from 'classnames';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import cls from './Ui.module.scss';
import { siteSettings } from '@/settings/site-settings';
// import logos from "../../assets/img/Buttlogo.png"
// import logoC from "../../assets/img/logocrown.png"
import logoC from "../../assets/img/logo.svg"
import logoCa from "../../assets/img/polulogo.svg"

const Logo: React.FC<React.AnchorHTMLAttributes<{}>> = ({
  className,
  href = siteSettings.logo.href,
  ...props
}) => {

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
      setIsLargeScreen(window.innerWidth > 1200);
    }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1200);
    };

    // Set initial screen size
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Link
      href={href}
      className={cn('inline-flex focus:outline-none', className)}
      {...props}
    >
      {isLargeScreen ? (
        <h2 className={cls.logo_main}>
          <Image
            src={logoC}
            alt={siteSettings.logo.alt}
            loading="eager"
          />
        </h2>
      ) : (
        <h2 className={cls.logo_main_a}>
          <Image
            src={logoCa}
            alt={siteSettings.logo.alt}
            loading="eager"
          />
        </h2>
      )}
      
      {/* <Image
        src={logos}
        alt={siteSettings.logo.alt}
        // height={siteSettings.logo.height}
        // width={siteSettings.logo.width}
        height={79px}
        width={332px}
        // layout="fixed"
        loading="eager"
      /> */}
    </Link>
  );
};

export default Logo;
