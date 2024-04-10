import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StyledEngineProvider } from '@mui/material';
import { WSSProvider } from 'context/webSocketContext';
import APP_URLS from 'enums/urls';
import { wsSources } from 'enums/queryKeys';
import Alert from 'routes/Alert/Alert';
import DarkTheme from 'routes/DarkTheme/DarkTheme';
import Device from 'routes/Device/Device';
import Notifications from 'routes/Notifications/Notifications';
import Home from 'routes/Home/Home';
import LineCharts from 'routes/LineCharts/Linecharts';
import MainLayout from 'layouts/MainLayout/MainLayout';
import MotionsAlerts from 'routes/MotionsAlerts/MotionsAlerts';
import './App.scss';

const basename = import.meta.env.VITE_APP_BASENAME || '/';

const queryClient = new QueryClient();
queryClient.setQueryDefaults([wsSources], {
  cacheTime: 1000 * 60,
});

console.log('VITE_APP_BASENAME', import.meta.env.VITE_APP_BASENAME);
console.log('VITE_WS_SERVER', import.meta.env.VITE_WS_SERVER);
console.log(
  'VITE_HISTORIAN_DB_SERVER',
  import.meta.env.VITE_HISTORIAN_DB_SERVER
);
console.log(
  'VITE_HISTORIAN_MIDDLE_END_API',
  import.meta.env.VITE_HISTORIAN_MIDDLE_END_API
);
console.log('VITE_MEDIA_MP4_API', import.meta.env.VITE_MEDIA_MP4_API);
console.log('VITE_MEDIA_JPEG_API', import.meta.env.VITE_MEDIA_JPEG_API);
console.log('VITE_MEDIA_JSON_API', import.meta.env.VITE_MEDIA_JSON_API);
console.log('import.meta.env.DEV', import.meta.env.DEV);
console.log('import.meta.env.PROD', import.meta.env.PROD);

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <WSSProvider>
            <BrowserRouter basename={basename}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path={APP_URLS.home} element={<Home />} />
                  <Route
                    path={APP_URLS.motionsAlerts}
                    element={<MotionsAlerts />}
                  />
                  <Route path={APP_URLS.alerts} element={<Alert />} />
                  <Route path={APP_URLS.devices} element={<Device />} />
                  <Route
                    path={APP_URLS.notifications}
                    element={<Notifications />}
                  />
                </Route>
                <Route path="/dark-theme" element={<DarkTheme />} />
                <Route path="/linecharts" element={<LineCharts />} />
              </Routes>
            </BrowserRouter>
          </WSSProvider>
        </StyledEngineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
