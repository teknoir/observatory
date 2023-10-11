import Typography from '@mui/material/Typography';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import RightSideBar from "layouts/TestLayout/RightSideBar";

const Alerts = () => {
  return (
    <>
      <AppBar>
        Field Camera #1
      </AppBar>
      <MainContent>
        <video width="640" height="480" controls>
          <source src="movie.mp4" type="video/mp4" />
            <source src="movie.ogg" type="video/ogg" />
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
