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
import { MovementsTimelinePeriod } from "./enums";

const refetchInterval = 60000   // 1 minute

function MovementsTimelineContainer() {
  //FIX: Update state of filter for enum
  const [filter, setFilter] = useState("motions-alerts")
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
    refetchInterval: refetchInterval,
  })

  const {
    data: dataAlerts,
    isLoading: isLoadingAlerts
  } = useQuery({
    queryKey: [alerts, startDate],
    queryFn: () => fetchAlerts({ startDate }),
    refetchInterval: refetchInterval,
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

  // FIX: change this handler name
  const handleChangeDisplay = (e: SelectChangeEvent<unknown>) => setFilter(String(e.target.value))
  const handleChangePeriod = (e: SelectChangeEvent<unknown>) => {
    setPeriod(Number(e.target.value))
    if (e.target.value = 1) {
      setFilter("motions-alerts")

    } else {
      setFilter("alerts")
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
      handleChangeFilter={handleChangeDisplay}
      period={period}
      handleChangePeriod={handleChangePeriod}
    />
  )
}

export default MovementsTimelineContainer
