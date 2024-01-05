import { SelectChangeEvent } from '@mui/material/Select';
import CarouselArrows from 'components/MovementsTimelines/components/CarouselArrows/CarouselArrows';
import { Chart, Circles } from 'components/ChartUtilities';
import { detectionIdAccessor } from 'components/ChartUtilities/accessors';
import { MovementsTimelinePeriod } from 'components/MovementsTimelines/enums';
import Popover from 'components/MovementsTimelines/components/Popover/Popover';
import ToolBar from 'components/MovementsTimelines/components/ToolBar/ToolBar';
import { IEventDocumentWithPeripheral } from 'ts/types';
import useMovementsTimelineData from 'components/MovementsTimelines/hooks/useMovementsTimelineData';
import AxisHorizontalScroll from '../AxisHorizontalScroll/AxisHorizontalScroll';
import GridLines from '../GridLines/GridLines';
import styleVariables from 'enums/styleVariables.module.scss';
import styles from './MovementsTimeline.module.scss';

interface MovementsTimelineProps {
  startTime: Date;
  dataMotions: IEventDocumentWithPeripheral[];
  dataAlerts: IEventDocumentWithPeripheral[];
  showToolbar?: boolean;
  filter: string;
  handleChangeFilter: (e: SelectChangeEvent<unknown>) => void;
  period: MovementsTimelinePeriod;
  handleChangePeriod: (e: SelectChangeEvent<unknown>) => void;
}

const MovementsTimeline = ({
  startTime,
  dataMotions,
  dataAlerts,
  showToolbar,
  handleChangeFilter,
  filter,
  period,
  handleChangePeriod,
}: MovementsTimelineProps) => {
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
  const numberOfTicks = period === MovementsTimelinePeriod.DAYS_1 ? 24 : period;

  return (
    <>
      {showToolbar && (
        <ToolBar
          filter={filter}
          handleChangeFilter={handleChangeFilter}
          period={period}
          handleChangePeriod={handleChangePeriod}
        />
      )}
      <div
        className={styles.timeline}
        ref={ref}
        style={{
          height: showToolbar
            ? '156px'
            : styleVariables.movementsTimelineEmbedHeight,
        }}
      >
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
    </>
  );
};

export default MovementsTimeline;
