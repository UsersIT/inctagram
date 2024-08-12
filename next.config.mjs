/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['default', 'en', 'ru'],
    defaultLocale: 'default',
    localeDetection: false
  },
  images: {
    domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
  },
};

export default nextConfig;
