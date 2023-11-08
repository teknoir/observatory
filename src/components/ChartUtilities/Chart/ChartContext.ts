
import { createContext, useContext } from 'react';

const ChartContext = createContext(null);

export const useChartDimensions = () => useContext(ChartContext);

export default ChartContext;
