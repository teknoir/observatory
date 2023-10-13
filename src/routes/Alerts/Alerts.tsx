// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useQuery } from "@tanstack/react-query";
import moment from 'moment';
import Typography from '@mui/material/Typography';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import RightSideBar from "layouts/MainLayout/RightSideBar";
import { alerts, alertsById } from "enums/queryKeys";
import { fetchAlerts, fetchAlertsByPeripheralId } from "services/apiRequests";

const Alerts = () => {
  // TODO: for testing purpose
  const startDate = moment().startOf('day');
  const { data: dataAlerts } = useQuery({
    queryKey: [alerts, startDate],
    queryFn: () => fetchAlerts({ startDate }),
  })
  const { data: dataAlertsById } = useQuery({
    queryKey: [alertsById, startDate, 'parkinglot2'],
    queryFn: () => fetchAlertsByPeripheralId({ startDate, peripheralId: 'parkinglot2' }),
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
        <Typography variant="subtitle1" gutterBottom>
          Alerts from the last 7 days
        </Typography>
        <ul>
          <li>item 1</li>
          <li>item 2</li>
          <li>item 3</li>
        </ul>
      </RightSideBar>
    </>
  )
}

export default Alerts;
