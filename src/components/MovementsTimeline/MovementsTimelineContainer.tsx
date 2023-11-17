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
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { fetchMovements, fetchAlerts } from 'services/apiRequests';
import { motions, alerts, wsSources } from 'enums/queryKeys';
import { Source } from 'ts/types';
import { MovementsTimeline } from './MovementsTimeline';
import {
  MovementsTimelinePeriod,
  TimelineFilterBy,
  TimelineRefetchInterval,
} from './enums';

function MovementsTimelineContainer() {
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
  const startDate = useMemo(
    () => moment().subtract(period, 'days').startOf('day'),
    [period]
  );
  const startTime = useMemo(
    () => moment().subtract(period, 'days').toDate(),
    [period]
  );
  const fields = [
    'detection_id',
    'duration',
    'peripheral_id',
    'peripheral_name',
    'severity',
    'start_time',
    'type',
    'video_url',
  ];

  const queryMovements = useQuery({
    queryKey: [motions, startDate, filter, fields],
    queryFn: () => fetchMovements({ startDate }, fields),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
    enabled:
      (filter == TimelineFilterBy.MOTIONS ||
        filter == TimelineFilterBy.MOTIONS_ALERTS) &&
      period == MovementsTimelinePeriod.DAYS_1,
  });
  // TODO: temp solution for redundant data (only for Charts) - remove in future!
  const { isInitialLoading: isLoadingMotions } = queryMovements;
  let { data: dataMotions } = queryMovements;
  if (dataMotions?.length > 1000) {
    dataMotions = dataMotions.slice(-1000);
  }

  const queryAlerts = useQuery({
    queryKey: [alerts, startDate, filter, fields],
    queryFn: () => fetchAlerts({ startDate }, fields),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
    enabled:
      filter == TimelineFilterBy.ALERTS ||
      filter == TimelineFilterBy.MOTIONS_ALERTS,
  });
  // TODO: temp solution for redundant data (only for Charts) - remove in future!
  const { isInitialLoading: isLoadingAlerts } = queryAlerts;
  let { data: dataAlerts } = queryAlerts;
  if (dataAlerts?.length > 1000) {
    dataAlerts = dataAlerts.slice(-1000);
  }

  const [peripherals, ids] = useMemo(() => {
    const uniqueArr = _uniqBy(
      _flatten([dataMotions ?? [], dataAlerts ?? [], sourcesFromWS ?? []]),
      'peripheral_name'
    );
    return [
      uniqueArr.map(peripheralNameAccessor),
      uniqueArr.map(peripheralIdAccessor),
    ];
  }, [dataMotions, dataAlerts, sourcesFromWS]);

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

  if (isLoadingMotions || isLoadingAlerts) return <CircularProgress />;

  return (
    <MovementsTimeline
      startTime={startTime}
      dataMotions={dataMotions}
      dataAlerts={dataAlerts}
      xAccessor={startTimeAccessor}
      yAccessor={peripheralNameAccessor}
      peripherals={peripherals}
      ids={ids}
      filter={filter}
      handleChangeFilter={handleChangeFilterBy}
      period={period}
      handleChangePeriod={handleChangePeriod}
    />
  );
}

export default MovementsTimelineContainer;
