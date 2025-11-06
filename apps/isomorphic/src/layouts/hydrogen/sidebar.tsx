'use client';

import Logo from '@core/components/logo';
import cn from '@core/utils/class-names';
import {Link, useLocation} from 'react-router-dom';
import { SidebarMenu } from './sidebar-menu';
import { bottomMenuItems } from './menu-items';
import { Fragment } from 'react';
import { Title } from 'rizzui/typography';

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        'fixed bottom-0 start-0 z-50 h-full w-[270px] border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 2xl:w-72',
        className
      )}
    >
      <div className="sticky top-0 z-40 bg-gray-0/10 px-6 pb-5 pt-5 dark:bg-gray-100/5 2xl:px-8 2xl:pt-6">
        <div
          aria-label="Site Logo"
          className="text-gray-800 hover:text-gray-900"
        >
          <Logo className="max-w-[155px]" />
        </div>
      </div>

      <div className="custom-scrollbar h-[calc(100%-80px)] overflow-y-auto">
        <SidebarMenu />
      </div>

      <div className="sticky bottom-0 z-40 bg-gray-0/10 px-6 pt-5 pb-5 dark:bg-gray-100/5 2xl:px-8 2xl:pb-6">
        {bottomMenuItems.map((item, index) => {
          const location = useLocation();
          const pathname = location.pathname;
          const isActive = pathname === item?.href;
          return (
            <Fragment key={item.name + '-' + index}>
              {item?.href ? (
                <Link
                  to={item.href}
                  className={cn(
                    'group relative mx-0 my-0.5 flex items-center rounded-md px-0 py-2 font-medium capitalize lg:my-1 2xl:mx-0 2xl:my-2',
                    isActive
                      ? 'before:top-2/5 text-primary before:absolute before:-start-3 before:block before:h-4/5 before:w-1 before:rounded-ee-md before:rounded-se-md before:bg-primary 2xl:before:-start-5'
                      : 'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                  )}
                >
                  <div className="flex items-center">
                    {item?.icon && (
                      <span
                        className={cn(
                          'me-2 inline-flex size-5 items-center justify-center rounded-md [&>svg]:size-5',
                          isActive
                            ? 'text-primary'
                            : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                        )}
                      >
                        {item.icon}
                      </span>
                    )}
                    <span>{item.name}</span>
                  </div>
                </Link>
              ) : (
                <Title
                  as="h6"
                  className={cn(
                    'mb-2 px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8',
                    index !== 0 && 'mt-6 3xl:mt-7'
                  )}
                >
                  {item.name}
                </Title>
              )}
            </Fragment>
          );
        })}
      </div>
    </aside>
  );
}
