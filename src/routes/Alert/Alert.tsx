// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query";
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import RightSideBar from "layouts/MainLayout/RightSideBar";
import { alert } from "enums/queryKeys";
import { fetchAlert } from "services/apiRequests";
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import AlertsPerformanceTabs from "components/AlertsPerformanceTabs/AlertsPerformanceTabs";
import VideoPlayer from "components/VideoPlayer/VideoPlayer";
import Form from './Form/Form';
import Info from './Info/Info';

const peripheralId = 'parkinglot2';
// const peripheralId = 'boxerproperty3';

const Alert = () => {
  const { detectionId = "" } = useParams();

  const isVerified = detectionId % 2 !== 0;

  const { data, isLoading } = useQuery({
    queryKey: [alert, detectionId],
    queryFn: () => fetchAlert(detectionId),
  })

  console.log(data)

  if (isLoading) return <CircularProgress />

  const {
    type,
    severity,
    peripheral_name,
    start_time,
    end_time,
  } = data;

  return (
    <>
      <AppBar>
        {data.peripheral_name}
      </AppBar>
      <MainContent>
        <VideoPlayer
          url={data.video_url}
          width='100%'
          height={520}
        />
        {isVerified ? (
          <Info
            type={type}
            severity={severity}
            peripheralName={peripheral_name}
            startTime={start_time}
            endTime={end_time}
            // TODO: use real data here
            comment={"TEST: We double check this and was actually a theft, called the police at 15:42."}
            hasTheft
          />
        ) : (
          <Form />
        )}
      </MainContent>
      <RightSideBar>
        <AlertsPerformanceTabs peripheralId={peripheralId}/>
      </RightSideBar>
    </>
  )
}

export default Alert;
