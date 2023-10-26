// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Suspense, lazy } from "react";
import PropTypes from "prop-types"
import * as d3 from 'd3'
import { dimensionsPropsType } from "../utils";
import { useChartDimensions } from "../Chart/Chart";

const GridLineHorizontal = lazy(() => import('./GridLineHorizontal.tsx'));
const GridLineVertical = lazy(() => import('./GridLineVertical.tsx'));

const gridLineComponentsByDimension = {
  x: GridLineHorizontal,
  y: GridLineVertical,
}

const GridLines = ({ dimension, ...props }) => {
  const dimensions = useChartDimensions()
  const Component = gridLineComponentsByDimension[dimension]
  if (!Component) return null

  return (
    <Suspense fallback={null}>
      <Component {...props}
        dimensions={dimensions}
      />
    </Suspense>
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

