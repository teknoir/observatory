import React from "react"
import PropTypes from "prop-types"
import * as d3 from 'd3'
import { dimensionsPropsType } from "./utils";
import { useChartDimensions } from "./Chart";

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
  xScroll: AxisHorizontalScroll,
}

const Axis = ({ dimension, ...props }) => {
  const dimensions = useChartDimensions()
  const Component = axisComponentsByDimension[dimension]
  if (!Component) return null

  return (
    <Component {...props}
      dimensions={dimensions}
    />
  )
}

Axis.propTypes = {
  dimension: PropTypes.oneOf(["x", "y", "xScroll"]),
  dimensions: dimensionsPropsType,
  scale: PropTypes.func,
  label: PropTypes.string,
  formatTick: PropTypes.func,
}

const formatNumber = d3.format(",")
Axis.defaultProps = {
  dimension: "x",
  scale: null,
  formatTick: formatNumber,
}

export default Axis

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

function AxisVertical({ dimensions, label, formatTick, scale, background, ...props }) {
  const numberOfTicks = dimensions.boundedHeight / 70
  // const ticks = scale.ticks(numberOfTicks)

  const ticks = scale.domain()

  return (
    <g className="Axis AxisVertical" {...props}>
      {/* TODO: Make this fill color come from a global variable */}
      {
        background &&
        <rect
          x={-dimensions.marginLeft}
          y="0"
          width={dimensions.marginLeft}
          height="100%"
          fill="#1C1C1C"
        />
      }
      <line
        className="Axis__line"
        // x1, x2, y1 are 0, so there's no need to add them.
        y2={dimensions.boundedHeight}
      />
      {
        ticks.map((tick, i) => (
          <text
            key={tick}
            className="Axis__tick"
            transform={`translate(-16, ${scale(tick)})`}
          >
            {formatTick ? tick : formatTick(tick)}
          </text>
        ))
      }
      {
        label && (
          <text
            className="Axis__label"
            transform={`translate(-56px, ${dimensions.boundedHeight / 2}px rotate(-90deg))`}
          >
            {label}
          </text>
        )
      }
    </g>
  )
}

function AxisHorizontalScroll({ dimensions, label, formatTick, scale, ...props }) {
  const numberOfTicks = dimensions.boundedScrollWidth < 600
    ? dimensions.boundedScrollWidth / 100
    : dimensions.boundedScrollWidth / 250

  const ticks = scale.ticks(numberOfTicks)

  return (
    <g {...props}
      className="Axis AxisHorizontal"
      transform={`translate(0, ${dimensions.boundedHeight})`}
    >
      <line
        className="Axis__line"
        // x1, y1, y2 are 0, so there's no need to add them.
        x2={dimensions.boundedScrollWidth}
      />
      {
        ticks.map((tick, i) => (
          <text
            key={tick}
            className="Axis__tick"
            transform={`translate(${scale(tick)}, 20)`}
          >
            <tspan>
              {formatTick(tick).split(",")[0]}
            </tspan>
            <tspan x={0} dy={15}>
              {formatTick(tick).split(",")[1]}
            </tspan>
          </text>
        ))
      }
      {
        label && (
          <text
            className="Axis__label"
            transform={`translate(${dimensions.boundedScrollWidth / 2}, 60)`}
          >
            {label}
          </text>
        )
      }
    </g>
  )
}
