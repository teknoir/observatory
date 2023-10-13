import { useState } from "react"
import classNames from "classnames";
import { CirclesProps } from "ts/types";
import styles from './Circles.module.scss';

const Circles = ({ data, keyAccessor, xAccessor, yAccessor, radius = 8, className }: CirclesProps) => {
  const [showTooltip, setShowTooltip] = useState({
    state: false,
    data: {}
  })
  return (
    <>
      {
        data && data.map((d, i) => (
          <g key={i}>
            <circle
              className={classNames(styles.circle, className)}
              key={keyAccessor(i)}
              cx={xAccessor(d, i)}
              cy={yAccessor(d, i)}
              r={radius}
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
          {JSON.stringify(showTooltip.data)}
        </text>
      }
    </>
  )
}

export default Circles
