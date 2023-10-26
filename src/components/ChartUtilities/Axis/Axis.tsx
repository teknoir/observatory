// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { Suspense, lazy } from "react"
import PropTypes from "prop-types"
import * as d3 from 'd3'
import { dimensionsPropsType } from "../utils";
import { useChartDimensions } from "../Chart/Chart";

const AxisHorizontal = lazy(() => import('./AxisHorizontal.tsx'));
const AxisVertical = lazy(() => import('./AxisVertical.tsx'));
const AxisHorizontalScroll = lazy(() => import('./AxisHorizontalScroll.tsx'));

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
    <Suspense fallback={null}>
      <Component {...props}
        dimensions={dimensions}
      />
    </Suspense>
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
