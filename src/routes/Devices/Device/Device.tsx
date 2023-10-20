import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import RightSideBar from "layouts/MainLayout/RightSideBar";
import AlertsMotionsTabs from "components/AlertsMotionsTabs/AlertsMotionsTabs";
import { useParams } from 'react-router-dom';

const Device = () => {
  const { peripheralId } = useParams()

  return (
    <>
      <AppBar>
        # Device Name | {peripheralId}
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
