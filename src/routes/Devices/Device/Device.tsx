import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import AlertsMotionsTabs from "components/AlertsMotionsTabs/AlertsMotionsTabs";
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import { alertsById } from "enums/queryKeys";
import RightSideBar from "layouts/MainLayout/RightSideBar";
import { fetchAlertsByPeripheralId } from 'services/apiRequests';

const Device = () => {
  const { peripheralId = "" } = useParams()
  const startDate = moment().startOf('day');

  const { data } = useQuery({
    queryKey: [alertsById, startDate],
    queryFn: () => fetchAlertsByPeripheralId({ startDate, peripheralId }),
  })

  return (
    <>
      <AppBar>
        {data && data[0] && (data[0].hasOwnProperty("peripheral_name") ?? "")} | {peripheralId}
      </AppBar>
      <MainContent>
      </MainContent>
      <RightSideBar>
        <AlertsMotionsTabs />
      </RightSideBar>
    </>
  )
}

export default Device;
