import { useContext, useRef, useState } from 'react';
import Divider from '@mui/material/Divider';
import { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { Chart, Circles } from 'components/ChartUtilities';
import { detectionIdAccessor } from 'components/ChartUtilities/accessors';
import { peripheralIdAccessor } from 'components/ChartUtilities/accessors';
import CarouselArrows from 'components/MovementsTimelineComponents/CarouselArrows/CarouselArrows';
import ToolBar from 'components/MovementsTimelineComponents/ToolBar/ToolBar';
import Popover from 'components/MovementsTimelineComponents/Popover/Popover';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { IAlertEvent, IEventDocumentWithPeripheral } from 'ts/types';
import useMovementsTimelineData from 'hooks/useMovementsTimelineData';
import AxisHorizontalScroll from './AxisHorizontalScroll/AxisHorizontalScroll';
import AxisVerticalLeft from './AxisVerticalLeft/AxisVerticalLeft';
import AxisVerticalRight from './AxisVerticalRight/AxisVerticalRight';
import GridLines from './GridLines/GridLines';
import { MovementsTimelinePeriod } from './enums';
import styles from './MovementsTimeline.module.scss';

interface MovementsTimeLineParams {
  startTime: Date;
  dataMotions: IEventDocumentWithPeripheral[];
  dataAlerts: IEventDocumentWithPeripheral[];
  xAccessor: (d: IAlertEvent) => Date | null;
  yAccessor: (d: object) => string;
  peripherals: Array<string>;
  ids: Array<string>;
  filter: string;
  handleChangeFilter: (e: SelectChangeEvent<unknown>) => void;
  period: MovementsTimelinePeriod;
  handleChangePeriod: (e: SelectChangeEvent<unknown>) => void;
  isLoading: boolean;
}

export const MovementsTimeline = ({
  startTime,
  dataMotions,
  dataAlerts,
  peripherals,
  ids,
  filter,
  handleChangeFilter,
  period,
  handleChangePeriod,
  isLoading,
}: MovementsTimeLineParams) => {
  const {
    dimensions,
    ref,
    scrollGroupRef,
    xScale,
    yScale,
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
    peripherals,
    period,
    initialDimensions: {
      marginLeft: 180,
      marginRight: 160,
    },
  });
  const { setMainImageCarousel } = useContext(HomeContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollYPos, setScrollYPos] = useState(0);
  const numberOfTicks = period === MovementsTimelinePeriod.DAYS_1 ? 24 : period;

  const onScroll = () => {
    const con = containerRef.current;
    if (con) {
      const verticalScrollPosition = con.scrollTop;
      setScrollYPos(verticalScrollPosition);
    }
  };

  return (
    <div className={styles.root} ref={containerRef} onScroll={onScroll}>
      <ToolBar
        filter={filter}
        handleChangeFilter={handleChangeFilter}
        period={period}
        handleChangePeriod={handleChangePeriod}
      />
      <Divider variant="middle" />
      <div
        className={styles.timeline}
        ref={ref}
        style={{
          height: peripherals.length * 64 + 200,
        }}
      >
        <Chart dimensions={dimensions}>
          <GridLines scale={yScale} />
          <g ref={scrollGroupRef}>
            <Circles
              data={dataMotions}
              keyAccessor={detectionIdAccessor}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              onCircleClick={setMainImageCarousel}
              onClickAccessor={peripheralIdAccessor}
              className={styles.circleMotion}
            />
            <Circles
              data={dataAlerts}
              keyAccessor={detectionIdAccessor}
              xAccessor={xAccessorScaled}
              yAccessor={yAccessorScaled}
              onCircleClick={setMainImageCarousel}
              onClickAccessor={peripheralIdAccessor}
              className={styles.circleAlert}
              onCircleHover={handlePopoverOpen}
            />
            <AxisHorizontalScroll
              scale={xScale}
              formatTick={formatDate}
              numberOfTicks={numberOfTicks}
              offsetY={scrollYPos}
            />
            <Popover
              anchorEl={anchorEl}
              alertInfo={alertInfo}
              handleClose={handlePopoverClose}
            />
          </g>
          <CarouselArrows
            leftBtnHeight={dimensions.boundedHeight}
            rightX={dimensions.boundedWidth - 56}
            rightBtnHeight={dimensions.boundedHeight}
            clickHandler={handleCarouselArrows}
          />
          <AxisVerticalLeft scale={yScale} />
          <AxisVerticalRight scale={yScale} ids={ids} />
        </Chart>
      </div>
      {isLoading && <CircularProgress isAbsolute />}
    </div>
  );
};
