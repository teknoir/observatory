import { useState, useRef, ReactNode } from 'react';
import classNames from 'classnames';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { getFlattenDocuments } from 'utils/events';
import useFilters from 'components/MovementsTimelines/hooks/useFilters';
import { useAlertsByPeripheralId } from 'components/MovementsTimelines/hooks/useAlerts';
import { useMotionsByPeripheralId } from 'components/MovementsTimelines/hooks/useMotions';
import MovementsTimeline from './components/MovementsTimeline/MovementsTimeline';
import { MovementsTimelinePeriod, TimelineFilterBy } from '../enums';
import styles from './SingleContainer.module.scss';
import { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  peripheralId: string;
  children: ReactNode;
  classNameContainer?: string;
  showToolbar?: boolean;
  initiallyLoaded?: boolean;
}

const SingleContainer = ({
  peripheralId,
  classNameContainer,
  children,
  showToolbar,
  initiallyLoaded = false,
}: Props) => {
  const [isShow, setIsShow] = useState(initiallyLoaded);
  const ref = useRef<HTMLDivElement>(null);
  const { filter, period, fromDate, startTime, toDate, setFilter, setPeriod } =
    useFilters();

  const {
    data: dataMotionsByPeripheralId,
    isInitialLoading: isLoadingMotionsByPeripheralId,
  } = useMotionsByPeripheralId({
    fromDate,
    toDate,
    filter,
    period,
    peripheralId,
    enabled: isShow,
  });

  const {
    data: dataAlertsByPeripheralId,
    isInitialLoading: isLoadingAlertsByPeripheralId,
  } = useAlertsByPeripheralId({
    fromDate,
    toDate,
    filter,
    peripheralId,
    enabled: isShow,
  });

  const handleMouseOver = () => {
    setIsShow(true);
  };

  const handleMouseOut = () => {
    setIsShow(false);
  };

  let dataMotionsByPeripheralIdFlatten = getFlattenDocuments(
    dataMotionsByPeripheralId
  );
  // TODO: temp solution for redundant data (only for Charts) - remove in future!
  if (dataMotionsByPeripheralIdFlatten?.length > 1000) {
    dataMotionsByPeripheralIdFlatten =
      dataMotionsByPeripheralIdFlatten.slice(-1000);
  }
  let dataAlertsByPeripheralIdFlatten = getFlattenDocuments(
    dataAlertsByPeripheralId
  );
  // TODO: temp solution for redundant data (only for Charts) - remove in future!
  if (dataAlertsByPeripheralIdFlatten?.length > 1000) {
    dataAlertsByPeripheralIdFlatten =
      dataAlertsByPeripheralIdFlatten.slice(-1000);
  }

  const handleChangeFilterBy = (e: SelectChangeEvent<unknown>) => {
    const filterByValue = String(e.target.value);
    setFilter(filterByValue);
    if (filterByValue !== TimelineFilterBy.ALERTS) {
      setPeriod(MovementsTimelinePeriod.DAYS_1);
    }
  };
  const handleChangePeriod = (e: SelectChangeEvent<unknown>) => {
    const periodValue = Number(e.target.value);
    setPeriod(periodValue);
    if (periodValue !== MovementsTimelinePeriod.DAYS_1) {
      setFilter(TimelineFilterBy.ALERTS);
    }
  };

  const renderContent = () => {
    if (isLoadingMotionsByPeripheralId || isLoadingAlertsByPeripheralId) {
      return <CircularProgress />;
    }

    return (
      <MovementsTimeline
        startTime={startTime}
        dataMotions={dataMotionsByPeripheralIdFlatten}
        dataAlerts={dataAlertsByPeripheralIdFlatten}
        filter={filter}
        handleChangeFilter={handleChangeFilterBy}
        period={period}
        handleChangePeriod={handleChangePeriod}
        showToolbar={showToolbar}
      />
    );
  };

  const hoverProps = initiallyLoaded
    ? {}
    : { onMouseOver: handleMouseOver, onMouseOut: handleMouseOut };

  return (
    <div
      {...hoverProps}
      className={classNames(styles.root, classNameContainer)}
      ref={ref}
      onMouseDown={() => {
        if (!showToolbar) {
          setIsShow(false);
        }
      }}
    >
      {children}
      {isShow && <div className={styles.content}>{renderContent()}</div>}
    </div>
  );
};

export default SingleContainer;
