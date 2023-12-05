import { createContext } from 'react';
import { CarouselMode, HomeContextProps } from 'ts/types';

export const HomeContext = createContext<HomeContextProps>({
  mainImageCarousel: '',
  setMainImageCarousel: () => '',
  layout: CarouselMode.General,
  setLayout: () => CarouselMode,
  numCameras: 0,
  setNumCameras: () => 0,
  peripheralIdNotified: '',
  setPeripheralIdNotified: () => '',
});
