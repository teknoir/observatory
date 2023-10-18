import { useQuery } from "@tanstack/react-query"
import moment from "moment";
import { startTimeAccessor, peripheralAccessor } from 'components/ChartUtilities/accessors'
import { fetchMovements, fetchAlerts } from "services/apiRequests";
import { motions, alerts } from "enums/queryKeys";
import { MovementsTimeline } from "./MovementsTimeline"

const refetchInterval = 60000   // 1 minute

function MovementsTimelineContainer() {
  const startDate = moment().startOf('day');
  const { data: dataMotions } = useQuery({
    queryKey: [motions, startDate],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryFn: () => fetchMovements({ startDate }),
    refetchInterval: refetchInterval,
  })
  const { data: dataAlerts } = useQuery({
    queryKey: [alerts, startDate],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    queryFn: () => fetchAlerts({ startDate }),
    refetchInterval: refetchInterval,
  })

  return (
    <MovementsTimeline
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dataMotions={dataMotions}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dataAlerts={dataAlerts}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      xAccessor={startTimeAccessor}
      yAccessor={peripheralAccessor}
    />
  )
}

export default MovementsTimelineContainer
