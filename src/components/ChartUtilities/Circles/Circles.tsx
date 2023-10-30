import classNames from "classnames";
import { CirclesProps } from "ts/types";
import styles from './Circles.module.scss';

const Circles = ({
  data,
  keyAccessor,
  xAccessor,
  yAccessor,
  radius = 8,
  className,
  onCircleClick
}: CirclesProps) => {
  return (
    <g>
      {
        data && data.map((d) => (
          <circle
            className={classNames(styles.circle, className)}
            key={keyAccessor(d)}
            cx={xAccessor(d)}
            cy={yAccessor(d)}
            r={radius}
            onClick={(e) => onCircleClick?.(e, d)}
          />
        ))
      }
    </g>
  )
}

export default Circles
