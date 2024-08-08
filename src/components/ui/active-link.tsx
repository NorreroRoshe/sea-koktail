// import { usePathname } from 'next/navigation';
// import Link from 'next/link';
// import React, { Children } from 'react';

// const ActiveLink = ({ children, activeClassName, href, ...props }: any) => {
//   const pathname = usePathname();
//   const child = Children.only(children);
//   const childClassName = child.props.className || '';

//   const className =
//     pathname === href
//       ? `${childClassName} ${activeClassName}`.trim()
//       : childClassName;


//       console.log(href,'breadcrumbs')

//   return (
//     <Link href={href} {...props}>
//       {React.cloneElement(child, {
//         className: className || null,
//       })}
//     </Link>
//   );
// };

// export default ActiveLink;

"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React, { Children } from 'react';

const ActiveLink = ({ children, activeClassName, href, ...props }: any) => {
  const pathname = usePathname();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  // Check if href is equal to '/ProductiOnline' or '/Restaurant' and change accordingly
  let modifiedHref;
  if (href === '/ProductiOnline') {
    modifiedHref = '/ProductiOnline?ProductTypes=2&Page=0';
  } else if (href === '/Restaurant') {
    modifiedHref = '/ProductiOnline?ProductTypes=1&Category=518&Page=0';
  } else {
    modifiedHref = href;
  }

  const className =
    pathname === modifiedHref
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;

  console.log(modifiedHref, 'breadcrumbs');

  return (
    <Link href={modifiedHref} {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};

export default ActiveLink;
