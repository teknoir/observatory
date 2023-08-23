import { useState } from "react"
import PropTypes from "prop-types"
import { accessorPropsType } from "./utils"

const Circles = ({ data, keyAccessor, xAccessor, yAccessor, radius }) => {
  const [showTooltip, setShowTooltip] = useState({
    state: false,
    data: {}
  })
  return (
    <>
      {
        data.map((d, i) => (
          <g key={i}>
            <circle
              className={`Circles__circle__${d.detectionType.toLowerCase()}`}
              key={keyAccessor(i)}
              cx={xAccessor(d, i)}
              cy={yAccessor(d, i) + (d.detectionType === "Motion" ? 5 : 0) - (d.detectionType === "Detection" ? 5 : 0)}
              r={typeof radius == "function" ? radius(d) : radius}
              onMouseEnter={() => setShowTooltip({ state: true, data: d })}
              onMouseLeave={() => setShowTooltip({ state: false, data: d })}
            />
          </g>
        ))
      }
      {
        showTooltip.state &&
        <text
          x={xAccessor(showTooltip.data) + radius + 5}
          y={yAccessor(showTooltip.data) - radius - 5}
        >
          {showTooltip.data.id}
        </text>
      }
    </>
  )
}

Circles.propTypes = {
  data: PropTypes.array,
  keyAccessor: accessorPropsType,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  radius: accessorPropsType,
}

Circles.defaultProps = {
  radius: 8
}

export default Circles
