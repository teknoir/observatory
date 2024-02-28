import { createContext } from 'react';
import { DisplaySettingsContextProps } from 'ts/types';

export const DisplaySettingsContext =
  createContext<DisplaySettingsContextProps>({
    boundaryBoxesChecked: true,
    setBoundaryBoxesChecked: () => true,
    objectLabelsChecked: true,
    setObjectLabelsChecked: () => true,
    colorFillBoxesChecked: true,
    setColorFillBoxesChecked: () => true,
  });
