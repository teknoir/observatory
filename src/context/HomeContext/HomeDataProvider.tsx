import { ReactNode, useState } from 'react';
import { CarouselMode } from 'ts/types';
import { HomeContext } from './HomeContext';

const HomeDataProvider = ({ children }: { children: ReactNode }) => {
  const [mainImageCarousel, setMainImageCarousel] = useState('');
  const [layout, setLayout] = useState(CarouselMode.General);
  const [numCameras, setNumCameras] = useState(0);
  const [peripheralIdNotified, setPeripheralIdNotified] = useState('');

  return (
    <HomeContext.Provider
      value={{
        mainImageCarousel,
        setMainImageCarousel,
        layout,
        setLayout,
        numCameras,
        setNumCameras,
        peripheralIdNotified,
        setPeripheralIdNotified,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeDataProvider;
