import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import APP_URLS from "enums/urls";
import Home from "./routes/Home/Home";
import DarkTheme from "./routes/DarkTheme/DarkTheme";
import LineCharts from "./routes/LineCharts/Linecharts";
import MotionsAlerts from "./routes/MotionsAlerts/MotionsAlerts";
import Alerts from "./routes/Alerts/Alerts";
import MainLayout from "./layouts/MainLayout/MainLayout";

const basename = import.meta.env.VITE_APP_BASENAME || "/";

function App() {
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <BrowserRouter basename={basename}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path={APP_URLS.home} element={<Home />} />
              <Route path={APP_URLS.motionsAlerts} element={<MotionsAlerts />} />
              <Route path="/alerts" element={<Alerts />} />
            </Route>
            <Route path="/dark-theme" element={<DarkTheme />} />
            <Route path="/linecharts" element={<LineCharts />} />
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
