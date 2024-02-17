import DetailsItem from 'components/MovementsTimelineVertical/DetailsItem/DetailsItem';
import styles from './AxisDetails.module.scss';

type Accessor = (d: object) => number;

interface AxisDetailsProps {
  data: { type: string }[] | undefined;
  keyAccessor: Accessor;
  yAccessor: Accessor;
}

const AxisDetails = ({ data, keyAccessor, yAccessor }: AxisDetailsProps) => {
  return (
    <g transform="translate(150, -30)">
      {data &&
        data.map((d) => (
          <foreignObject
            key={keyAccessor(d)}
            y={yAccessor(d)}
            width="100%"
            height={1}
            className={styles.foreignObject}
          >
            <DetailsItem data={d} />
          </foreignObject>
        ))}
    </g>
  );
};

export default AxisDetails;
