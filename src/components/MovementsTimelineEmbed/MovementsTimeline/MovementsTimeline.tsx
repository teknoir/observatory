import moment from 'moment/moment';
import CarouselArrows from 'components/MovementsTimelineComponents/CarouselArrows/CarouselArrows';
import { Chart, Circles } from 'components/ChartUtilities';
import { detectionIdAccessor } from 'components/ChartUtilities/accessors';
import Popover from 'components/MovementsTimelineComponents/Popover/Popover';
import { IEventDocumentWithPeripheral } from 'ts/types';
import useMovementsTimelineData from 'hooks/useMovementsTimelineData';
import AxisHorizontalScroll from './AxisHorizontalScroll/AxisHorizontalScroll';
import GridLines from './GridLines/GridLines';
import styles from './MovementsTimeline.module.scss';

interface MovementsTimelineProps {
  dataMotions: IEventDocumentWithPeripheral[];
  dataAlerts: IEventDocumentWithPeripheral[];
}

const MovementsTimeline = ({
  dataMotions,
  dataAlerts,
}: MovementsTimelineProps) => {
  const period = 1;
  const startTime = moment().subtract(period, 'days').toDate();
  const numberOfTicks = 24;

  const {
    dimensions,
    ref,
    scrollGroupRef,
    xScale,
    xAccessorScaled,
    yAccessorScaled,
    formatDate,
    anchorEl,
    alertInfo,
    handlePopoverOpen,
    handlePopoverClose,
    handleCarouselArrows,
  } = useMovementsTimelineData({
    startTime,
    peripherals: ['test'],
    period,
  });

  return (
    <div className={styles.timeline} ref={ref}>
      <Chart dimensions={dimensions}>
        <GridLines />
        <g ref={scrollGroupRef}>
          <AxisHorizontalScroll
            scale={xScale}
            formatTick={formatDate}
            numberOfTicks={numberOfTicks}
          />
          <Circles
            data={dataMotions}
            keyAccessor={detectionIdAccessor}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
            className={styles.circleMotion}
          />
          <Circles
            data={dataAlerts}
            keyAccessor={detectionIdAccessor}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
            className={styles.circleAlert}
            onCircleHover={handlePopoverOpen}
          />
          <Popover
            anchorEl={anchorEl}
            alertInfo={alertInfo}
            handleClose={handlePopoverClose}
          />
        </g>
        <CarouselArrows
          leftX={-dimensions.marginLeft}
          leftY={-dimensions.height / 2}
          leftBtnHeight={dimensions.height}
          rightX={dimensions.boundedWidth + dimensions.marginRight / 2}
          rightY={-dimensions.height / 2}
          rightBtnHeight={dimensions.height}
          clickHandler={handleCarouselArrows}
        />
      </Chart>
    </div>
  );
};

export default MovementsTimeline;
