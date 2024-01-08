// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import ChartContext from './ChartContext';

const Chart = ({ dimensions, children }) => (
  <ChartContext.Provider value={dimensions}>
    {/* <svg id="chart_svg" width={dimensions.width} height={dimensions.height}>
      <g
        id="chart_g"
        transform={`translate(
        ${dimensions.marginLeft},
        ${dimensions.marginTop}
      )`}
      >
        {children}
      </g>
    </svg> */}
    <div
      id="chart_div1"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        position: 'relative',
      }}
    >
      {/* <div
        id="chart_div2"
        style={
          { */}
      {/* transform: `translate(${dimensions.marginLeft}, ${dimensions.marginTop})`, */}
      {/* }
        }
      > */}
      {children}
      {/* </div> */}
    </div>
  </ChartContext.Provider>
);

export default Chart;
