import { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment/moment';
import _flatten from 'lodash/flatten';
import _uniqBy from 'lodash/uniqBy';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  startTimeAccessor,
  peripheralNameAccessor,
  peripheralIdAccessor,
} from 'components/ChartUtilities/accessors';
import { fetchMovements, fetchAlerts } from 'services/apiRequests';
import { motions, alerts, wsSources } from 'enums/queryKeys';
import { AlertTypes, EventLabels, Source } from 'ts/types';
import { getFlattenDocuments } from 'utils/events';
import { MovementsTimeline } from './MovementsTimeline';
import { MovementsTimelinePeriod, TimelineRefetchInterval } from './enums';

interface MovementsTimelineContainerParams {
  isFullHeight?: boolean;
  isFixToolbar?: boolean;
}

interface IFilter {
  types: AlertTypes[];
  labels: EventLabels[];
}

function MovementsTimelineContainer({
  isFullHeight,
  isFixToolbar,
}: MovementsTimelineContainerParams) {
  const queryClient = useQueryClient();
  const sources: { [p: string]: Source } = queryClient.getQueryData([
    wsSources,
  ])!;
  const sourcesArray = Object.values(sources ?? []);
  const sourcesFromWS = sourcesArray.map((item) => {
    return {
      ...item,
      peripheral_name: item.peripheralName,
      peripheral_id: item.peripheralId,
    };
  });

  const [filter, setFilter] = useState<IFilter>({
    types: [],
    labels: [],
  });
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

  const { data: dataMotions, isInitialLoading: isLoadingMotions } = useQuery({
    queryKey: [motions, fromDate, toDate, filter.labels],
    queryFn: () => fetchMovements({ fromDate, toDate, labels: filter.labels }),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
    enabled: filter.labels.length > 0,
  });

  const { data: dataAlerts, isInitialLoading: isLoadingAlerts } = useQuery({
    queryKey: [alerts, fromDate, toDate, filter.types],
    queryFn: () => fetchAlerts({ fromDate, toDate, types: filter.types }),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
    enabled: filter.types.length > 0,
  });

  const [peripherals, ids] = useMemo(() => {
    const flattenArr = [];
    for (let i = 0; i < dataAlerts?.length; i++) {
      flattenArr.push({
        peripheral_id: dataAlerts[i].peripheral_id,
        peripheral_name: dataAlerts[i].peripheral_name,
      });
    }
    for (let i = 0; i < dataMotions?.length; i++) {
      flattenArr.push({
        peripheral_id: dataMotions[i].peripheral_id,
        peripheral_name: dataMotions[i].peripheral_name,
      });
    }
    const uniqueArr = _uniqBy(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      _flatten([flattenArr, sourcesFromWS ?? []]),
      'peripheral_name'
    );
    return [
      uniqueArr.map(peripheralNameAccessor).sort(),
      uniqueArr.map(peripheralIdAccessor).sort(),
    ];
  }, [dataMotions, dataAlerts, sourcesFromWS]);

  const dataAlertsFlatten = getFlattenDocuments(dataAlerts);
  const dataMotionsFlatten = getFlattenDocuments(dataMotions);

  const splitFilter = (filter: (AlertTypes | EventLabels)[]) => {
    const alertsFilter = filter.filter((item) =>
      [AlertTypes.loitering, AlertTypes.theft, AlertTypes.on_ground].includes(
        item as AlertTypes
      )
    );
    const motionsFilter = filter.filter((item) =>
      [EventLabels.person, EventLabels.car].includes(item as EventLabels)
    );
    return [alertsFilter, motionsFilter];
  };

  const handleChangeFilterBy = (e: SelectChangeEvent<unknown>) => {
    const {
      target: { value },
    } = e;
    const [alertsFilter, motionsFilter] = splitFilter(
      value as (AlertTypes | EventLabels)[]
    );
    setFilter({
      types: alertsFilter as AlertTypes[],
      labels: motionsFilter as EventLabels[],
    });
  };
  const handleChangePeriod = (e: SelectChangeEvent<unknown>) => {
    const periodValue = Number(e.target.value);
    setPeriod(periodValue);
  };

  const filterArr = [...filter.types, ...filter.labels];

  return (
    <MovementsTimeline
      startTime={startTime}
      dataMotions={dataMotionsFlatten}
      dataAlerts={dataAlertsFlatten}
      xAccessor={startTimeAccessor}
      yAccessor={peripheralNameAccessor}
      peripherals={peripherals}
      ids={ids}
      filter={filterArr}
      handleChangeFilter={handleChangeFilterBy}
      period={period}
      handleChangePeriod={handleChangePeriod}
      isLoading={isLoadingMotions || isLoadingAlerts}
      isFullHeight={isFullHeight}
      isFixToolbar={isFixToolbar}
    />
  );
}

export default MovementsTimelineContainer;
