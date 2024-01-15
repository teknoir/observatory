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
import { Source } from 'ts/types';
import { getFlattenDocuments } from 'utils/events';
import { MovementsTimeline } from './MovementsTimeline';
import {
  MovementsTimelinePeriod,
  TimelineFilterBy,
  TimelineRefetchInterval,
} from './enums';

interface MovementsTimelineContainerParams {
  fullHeight?: boolean;
}

function MovementsTimelineContainer({
  fullHeight,
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

  const { data: dataMotions, isInitialLoading: isLoadingMotions } = useQuery({
    queryKey: [motions, fromDate, toDate, filter],
    queryFn: () => fetchMovements({ fromDate, toDate }),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
    enabled:
      (filter == TimelineFilterBy.MOTIONS ||
        filter == TimelineFilterBy.MOTIONS_ALERTS) &&
      period == MovementsTimelinePeriod.DAYS_1,
  });

  const { data: dataAlerts, isInitialLoading: isLoadingAlerts } = useQuery({
    queryKey: [alerts, fromDate, toDate, filter],
    queryFn: () => fetchAlerts({ fromDate, toDate }),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
    enabled:
      filter == TimelineFilterBy.ALERTS ||
      filter == TimelineFilterBy.MOTIONS_ALERTS,
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
    <MovementsTimeline
      startTime={startTime}
      dataMotions={dataMotionsFlatten}
      dataAlerts={dataAlertsFlatten}
      xAccessor={startTimeAccessor}
      yAccessor={peripheralNameAccessor}
      peripherals={peripherals}
      ids={ids}
      filter={filter}
      handleChangeFilter={handleChangeFilterBy}
      period={period}
      handleChangePeriod={handleChangePeriod}
      isLoading={isLoadingMotions || isLoadingAlerts}
      fullHeight={fullHeight}
    />
  );
}

export default MovementsTimelineContainer;
