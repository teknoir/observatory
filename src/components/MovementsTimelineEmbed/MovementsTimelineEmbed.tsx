import { useState, useRef, useMemo, ReactNode } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import {
  fetchMovementsByPeripheralId,
  fetchAlertsByPeripheralId,
} from 'services/apiRequests';
import { motionsById, alertsById } from 'enums/queryKeys';
import { getFlattenDocuments } from 'utils/events';
import MovementsTimeline from './MovementsTimeline/MovementsTimeline';
import {
  MovementsTimelinePeriod,
  TimelineFilterBy,
  TimelineRefetchInterval,
} from '../MovementsTimeline/enums.ts';
import styles from './MovementsTimelineEmbed.module.scss';
import { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  peripheralId: string;
  children: ReactNode;
  classNameContainer?: string;
  showToolbar?: boolean;
}

const MovementsTimelineEmbed = ({
  peripheralId,
  classNameContainer,
  children,
  showToolbar,
}: Props) => {
  const [isShow, setIsShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<string>(TimelineFilterBy.MOTIONS_ALERTS);
  const [period, setPeriod] = useState(MovementsTimelinePeriod.DAYS_1);
  const fromDate = useMemo(
    () => moment().subtract(period, 'days').startOf('day'),
    [period]
  );
  const startTime = useMemo(
    () => moment().subtract(period, 'days').toDate(),
    [period]
  );
  const toDate = useMemo(() => moment(), [period]);

  const {
    data: dataMotionsByPeripheralId,
    isInitialLoading: isLoadingMotionsByPeripheralId,
  } = useQuery({
    queryKey: [motionsById, fromDate, toDate, filter, peripheralId],
    queryFn: () =>
      fetchMovementsByPeripheralId({ fromDate, toDate, peripheralId }),
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
    enabled:
      isShow &&
      (filter == TimelineFilterBy.MOTIONS ||
        filter == TimelineFilterBy.MOTIONS_ALERTS) &&
      period == MovementsTimelinePeriod.DAYS_1,
  });

  const {
    data: dataAlertsByPeripheralId,
    isInitialLoading: isLoadingAlertsByPeripheralId,
  } = useQuery({
    queryKey: [alertsById, fromDate, toDate, filter, peripheralId],
    queryFn: () =>
      fetchAlertsByPeripheralId({ fromDate, toDate, peripheralId }),
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
    enabled:
      (isShow && filter == TimelineFilterBy.ALERTS) ||
      filter == TimelineFilterBy.MOTIONS_ALERTS,
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

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={classNames(styles.root, classNameContainer)}
      ref={ref}
      onMouseDown={() => {
        setIsShow(false);
      }}
    >
      {children}
      {isShow && <div className={styles.content}>{renderContent()}</div>}
    </div>
  );
};

export default MovementsTimelineEmbed;
