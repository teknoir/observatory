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
import { MovementsTimelinePeriod, TimelineRefetchInterval } from './enums';
import { useDisplayFiltersContext } from 'context/DisplayFiltersContext/displayFiltersContext';

interface Props {
  peripheralId?: string;
  peripheralName?: string;
}

function MovementsTimelineContainer({
  peripheralId = '',
  peripheralName: peripheralNameFromDevice = '',
}: Props) {
  const { filters } = useDisplayFiltersContext();
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
    queryKey: [motionsById, fromDate, toDate, filters.labels, peripheralId],
    queryFn: () =>
      fetchMovementsByPeripheralId({
        fromDate,
        toDate,
        peripheralId,
        labels: filters.labels,
      }),
    enabled:
      !!peripheralId &&
      filters.labels.length > 0 &&
      period == MovementsTimelinePeriod.DAYS_1,
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
  });

  const {
    data: dataAlertsByPeripheralId,
    isInitialLoading: isLoadingAlertsByPeripheralId,
  } = useQuery({
    queryKey: [alertsById, fromDate, toDate, filters.types, peripheralId],
    queryFn: () =>
      fetchAlertsByPeripheralId({
        fromDate,
        toDate,
        peripheralId,
        types: filters.types,
      }),
    enabled: !!peripheralId && filters.types.length > 0,
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

  const handleChangePeriod = (e: SelectChangeEvent<unknown>) => {
    const periodValue = Number(e.target.value);
    setPeriod(periodValue);
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
      period={period}
      handleChangePeriod={handleChangePeriod}
      isLoading={
        isLoadingMotionsByPeripheralId || isLoadingAlertsByPeripheralId
      }
    />
  );
}

export default MovementsTimelineContainer;
