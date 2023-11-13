import { ReactNode, useState } from 'react';
import { CarouselMode } from 'ts/types';
import { HomeContext } from './HomeContext';

const HomeDataProvider = ({ children }: { children: ReactNode }) => {
  const [mainImageCarousel, setMainImageCarousel] = useState('');
  const [layout, setLayout] = useState(CarouselMode.General);

  return (
    <HomeContext.Provider
      value={{ mainImageCarousel, setMainImageCarousel, layout, setLayout }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeDataProvider;
