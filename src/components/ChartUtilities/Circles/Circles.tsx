import classNames from "classnames";
import { Tooltip, Typography } from "@mui/material";
import { CirclesProps } from "ts/types";
import styles from './Circles.module.scss';

const Circles = ({ data, keyAccessor, xAccessor, yAccessor, radius = 8, className }: CirclesProps) => {
  return (
    <>
      {
        data && data.map((d, i) => (
          <Tooltip
            title={
              <div>
                <Typography color="inherit">Theft alert - Low</Typography>
              </div>
            }
            key={i}
          >
            <g>
              <circle
                className={classNames(styles.circle, className)}
                key={keyAccessor(i)}
                cx={xAccessor(d, i)}
                cy={yAccessor(d, i)}
                r={radius}
              />
            </g>
          </Tooltip>
        ))
      }
    </>
  )
}

export default Circles
