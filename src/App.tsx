import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import DarkTheme from "./routes/DarkTheme/DarkTheme";
import LineCharts from "./routes/LineCharts/Linecharts";
import { StyledEngineProvider } from "@mui/material";

function App() {

  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dark-theme" element={<DarkTheme />} />
          <Route path="/linecharts" element={<LineCharts />} />
        </Routes>
      </BrowserRouter>
    </StyledEngineProvider>
  );
};

export default App;
