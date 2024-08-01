'use client'
import Link from 'next/link';
import React from 'react';
import {observer} from "mobx-react";

interface Props {
  href: string;
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
  children: string;
}

const AuthMenu: React.FC<Props> = observer(({
  isAuthorized,
  href,
  btnProps,
  children,
}) => {
  console.log(isAuthorized,'isAuthorized')

  return isAuthorized ? (
    <Link
      href={href}
      className="text-sm lg:text-15px text-skin-base font-normal focus:outline-none ms-2"
    >
      {children}
    </Link>
  ) : (
    <button
      className="text-sm lg:text-15px text-skin-base font-normal focus:outline-none ms-2"
      aria-label="Authentication"
      {...btnProps}
    />
  );
});

export default AuthMenu;
