import classNames from "classnames";
import { CirclesProps } from "ts/types";
import styles from './Circles.module.scss';
import { mainImageCarouselContext } from "context/homeContext";
import { useContext } from "react";

const Circles = ({ data, keyAccessor, xAccessor, yAccessor, radius = 8, className }: CirclesProps) => {
  const { setMainImageCarousel } = useContext(mainImageCarouselContext)
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
            onClick={() => setMainImageCarousel(d.peripheral_id)}
          />
        ))
      }
    </g>
  )
}

export default Circles
