import { ReactNode, useState } from 'react';
import { mainImageCarouselContext } from './mainImageCarouselContext';

export const HomeDataProvider = ({ children }: { children: ReactNode }) => {
  const [mainImageCarousel, setMainImageCarousel] = useState('');

  return (
    <mainImageCarouselContext.Provider
      value={{ mainImageCarousel, setMainImageCarousel }}
    >
      {children}
    </mainImageCarouselContext.Provider>
  );
};
