import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StyledEngineProvider } from "@mui/material";
import APP_URLS from "enums/urls";
import Home from "./routes/Home/Home";
import DarkTheme from "./routes/DarkTheme/DarkTheme";
import LineCharts from "./routes/LineCharts/Linecharts";
import MotionsAlerts from "./routes/MotionsAlerts/MotionsAlerts";
import Alerts from "./routes/Alerts/Alerts";
import MainLayout from "./layouts/MainLayout/MainLayout";

const basename = process.env.APP_BASENAME || "/";
const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
