import { useState, useRef, ReactNode } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import {
  fetchMovementsByPeripheralId,
  fetchAlertsByPeripheralId,
} from 'services/apiRequests';
import { motionsById, alertsById } from 'enums/queryKeys';
import MovementsTimeline from './MovementsTimeline/MovementsTimeline';
import { TimelineRefetchInterval } from '../MovementsTimeline/enums.ts';
import styles from './MovementsTimelineEmbed.module.scss';

interface Props {
  peripheralId: string;
  children: ReactNode;
  classNameContainer: string;
}

const MovementsTimelineEmbed = ({
  peripheralId,
  classNameContainer,
  children,
}: Props) => {
  // const [isShow, setIsShow] = useState(false);
  const [isShow, setIsShow] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const period = 1;
  const startDate = moment().subtract(period, 'days').startOf('day');

  const {
    data: dataMotionsByPeripheralId,
    isInitialLoading: isLoadingMotionsByPeripheralId,
  } = useQuery({
    queryKey: [motionsById, startDate, peripheralId],
    queryFn: () => fetchMovementsByPeripheralId({ startDate, peripheralId }),
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
  });

  const {
    data: dataAlertsByPeripheralId,
    isInitialLoading: isLoadingAlertsByPeripheralId,
  } = useQuery({
    queryKey: [alertsById, startDate, peripheralId],
    queryFn: () => fetchAlertsByPeripheralId({ startDate, peripheralId }),
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
  });

  const handleMouseOver = () => {
    setIsShow(true);
  };

  const handleMouseOut = () => {
    // setIsShow(false);
  };

  const renderContent = () => {
    if (isLoadingMotionsByPeripheralId || isLoadingAlertsByPeripheralId) {
      return <CircularProgress />;
    }

    return (
      <MovementsTimeline
        dataMotions={dataMotionsByPeripheralId}
        dataAlerts={dataAlertsByPeripheralId}
      />
    );
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      className={classNames(styles.root, classNameContainer)}
      ref={ref}
    >
      {children}
      {isShow && <div className={styles.content}>{renderContent()}</div>}
    </div>
  );
};

export default MovementsTimelineEmbed;
