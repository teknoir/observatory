// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import moment from 'moment';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import RightSideBar from "layouts/MainLayout/RightSideBar";
import MotionsAlertsTabs from "components/MotionsAlertsTabs/MotionsAlertsTabs";
import { alerts, alertsById } from "enums/queryKeys";
import { fetchAlerts, fetchAlertsByPeripheralId } from "services/apiRequests";

const peripheralId = 'parkinglot2';
// const peripheralId = 'boxerproperty3';

const Alerts = () => {
  // TODO: for testing purpose
  const startDate = moment().startOf('day');
  const { data: dataAlerts } = useQuery({
    queryKey: [alerts, startDate],
    queryFn: () => fetchAlerts({ startDate }),
  })
  const { data: dataAlertsById } = useQuery({
    queryKey: [alertsById, startDate, peripheralId],
    queryFn: () => fetchAlertsByPeripheralId({ startDate, peripheralId }),
  })
  console.log(alerts, dataAlerts)
  console.log(alertsById, dataAlertsById)

  return (
    <>
      <AppBar>
        Field Camera #1
      </AppBar>
      <MainContent>
        <video width="640" height="480" controls>
          <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/ogg" />
              Your browser does not support the video tag.
        </video>
      </MainContent>
      <RightSideBar>
        <MotionsAlertsTabs peripheralId={peripheralId}/>
      </RightSideBar>
    </>
  )
}

export default Alerts;
