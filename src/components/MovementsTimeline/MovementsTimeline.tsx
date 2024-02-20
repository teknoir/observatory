import { useContext } from 'react';
import classNames from 'classnames';
import Divider from '@mui/material/Divider';
import { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { Chart, Circles } from 'components/ChartUtilities';
import { detectionIdAccessor } from 'components/ChartUtilities/accessors';
import { peripheralIdAccessor } from 'components/ChartUtilities/accessors';
import CarouselArrows from 'components/MovementsTimelineComponents/CarouselArrows/CarouselArrows';
import ToolBar from 'components/MovementsTimelineComponents/ToolBar/ToolBar';
import Popover from 'components/MovementsTimelineComponents/Popover/Popover';
import { HomeContext } from 'context/HomeContext/HomeContext';
import {
  AlertTypes,
  IAlertEvent,
  IEventDocumentWithPeripheral,
} from 'ts/types';
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
  filter: AlertTypes[];
  handleChangeFilter: (e: SelectChangeEvent<unknown>) => void;
  period: MovementsTimelinePeriod;
  handleChangePeriod: (e: SelectChangeEvent<unknown>) => void;
  isLoading: boolean;
  isFullHeight?: boolean;
  isFixToolbar?: boolean;
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
  isFullHeight,
  isFixToolbar = false,
}: MovementsTimeLineParams) => {
  const {
    dimensions,
    ref,
    scrollGroupRef,
    translateXPos,
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
      marginTop: isFixToolbar ? 20 : -20,
      marginLeft: 180,
      marginRight: 114,
    },
  });
  const { setMainImageCarousel } = useContext(HomeContext);
  const numberOfTicks = period === MovementsTimelinePeriod.DAYS_1 ? 24 : period;
  const toolbarProps = {
    filter,
    handleChangeFilter,
    period,
    handleChangePeriod,
  };

  return (
    <div
      className={classNames(styles.root, isFullHeight ? styles.fullHeight : '')}
    >
      {!isFixToolbar && <ToolBar {...toolbarProps} />}
      <div
        className={classNames(
          styles.areaBackground,
          isFixToolbar ? styles.fixedArea : styles.stickyArea
        )}
      >
        {isFixToolbar && <ToolBar {...toolbarProps} />}
        <Divider variant="fullWidth" />
        <div className={styles.timestamps}>
          <div style={{ width: dimensions.marginLeft }}>
            <Typography variant="LabelMedium">
              Cameras ({peripherals.length ?? 0})
            </Typography>
          </div>
          <svg width={dimensions.boundedWidth} height={24}>
            <g transform={`translate(${translateXPos}, 0)`}>
              <AxisHorizontalScroll
                scale={xScale}
                formatTick={formatDate}
                numberOfTicks={numberOfTicks}
                dimensions={dimensions}
              />
            </g>
          </svg>
          <div
            style={{
              width: dimensions.marginRight,
            }}
          ></div>
        </div>
      </div>
      <div
        ref={ref}
        className={styles.timeline}
        style={{
          display: peripherals.length > 0 ? 'block' : '',
          height: peripherals.length * 64 + 200,
          marginTop: isFixToolbar ? 80 : 0,
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
