import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material";
import Home from "./routes/Home/Home";
import DarkTheme from "./routes/DarkTheme/DarkTheme";
import LineCharts from "./routes/LineCharts/Linecharts";
import BaseLayout from "./layouts/BaseLayout.tsx";

function App() {

  return (
    <BaseLayout>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dark-theme" element={<DarkTheme />} />
            <Route path="/linecharts" element={<LineCharts />} />
          </Routes>
        </BrowserRouter>
      </StyledEngineProvider>
    </BaseLayout>
  );
};

export default App;
