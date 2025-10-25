// import logoImg from '/logo.svg';
// import logoIconImg from '/logo-short.svg';
import { Helmet } from 'react-helmet-async';
import { LAYOUT_OPTIONS } from '@/config/enums';

export enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Isomorphic - React Typescript Admin Dashboard Template',
  description: `Isomorphic the ultimate React TypeScript Admin Template. Streamline your admin dashboard development with our feature-rich, responsive, and highly customizable solution. Boost productivity and create stunning admin interfaces effortlessly.`,
  // logo: logoImg,
  // icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  url: 'https://isomorphic-furyroad.vercel.app',
  image:
    'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
};

/**
 * Komponen untuk mengatur meta tag (pengganti Metadata di Next.js)
 */
interface MetaObjectProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function MetaObject({
  title,
  description,
  image,
  url,
}: MetaObjectProps) {
  const pageTitle = title
    ? `${title} - Isomorphic Furyroad`
    : siteConfig.title;
  const pageDesc = description || siteConfig.description;
  const pageUrl = url || siteConfig.url;
  const pageImage = image || siteConfig.image;

  return (
    <Helmet>
      {/* Basic Meta */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />

      {/* Open Graph Meta */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content="Isomorphic Furyroad" />
      <meta property="og:image" content={pageImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />
    </Helmet>
  );
}
