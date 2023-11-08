// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import ChartContext from './ChartContext';
import styles from './Chart.module.scss';

const Chart = ({ dimensions, children }) => (
  <ChartContext.Provider value={dimensions}>
    <svg
      className={styles.Chart}
      width={dimensions.width}
      height={dimensions.height}
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

export default Chart;
