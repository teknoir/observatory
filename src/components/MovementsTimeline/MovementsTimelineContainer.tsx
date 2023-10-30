import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query"
import moment from "moment/moment";
import _uniqBy from "lodash/uniqBy";
import { SelectChangeEvent } from "@mui/material/Select";
import { startTimeAccessor, peripheralNameAccessor, peripheralIdAccessor } from 'components/ChartUtilities/accessors'
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { fetchMovements, fetchAlerts } from "services/apiRequests";
import { motions, alerts } from "enums/queryKeys";
import { MovementsTimeline } from "./MovementsTimeline"
import { MovementsTimelinePeriod, TimelineFilterBy, TimelineRefetchInterval } from "./enums";

function MovementsTimelineContainer() {
  const [filter, setFilter] = useState<string>(TimelineFilterBy.MOTIONS_ALERTS)
  const [period, setPeriod] = useState(MovementsTimelinePeriod.DAYS_1)
  const startDate = useMemo(
    () => moment().subtract(period, 'days').startOf('day'),
    [period]
  )
  const startTime = useMemo(
    () => moment().subtract(period, 'days').toDate(),
    [period]
  )
  const fields = ['detection_id', 'start_time', 'peripheral_id', 'peripheral_name'];

  const {
    data: dataMotions,
    isInitialLoading: isLoadingMotions
  } = useQuery({
    queryKey: [motions, startDate, filter, fields],
    queryFn: () => fetchMovements({ startDate }, fields),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
    enabled: (filter == TimelineFilterBy.MOTIONS ||
      filter == TimelineFilterBy.MOTIONS_ALERTS) &&
      period == MovementsTimelinePeriod.DAYS_1
  })

  const {
    data: dataAlerts,
    isInitialLoading: isLoadingAlerts
  } = useQuery({
    queryKey: [alerts, startDate, filter, fields],
    queryFn: () => fetchAlerts({ startDate }, fields),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
    enabled: filter == TimelineFilterBy.ALERTS ||
      filter == TimelineFilterBy.MOTIONS_ALERTS
  })

  const [peripherals, ids] = useMemo(() => {
    const uniqueArr = _uniqBy(dataMotions ?? [].concat(dataAlerts ?? []), 'peripheral_name')
    return [
      uniqueArr.map(peripheralNameAccessor),
      uniqueArr.map(peripheralIdAccessor),
    ]
  }, [isLoadingMotions, isLoadingAlerts, dataMotions, dataAlerts])

  const handleChangeFilterBy = (e: SelectChangeEvent<unknown>) => {
    const filterByValue = String(e.target.value)
    setFilter(filterByValue)
    if (filterByValue !== TimelineFilterBy.ALERTS) {
      setPeriod(MovementsTimelinePeriod.DAYS_1)
    }
  }
  const handleChangePeriod = (e: SelectChangeEvent<unknown>) => {
    const periodValue = Number(e.target.value)
    setPeriod(periodValue)
    if (periodValue !== MovementsTimelinePeriod.DAYS_1) {
      setFilter(TimelineFilterBy.ALERTS)
    }
  }

  if (isLoadingMotions || isLoadingAlerts) return <CircularProgress />

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
  )
}

export default MovementsTimelineContainer
