import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  startTimeAccessor,
  peripheralNameAccessor,
} from 'components/ChartUtilities/accessors';
import {
  fetchMovementsByPeripheralId,
  fetchAlertsByPeripheralId,
} from 'services/apiRequests';
import { getFlattenDocuments } from 'utils/events';
import { motionsById, alertsById } from 'enums/queryKeys';
import { MovementsTimelineVertical } from './MovementsTimelineVertical';
import {
  MovementsTimelinePeriod,
  TimelineFilterBy,
  TimelineRefetchInterval,
} from './enums';

interface Props {
  peripheralId?: string;
  peripheralName?: string;
}

function MovementsTimelineSingleContainer({
  peripheralId = '',
  peripheralName: peripheralNameFromDevice = '',
}: Props) {
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
    enabled:
      !!peripheralId &&
      (filter == TimelineFilterBy.MOTIONS ||
        filter == TimelineFilterBy.MOTIONS_ALERTS) &&
      period == MovementsTimelinePeriod.DAYS_1,
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
  });

  console.log(dataMotionsByPeripheralId);

  const {
    data: dataAlertsByPeripheralId,
    isInitialLoading: isLoadingAlertsByPeripheralId,
  } = useQuery({
    queryKey: [alertsById, fromDate, toDate, filter, peripheralId],
    queryFn: () =>
      fetchAlertsByPeripheralId({ fromDate, toDate, peripheralId }),
    enabled:
      (!!peripheralId && filter == TimelineFilterBy.ALERTS) ||
      filter == TimelineFilterBy.MOTIONS_ALERTS,
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
  });

  const peripheralName = dataMotionsByPeripheralId
    ? peripheralNameAccessor(dataMotionsByPeripheralId[0] ?? '')
    : dataAlertsByPeripheralId
    ? peripheralNameAccessor(dataAlertsByPeripheralId[0] ?? '')
    : peripheralNameFromDevice ?? '';

  const dataMotionsByPeripheralIdFlatten = getFlattenDocuments(
    dataMotionsByPeripheralId
  );
  const dataAlertsByPeripheralIdFlatten = getFlattenDocuments(
    dataAlertsByPeripheralId
  );

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

  return (
    <MovementsTimelineVertical
      startTime={startTime}
      dataMotions={dataMotionsByPeripheralIdFlatten}
      dataAlerts={dataAlertsByPeripheralIdFlatten}
      xAccessor={startTimeAccessor}
      yAccessor={peripheralNameAccessor}
      peripherals={[peripheralName]}
      ids={[peripheralId]}
      filter={filter}
      handleChangeFilter={handleChangeFilterBy}
      period={period}
      handleChangePeriod={handleChangePeriod}
      isLoading={
        isLoadingMotionsByPeripheralId || isLoadingAlertsByPeripheralId
      }
    />
  );
}

export default MovementsTimelineSingleContainer;
