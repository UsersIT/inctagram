/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['default', 'en', 'ru'],
    defaultLocale: 'default',
    localeDetection: false
  },
  //!! Чтобы отображать картинки в next тэге "Image", нужно указать домен в здесь в images
  images: {
    domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
};

export default nextConfig;
