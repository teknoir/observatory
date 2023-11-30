import { createContext, useContext } from 'react';
import { ChartDimensions } from 'ts/types';

const ChartContext = createContext({} as ChartDimensions);

export const useChartDimensions = () =>
  useContext<ChartDimensions>(ChartContext);

export default ChartContext;
