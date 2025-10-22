'use client';

import { Link } from "react-router-dom";

import { FiSave } from 'react-icons/fi';
import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { useMedia } from '@core/hooks/use-media';
import { siteConfig } from '@/config/site.config';

interface FooterProps {
  className?: string;
}

export default function Header({ className }: FooterProps) {
  const isMobile = useMedia('(max-width: 767px)', false);
  return (
    <header
      className={cn(
        'flex w-full items-center justify-between px-4 py-5 md:h-20 md:px-5 lg:px-8 4xl:px-10',
        className
      )}
    >
      <Link to={'/'}>
        <img src={isMobile ? siteConfig.icon : siteConfig.logo}
          alt={siteConfig.title}
          className="invert"
          priority
            />
      </Link>
      <div className="flex items-center gap-2">
        <Button variant="text" className="text-white hover:enabled:text-white">
          Questions?
        </Button>
        <Button
          rounded="pill"
          variant="outline"
          className="gap-2 whitespace-nowrap border-white text-white hover:border-white hover:bg-white hover:text-black"
        >
          <FiSave className="h-4 w-4" />
          Save & Exit
        </Button>
      </div>
    </header>
  );
}
