import PropTypes from "prop-types"
import * as d3 from 'd3'
import { dimensionsPropsType } from "./utils";
import { useChartDimensions } from "./Chart";

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
}
const GridLines = ({ dimension, ...props }) => {
  const dimensions = useChartDimensions()
  const Component = axisComponentsByDimension[dimension]
  if (!Component) return null

  return (
    <Component {...props}
      dimensions={dimensions}
    />
  )
}

GridLines.propTypes = {
  dimension: PropTypes.oneOf(["x", "y"]),
  dimensions: dimensionsPropsType,
  scale: PropTypes.func,
  label: PropTypes.string,
  formatTick: PropTypes.func,
}

const formatNumber = d3.format(",")
GridLines.defaultProps = {
  dimension: "x",
  scale: null,
  formatTick: formatNumber,
}

export default GridLines


function AxisHorizontal({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks = dimensions.boundedWidth < 600
    ? dimensions.boundedWidth / 100
    : dimensions.boundedWidth / 250

  const ticks = scale.ticks(numberOfTicks)

  return (
    <g {...props}
      className="Axis AxisHorizontal"
      transform={`translate(0, ${dimensions.boundedHeight})`}
    >
      <line
        className="Axis__line"
        // x1, y1, y2 are 0, so there's no need to add them.
        x2={dimensions.boundedWidth}
      />
      {
        ticks.map((tick, i) => (
          <text
            key={tick}
            className="Axis__tick"
            transform={`translate(${scale(tick)}, 25)`}
          >
            {formatTick(tick)}
          </text>
        ))
      }
      {
        label && (
          <text
            className="Axis__label"
            transform={`translate(${dimensions.boundedWidth / 2}, 60)`}
          >
            {label}
          </text>
        )
      }
    </g>
  )
}

function AxisVertical({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks = dimensions.boundedHeight / 70
  // const ticks = scale.ticks(numberOfTicks)

  const ticks = scale.domain()

  return (
    <g className="Axis AxisVertical" {...props}>
      {
        ticks.map((tick, i) => (
          <line
            key={i}
            // className="Axis__line"
            style={{
              strokeWidth: 1,
              stroke: "darkgrey",
              strokeDasharray: 3,
            }}
            x2={dimensions.boundedWidth}
            transform={`translate(0, ${scale(tick)})`}
          />
        ))
      }
    </g>
  )
}

