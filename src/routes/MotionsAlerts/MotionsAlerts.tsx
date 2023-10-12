import { useQuery } from "@tanstack/react-query";
import Typography from '@mui/material/Typography';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import RightSideBar from "layouts/MainLayout/RightSideBar";
import { fetchEvents } from "services/apiRequests";
import { motions } from "enums/queryKeys";
import Tabs from "../DarkTheme/Tabs";

const MotionsAlerts = () => {
  // TODO: it's an example how to fetch data from API
  const { isLoading, isError, data, error } = useQuery({
    queryKey: [motions],
    queryFn: fetchEvents,
  })
  console.log(isLoading, isError, data, error)

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
        <Tabs />
      </RightSideBar>
    </>
  )
}

export default MotionsAlerts;
