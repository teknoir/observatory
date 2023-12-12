import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { useChartDimensions } from 'components/ChartUtilities/Chart/ChartContext';
import { CarouselArrowsOptions } from 'ts/types';
import styles from './CarouselArrows.module.scss';

interface CarouselArrowsProps {
  clickHandler: (d: CarouselArrowsOptions) => void;
}

const CarouselArrows = ({ clickHandler }: CarouselArrowsProps) => {
  const dimensions = useChartDimensions();

  return (
    <>
      <foreignObject
        x={-dimensions.marginLeft}
        y={-dimensions.height / 2}
        width={1}
        height={1}
        className={styles.foreignObject}
      >
        <button
          style={{ height: dimensions.height }}
          className={styles.button}
          onClick={() => clickHandler(CarouselArrowsOptions.LEFT)}
        >
          <ArrowBackIos />
        </button>
      </foreignObject>
      <foreignObject
        x={dimensions.boundedWidth + dimensions.marginRight / 2}
        y={-dimensions.height / 2}
        width={1}
        height={1}
        className={styles.foreignObject}
      >
        <button
          style={{ height: dimensions.height }}
          className={styles.button}
          onClick={() => clickHandler(CarouselArrowsOptions.RIGHT)}
        >
          <ArrowForwardIos />
        </button>
      </foreignObject>
    </>
  );
};

export default CarouselArrows;
