import { ReactNode } from 'react';
import { ChartDimensions } from 'ts/types';
import ChartContext from './ChartContext';

interface ChartProps {
  dimensions: ChartDimensions;
  children: ReactNode;
}

const Chart = ({ dimensions, children }: ChartProps) => (
  <ChartContext.Provider value={dimensions}>
    <svg width={dimensions.width} height={dimensions.boundedScrollHeight}>
      <g
        transform={`translate(
        ${dimensions.marginLeft},
        ${dimensions.marginTop}
      )`}
      >
        {children}
      </g>
    </svg>
  </ChartContext.Provider>
);

export default Chart;
