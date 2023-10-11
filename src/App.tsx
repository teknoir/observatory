import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import Home from "./routes/Home/Home";
import DarkTheme from "./routes/DarkTheme/DarkTheme";
import LineCharts from "./routes/LineCharts/Linecharts";
import MotionsAlerts from "./routes/MotionsAlerts/MotionsAlerts";
import Alerts from "./routes/Alerts/Alerts";
// import BaseLayout from "./layouts/BaseLayout";
import TestLayout from "./layouts/TestLayout/TestLayout";

function App() {

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dark-theme" element={<DarkTheme />} />
            <Route path="/linecharts" element={<LineCharts />} />
            <Route element={<TestLayout />}>
              <Route path="/motions-alerts" element={<MotionsAlerts />} />
              <Route path="/alerts" element={<Alerts />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </div>
  );
};

export default App;
