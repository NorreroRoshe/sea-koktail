// import pkg from './next-i18next.config.js';

// // You can remove the following 2 lines when integrating our example.
// import { loadCustomBuildParams } from './next-utils.config.js';
// const { esmExternals = false, tsconfigPath } = loadCustomBuildParams();

// const { i18n } = pkg;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     esmExternals, // https://nextjs.org/blog/next-11-1#es-modules-support
//   },
//   i18n,
//   reactStrictMode: false,
//   typescript: {
//     tsconfigPath,
//   },
// };

// export default nextConfig;



// You can remove the following 2 lines when integrating our example.
import { loadCustomBuildParams } from './next-utils.config.js';
const { esmExternals = false, tsconfigPath } = loadCustomBuildParams();


/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals, // https://nextjs.org/blog/next-11-1#es-modules-support
  },
  reactStrictMode: false,
  typescript: {
    tsconfigPath,
  },
};

export default nextConfig;