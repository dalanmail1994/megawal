/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flagcdn.com"], // אם אתה טוען דגלים מבחוץ
  },
  eslint: {
    ignoreDuringBuilds: true, // מבטל את ה-errors של ESLint בזמן build
  },
  reactStrictMode: true, // אופציונלי, אבל טוב לפיתוח
};

export default nextConfig;
