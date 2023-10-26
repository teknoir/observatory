import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query"
import moment from "moment/moment";
import { SelectChangeEvent } from "@mui/material/Select";
import { startTimeAccessor, peripheralNameAccessor } from 'components/ChartUtilities/accessors'
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { fetchMovementsByPeripheralId, fetchAlertsByPeripheralId } from "services/apiRequests";
import { motionsById, alertsById } from "enums/queryKeys";
import { MovementsTimeline } from "./MovementsTimeline"
import { MovementsTimelinePeriod, TimelineRefetchInterval } from "./enums";

interface Props {
  peripheralId?: string;
}

function MovementsTimelineSingleContainer({ peripheralId = '' }: Props) {
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
    data: dataMotionsByPeripheralId,
    isLoading: isLoadingMotionsByPeripheralId
  } = useQuery({
    queryKey: [motionsById, startDate, peripheralId],
    queryFn: () => fetchMovementsByPeripheralId({ startDate, peripheralId }),
    enabled: !!peripheralId,
    refetchInterval: TimelineRefetchInterval.SINGE_DEVICE,
  })

  const {
    data: dataAlertsByPeripheralId,
    isLoading: isLoadingAlertsByPeripheralId
  } = useQuery({
    queryKey: [alertsById, startDate, peripheralId],
    queryFn: () => fetchAlertsByPeripheralId({ startDate, peripheralId }),
    enabled: !!peripheralId,
    refetchInterval: TimelineRefetchInterval.SINGE_DEVICE,
  })

  if (isLoadingMotionsByPeripheralId || isLoadingAlertsByPeripheralId) return <CircularProgress />

  const peripheralName = dataMotionsByPeripheralId ? peripheralNameAccessor(dataMotionsByPeripheralId[0] ?? "") : ""

  const handleChangePeriod = (e: SelectChangeEvent<unknown>) => setPeriod(Number(e.target.value))

  return (
    <MovementsTimeline
      startTime={startTime}
      dataMotions={dataMotionsByPeripheralId}
      dataAlerts={dataAlertsByPeripheralId}
      xAccessor={startTimeAccessor}
      yAccessor={peripheralNameAccessor}
      peripherals={[peripheralName]}
      ids={[peripheralId]}
      period={period}
      handleChangePeriod={handleChangePeriod}
    />
  )
}

export default MovementsTimelineSingleContainer
