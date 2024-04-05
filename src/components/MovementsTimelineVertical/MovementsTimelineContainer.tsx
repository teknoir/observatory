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
// import { AlertTypes, EventLabels } from 'ts/types';
import { MovementsTimelineVertical } from './MovementsTimelineVertical';
import { MovementsTimelinePeriod, TimelineRefetchInterval } from './enums';
import { useDisplayFiltersContext } from 'context/DisplayFiltersContext/displayFiltersContext';

interface Props {
  peripheralId?: string;
  peripheralName?: string;
}

// const defaultTypes = [
//   AlertTypes.Theft,
//   AlertTypes.Loitering,
//   AlertTypes.OnGround,
// ];
// const defaultLabels = [EventLabels.Person, EventLabels.Car];

function MovementsTimelineContainer({
  peripheralId = '',
  peripheralName: peripheralNameFromDevice = '',
}: Props) {
  // const [filter, setFilter] = useState({
  //   types: defaultTypes,
  //   labels: defaultLabels,
  // });
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

  // const handleChangeFilterBy = (e: SelectChangeEvent<unknown>) => {
  //   const { value } = e.target as { value: (AlertTypes | EventLabels)[] };
  //   const alertsFilter = value.filter((item) =>
  //     defaultTypes.includes(item as AlertTypes)
  //   );
  //   const motionsFilter = value.filter((item) =>
  //     defaultLabels.includes(item as EventLabels)
  //   );
  //   setFilter({
  //     types: alertsFilter as AlertTypes[],
  //     labels: motionsFilter as EventLabels[],
  //   });
  // };

  const handleChangePeriod = (e: SelectChangeEvent<unknown>) => {
    const periodValue = Number(e.target.value);
    setPeriod(periodValue);
  };

  // const filterArr = [...filter.types, ...filter.labels];

  return (
    <MovementsTimelineVertical
      startTime={startTime}
      dataMotions={dataMotionsByPeripheralIdFlatten}
      dataAlerts={dataAlertsByPeripheralIdFlatten}
      xAccessor={startTimeAccessor}
      yAccessor={peripheralNameAccessor}
      peripherals={[peripheralName]}
      ids={[peripheralId]}
      // filter={filterArr}
      // handleChangeFilter={handleChangeFilterBy}
      period={period}
      handleChangePeriod={handleChangePeriod}
      isLoading={
        isLoadingMotionsByPeripheralId || isLoadingAlertsByPeripheralId
      }
    />
  );
}

export default MovementsTimelineContainer;
