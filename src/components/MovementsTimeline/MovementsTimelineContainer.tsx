import { useQuery } from "@tanstack/react-query"
import moment from "moment";
import { startTimeAccessor, peripheralAccessor } from 'components/ChartUtilities/accessors'
import { fetchMovements, fetchAlerts } from "services/apiRequests";
import { motions, alerts } from "enums/queryKeys";
import { MovementsTimeline } from "./MovementsTimeline"

function MovementsTimelineContainer() {
  const startDate = moment().startOf('day');
  const { data: dataMotions } = useQuery({
    queryKey: [motions, startDate],
    queryFn: () => fetchMovements({ startDate }),
  })
  const { data: dataAlerts } = useQuery({
    queryKey: [alerts, startDate],
    queryFn: () => fetchAlerts({ startDate }),
  })

  return (
    <MovementsTimeline
      dataMotions={dataMotions}
      dataAlerts={dataAlerts}
      xAccessor={startTimeAccessor}
      yAccessor={peripheralAccessor}
    />
  )
}

export default MovementsTimelineContainer
