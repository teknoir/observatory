import { createContext } from 'react';
import { MainImageCarouselContextProps } from 'ts/types';

export const mainImageCarouselContext = createContext<
  MainImageCarouselContextProps | undefined
>(undefined);
