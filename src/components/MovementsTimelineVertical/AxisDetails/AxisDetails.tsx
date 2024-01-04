import Typography from '@mui/material/Typography';
import styles from './AxisDetails.module.scss';

type Accessor = (d: object) => number | undefined;

interface AxisDetailsProps {
  data: { type: string }[] | undefined;
  keyAccessor: Accessor;
  yAccessor: Accessor;
}

const AxisDetails = ({ data, keyAccessor, yAccessor }: AxisDetailsProps) => {
  return (
    <g>
      {data &&
        data.map((d) => (
          <foreignObject
            key={keyAccessor(d)}
            transform={`translate(300, ${yAccessor(d)} )`}
            width={1}
            height={1}
            className={styles.foreignObject}
          >
            <div className={styles.text}>
              <Typography variant="BodySmall">
                Detection Type: {d.type}
              </Typography>
            </div>
          </foreignObject>
        ))}
    </g>
  );
};

export default AxisDetails;
