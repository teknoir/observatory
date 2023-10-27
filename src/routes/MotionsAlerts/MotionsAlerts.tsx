// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// import { useQuery } from "@tanstack/react-query";
// import moment from 'moment';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineContainer from 'components/MovementsTimeline/MovementsTimelineContainer';
import RightSideBar from "layouts/MainLayout/RightSideBar";
// import { fetchMovements, fetchMovementsByPeripheralId } from "services/apiRequests";
// import { motions, motionsById } from "enums/queryKeys";
import AlertsMotionsTabs from "components/AlertsMotionsTabs/AlertsMotionsTabs";

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
        {/*<MovementsTimelineContainer />*/}
      </MainContent>
      <RightSideBar>
        <AlertsMotionsTabs />
      </RightSideBar>
    </>
  )
}

export default MotionsAlerts;
