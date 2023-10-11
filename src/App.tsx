import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import Home from "./routes/Home/Home";
import DarkTheme from "./routes/DarkTheme/DarkTheme";
import LineCharts from "./routes/LineCharts/Linecharts";
import MotionsAlerts from "./routes/MotionsAlerts/MotionsAlerts";
import Alerts from "./routes/Alerts/Alerts";
import MainLayout from "./layouts/MainLayout/MainLayout";

function App() {

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/motions-alerts" element={<MotionsAlerts />} />
              <Route path="/alerts" element={<Alerts />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/dark-theme" element={<DarkTheme />} />
            <Route path="/linecharts" element={<LineCharts />} />
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
