import * as d3 from 'd3';
import Typography from '@mui/material/Typography';
import styleVariables from 'enums/styleVariables.module.scss';
import styles from './AxisTimestamps.module.scss';

type Accessor = (d: object) => number;

interface AxisTimestampsProps {
  data: { start_time: string }[] | undefined;
  keyAccessor: Accessor;
  yAccessor: Accessor;
}

const parseTime = d3.timeParse('%Y-%m-%dT%H:%M:%S%Z');
const formatDateByTime = d3.timeFormat('%-I:%M %p');

const AxisTimestamps = ({
  data,
  keyAccessor,
  yAccessor,
}: AxisTimestampsProps) => (
  <g>
    {data &&
      data.map((d) => (
        <foreignObject
          key={keyAccessor(d)}
          transform={`translate(${150 - 80}, ${yAccessor(d) - 12})`}
          width={1}
          height={1}
          className={styles.foreignObject}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '140px',
            }}
          >
            <div className={styles.text}>
              <Typography
                variant="BodySmall"
                style={{
                  backgroundColor: styleVariables.fadedBlack,
                }}
              >
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                {formatDateByTime(parseTime(d.start_time))}
              </Typography>
            </div>
          </div>
        </foreignObject>
      ))}
  </g>
);

export default AxisTimestamps;
