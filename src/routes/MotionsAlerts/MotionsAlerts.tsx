// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// import { useQuery } from "@tanstack/react-query";
// import moment from 'moment';
import Typography from '@mui/material/Typography';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import RightSideBar from "layouts/MainLayout/RightSideBar";
// import { fetchMovements, fetchMovementsByPeripheralId } from "services/apiRequests";
// import { motions, motionsById } from "enums/queryKeys";
import MotionsAlertsTabs from "components/MotionsAlertsTabs/MotionsAlertsTabs";

const MotionsAlerts = () => {
  // const startDate = moment().startOf('day');
  // const { data: dataMotions } = useQuery({
  //   queryKey: [motions, startDate],
  //   queryFn: () => fetchMovements({ startDate }),
  // })
  // const { data: dataMotionsById } = useQuery({
  //   queryKey: [motionsById, startDate, 'parkinglot2'],
  //   queryFn: () => fetchMovementsByPeripheralId({ startDate, peripheralId: 'parkinglot2' }),
  // })
  // console.log(motions, dataMotions)
  // console.log(motionsById, dataMotionsById)

  return (
    <>
      <AppBar>
        Motions & Alerts
      </AppBar>
      <MainContent>
        <Typography variant="h5" gutterBottom>
          Motions & Alerts
        </Typography>
      </MainContent>
      <RightSideBar>
        <MotionsAlertsTabs />
      </RightSideBar>
    </>
  )
}

export default MotionsAlerts;
