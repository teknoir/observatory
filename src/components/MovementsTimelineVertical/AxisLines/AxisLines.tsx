import classNames from 'classnames';
import styles from './AxisLines.module.scss';

type Accessor = (d: object) => number;

interface AxisTimestampsProps {
  data: { start_time: string }[] | undefined;
  keyAccessor: Accessor;
  yAccessor: Accessor;
  className?: string;
}

const AxisLines = ({
  data,
  keyAccessor,
  yAccessor,
  className,
}: AxisTimestampsProps) => (
  <g>
    {data &&
      data.map((d) => (
        <foreignObject
          key={keyAccessor(d)}
          transform={`translate(53, ${yAccessor(d)})`}
          width={1}
          height={1}
          className={styles.foreignObject}
        >
          <div className={classNames(styles.line, className)} />
        </foreignObject>
      ))}
  </g>
);

export default AxisLines;
