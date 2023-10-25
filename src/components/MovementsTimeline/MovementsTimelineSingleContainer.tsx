import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query"
import moment from "moment/moment";
import { SelectChangeEvent } from "@mui/material/Select";
import { startTimeAccessor, peripheralNameAccessor, peripheralIdAccessor } from 'components/ChartUtilities/accessors'
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { fetchMovementsByPeripheralId, fetchAlertsByPeripheralId } from "services/apiRequests";
import { motionsById, alertsById } from "enums/queryKeys";
import { MovementsTimeline } from "./MovementsTimeline"
import { MovementsTimelinePeriod, TimelineRefetchInterval } from "./enums";

interface Props {
  peripheralId?: string;
}

function MovementsTimelineContainer({ peripheralId = '' }: Props) {
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
    refetchInterval: TimelineRefetchInterval.SINGE_DEVICE,
  })

  const {
    data: dataAlertsByPeripheralId,
    isLoading: isLoadingAlertsByPeripheralId
  } = useQuery({
    queryKey: [alertsById, startDate, peripheralId],
    queryFn: () => fetchAlertsByPeripheralId({ startDate, peripheralId }),
    refetchInterval: TimelineRefetchInterval.SINGE_DEVICE,
  })

  const peripheralName = !isLoadingMotionsByPeripheralId ? peripheralNameAccessor(dataMotionsByPeripheralId[0] ?? "") : ""

  const handleChangePeriod = (e: SelectChangeEvent<unknown>) => setPeriod(Number(e.target.value))

  if (isLoadingMotionsByPeripheralId || isLoadingAlertsByPeripheralId) return <CircularProgress />

  return (
    <MovementsTimeline
      startTime={startTime}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dataMotions={dataMotionsByPeripheralId}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dataAlerts={dataAlertsByPeripheralId}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      xAccessor={startTimeAccessor}
      yAccessor={peripheralNameAccessor}
      idAccessor={peripheralIdAccessor}
      peripherals={[peripheralName]}
      ids={[peripheralId]}
      period={period}
      handleChangePeriod={handleChangePeriod}
    />
  )
}

export default MovementsTimelineContainer
