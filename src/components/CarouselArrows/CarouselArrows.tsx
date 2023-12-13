import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { CarouselArrowsOptions } from 'ts/types';
import styles from './CarouselArrows.module.scss';

interface CarouselArrowsProps {
  leftX?: number;
  leftY?: number;
  leftBtnHeight?: number;
  rightX?: number;
  rightY?: number;
  rightBtnHeight?: number;
  clickHandler: (d: CarouselArrowsOptions) => void;
}

const CarouselArrows = ({
  leftX = 0,
  leftY = 0,
  leftBtnHeight = 0,
  rightX = 0,
  rightY = 0,
  rightBtnHeight = 0,
  clickHandler,
}: CarouselArrowsProps) => {
  return (
    <>
      <foreignObject
        x={leftX}
        y={leftY}
        width={1}
        height={1}
        className={styles.foreignObject}
      >
        <button
          style={{ height: leftBtnHeight }}
          className={styles.button}
          onClick={() => clickHandler(CarouselArrowsOptions.LEFT)}
        >
          <ArrowBackIos />
        </button>
      </foreignObject>
      <foreignObject
        x={rightX}
        y={rightY}
        width={1}
        height={1}
        className={styles.foreignObject}
      >
        <button
          style={{ height: rightBtnHeight }}
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
