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
  const [isShow, setIsShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const period = 1;
  const fromDate = moment().subtract(period, 'days').startOf('day');
  const toDate = useMemo(() => moment(), []);

  const {
    data: dataMotionsByPeripheralId,
    isInitialLoading: isLoadingMotionsByPeripheralId,
  } = useQuery({
    queryKey: [motionsById, fromDate, toDate, peripheralId],
    queryFn: () =>
      fetchMovementsByPeripheralId({ fromDate, toDate, peripheralId }),
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
    enabled: isShow,
  });

  const {
    data: dataAlertsByPeripheralId,
    isInitialLoading: isLoadingAlertsByPeripheralId,
  } = useQuery({
    queryKey: [alertsById, fromDate, toDate, peripheralId],
    queryFn: () =>
      fetchAlertsByPeripheralId({ fromDate, toDate, peripheralId }),
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
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

  const renderContent = () => {
    if (isLoadingMotionsByPeripheralId || isLoadingAlertsByPeripheralId) {
      return <CircularProgress />;
    }

    return (
      <MovementsTimeline
        dataMotions={dataMotionsByPeripheralIdFlatten}
        dataAlerts={dataAlertsByPeripheralIdFlatten}
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
