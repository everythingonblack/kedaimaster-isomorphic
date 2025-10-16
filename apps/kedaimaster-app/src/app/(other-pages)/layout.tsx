'use client';


import { Link } from "react-router-dom";
import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import SocialItems from '@core/ui/social-shares';
import { useLocation, useNavigate } from 'react-router-dom';
import { siteConfig } from '@/config/site.config';
import { routes } from '@/config/routes';

const ignoreBackButtonRoutes = [routes.accessDenied, routes.notFound];

export default function OtherPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { back } = useNavigate();
  const pathName = useLocation();
  let notIn = !ignoreBackButtonRoutes.includes(pathName);
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-gray-50">
      {/* sticky top header  */}
      <div className="sticky top-0 z-40 px-6 py-5 backdrop-blur-lg lg:backdrop-blur-none xl:px-10 xl:py-8">
        <div
          className={cn(
            'mx-auto flex max-w-[1520px] items-center',
            notIn ? 'justify-between' : 'justify-center'
          )}
        >
          <Link to={'/'}>
            <img src={siteConfig.logo}
              alt={siteConfig.title}
              className="dark:invert"
              priority
                />
          </Link>
          {notIn && (
            <Button
              variant="outline"
              size="sm"
              className="md:h-10 md:px-4 md:text-base"
              onClick={() => back()}
            >
              Go to home
            </Button>
          )}
        </div>
      </div>
      {children}
      <SocialItems />
    </div>
  );
}
