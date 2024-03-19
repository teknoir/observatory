import { ReactNode } from 'react';
import { ChartDimensions } from 'ts/types';
import ChartContext from './ChartContext';
import { useMainLayoutContext } from 'context/mainLayoutContext';

interface ChartProps {
  dimensions: ChartDimensions;
  children: ReactNode;
}

const Chart = ({ dimensions, children }: ChartProps) => {
  const { isSmall } = useMainLayoutContext();
  return (
    <ChartContext.Provider value={dimensions}>
      <svg
        width={dimensions.width}
        height={isSmall ? dimensions.boundedScrollHeight : dimensions.height}
      >
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
};
export default Chart;
