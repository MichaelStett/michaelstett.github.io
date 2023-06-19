import React, { RefObject } from "react";
import { Location, NavigateFunction } from "react-router-dom";

import { BreadcrumbProps } from "../../types/BreadcrumbTypes";

interface BreadcrumbPresentationProps extends BreadcrumbProps {
  navigate: NavigateFunction;
  location: Location;
  isScrolled: boolean;
  elementRef: RefObject<HTMLDivElement>;
}

const trimBreadcrumbName = (name: string) => name.length > 40 ? `${name.substring(0, 37)}...` : name;

const BreadcrumbPresentation: React.FC<BreadcrumbPresentationProps> = ({
  breadcrumbList,
  navigate,
  location,
  isScrolled,
  elementRef,
})  => (
    <div 
      ref={elementRef} 
      className={`${isScrolled ? 'rounded-bl-lg rounded-br-lg' : 'rounded-lg'} sticky top-0 z-10 text-sm sm:text-base md:text-lg px-4 py-4 mx-auto w-full border border-gray-400 border-solid bg-white`}
    >
      {breadcrumbList.map((item, index) => {
        const isLastItem = index === breadcrumbList.length - 1;
        const breadcrumbPathNotEmpty = item.breadcrumb.path !== '';

        console.log(item.breadcrumb.name)
        return (
          <span key={index}>
            <a 
              onClick={() => location.pathname === item.breadcrumb.path || !breadcrumbPathNotEmpty ? null : navigate(item.breadcrumb.path)}
              className={breadcrumbPathNotEmpty ? 'cursor-pointer' : ''}
            >
              {trimBreadcrumbName(item.breadcrumb.name)}
            </a>
            {!isLastItem && <span> / </span>}
          </span>
        );
      })}
    </div>
  );
  
  export default BreadcrumbPresentation;
