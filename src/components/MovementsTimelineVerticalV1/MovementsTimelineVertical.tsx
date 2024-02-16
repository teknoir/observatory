import { useContext } from 'react';
import Divider from '@mui/material/Divider';
import { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { Chart, Circles } from 'components/ChartUtilities';
import { detectionIdAccessor } from 'components/ChartUtilities/accessors';
import { peripheralIdAccessor } from 'components/ChartUtilities/accessors';
import ToolBar from 'components/MovementsTimelineComponents/ToolBar/ToolBar';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { IAlertEvent, IEventDocumentWithPeripheral } from 'ts/types';
import useMovementsTimelineDataVertical from 'hooks/useMovementsTimelineDataVertical';
import AxisDetails from './AxisDetails/AxisDetails';
import AxisLines from './AxisLines/AxisLines';
import AxisTimestamps from './AxisTimestamps/AxisTimestamps';
import GridLines from './GridLines/GridLines';
import { MovementsTimelinePeriod } from './enums';
import styles from './MovementsTimelineVertical.module.scss';

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

export const MovementsTimelineVertical = ({
  startTime,
  dataMotions,
  dataAlerts,
  peripherals,
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
    handlePopoverOpen,
  } = useMovementsTimelineDataVertical({
    startTime,
    peripherals,
    period,
  });
  const { setMainImageCarousel } = useContext(HomeContext);
  const numberOfTicks = period * 24 * 4; // 4 ticks per hour = 15 minutes per tick

  return (
    <div className={styles.root}>
      <ToolBar
        filter={filter}
        handleChangeFilter={handleChangeFilter}
        period={period}
        handleChangePeriod={handleChangePeriod}
      />
      <Divider variant="middle" />
      <div className={styles.timeline} ref={ref}>
        <Chart dimensions={dimensions}>
          <GridLines scale={yScale} />
          <g ref={scrollGroupRef}>
            <AxisTimestamps
              scale={xScale}
              formatTick={formatDate}
              numberOfTicks={numberOfTicks}
              dimensions={dimensions}
            />
            <AxisLines
              data={dataMotions}
              keyAccessor={detectionIdAccessor}
              yAccessor={xAccessorScaled}
              className={styles.lineMotion}
            />
            <AxisLines
              data={dataAlerts}
              keyAccessor={detectionIdAccessor}
              yAccessor={xAccessorScaled}
              className={styles.lineAlert}
            />
            <Circles
              data={dataMotions}
              keyAccessor={detectionIdAccessor}
              xAccessor={yAccessorScaled}
              yAccessor={xAccessorScaled}
              onCircleClick={setMainImageCarousel}
              onClickAccessor={peripheralIdAccessor}
              className={styles.circleMotion}
            />
            <Circles
              data={dataAlerts}
              keyAccessor={detectionIdAccessor}
              xAccessor={yAccessorScaled}
              yAccessor={xAccessorScaled}
              onCircleClick={setMainImageCarousel}
              onClickAccessor={peripheralIdAccessor}
              className={styles.circleAlert}
              onCircleHover={handlePopoverOpen}
            />
            <AxisDetails
              data={dataAlerts}
              keyAccessor={detectionIdAccessor}
              yAccessor={xAccessorScaled}
            />
          </g>
        </Chart>
      </div>
      {isLoading && <CircularProgress isAbsolute />}
    </div>
  );
};
