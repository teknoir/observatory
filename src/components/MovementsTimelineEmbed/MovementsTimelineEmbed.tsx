import { useState, useRef, useMemo, ReactNode } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import {
  fetchMovementsByPeripheralId,
  fetchAlertsByPeripheralId,
} from 'services/apiRequests';
import { motionsById, alertsById } from 'enums/queryKeys';
import { AlertTypes } from 'ts/types.ts';
import { getFlattenDocuments } from 'utils/events';
import MovementsTimeline from './MovementsTimeline/MovementsTimeline';
import {
  MovementsTimelinePeriod,
  TimelineRefetchInterval,
} from '../MovementsTimeline/enums.ts';
import styles from './MovementsTimelineEmbed.module.scss';

interface Props {
  peripheralId: string;
  children: ReactNode;
  classNameContainer?: string;
  showToolbar?: boolean;
  initiallyLoaded?: boolean;
}

const MovementsTimelineEmbed = ({
  peripheralId,
  classNameContainer,
  children,
  showToolbar,
  initiallyLoaded = false,
}: Props) => {
  const [isShow, setIsShow] = useState(initiallyLoaded);
  const ref = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<AlertTypes[]>([]);
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
  });

  const {
    data: dataAlertsByPeripheralId,
    isInitialLoading: isLoadingAlertsByPeripheralId,
  } = useQuery({
    queryKey: [alertsById, fromDate, toDate, filter, peripheralId],
    queryFn: () =>
      fetchAlertsByPeripheralId({ fromDate, toDate, peripheralId }),
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
  });

  const handleMouseOver = () => {
    setIsShow(true);
  };

  const handleMouseOut = () => {
    setIsShow(false);
  };

  const dataMotionsByPeripheralIdFlatten = getFlattenDocuments(
    dataMotionsByPeripheralId
  );
  const dataAlertsByPeripheralIdFlatten = getFlattenDocuments(
    dataAlertsByPeripheralId
  );

  const handleChangeFilterBy = (e: SelectChangeEvent<unknown>) => {
    const {
      target: { value },
    } = e;
    setFilter(value as AlertTypes[]);
  };
  const handleChangePeriod = (e: SelectChangeEvent<unknown>) => {
    const periodValue = Number(e.target.value);
    setPeriod(periodValue);
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

export default MovementsTimelineEmbed;
