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

  const {
    data: dataMotions,
    isLoading: isLoadingMotions
  } = useQuery({
    queryKey: [motions, startDate],
    queryFn: () => fetchMovements({ startDate }),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
  })

  const {
    data: dataAlerts,
    isLoading: isLoadingAlerts
  } = useQuery({
    queryKey: [alerts, startDate],
    queryFn: () => fetchAlerts({ startDate }),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
  })

  const [peripherals, ids] = useMemo(() => {
    if (dataMotions && dataAlerts) {
      const uniqueArr = _uniqBy(dataMotions.concat(dataAlerts), 'peripheral_name')
      return [
        uniqueArr.map(peripheralNameAccessor),
        uniqueArr.map(peripheralIdAccessor),
      ]
    }
    return [[], []]
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dataMotions={dataMotions}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dataAlerts={dataAlerts}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      xAccessor={startTimeAccessor}
      yAccessor={peripheralNameAccessor}
      idAccessor={peripheralIdAccessor}
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
