import classNames from 'classnames';
import { CirclesProps } from 'ts/types';
import styles from './Circles.module.scss';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';

const Circles = ({
  data,
  keyAccessor,
  xAccessor,
  yAccessor,
  radius = 8,
  className,
  onCircleClick,
  onClickAccessor,
  onCircleHover,
}: CirclesProps) => {
  const dimensions = useChartDimensions();
  return (
    <div
      style={{
        width: dimensions.boundedScrollWidth,
        height: dimensions.height,
        position: 'absolute',
        right: 0,
        left: 0,
        margin: 'auto',
      }}
    >
      <svg width="100%" height="100%">
        <g id="circles">
          {data &&
            data.map((d) => (
              <circle
                className={classNames(styles.circle, className)}
                key={keyAccessor(d)}
                cx={xAccessor(d)}
                cy={yAccessor(d) + 10}
                r={radius}
                onClick={() => {
                  if (onCircleClick && onClickAccessor)
                    onCircleClick(onClickAccessor(d));
                }}
                onMouseEnter={(e) => onCircleHover?.(e, d)}
              />
            ))}
        </g>
      </svg>
    </div>
  );
};

export default Circles;
