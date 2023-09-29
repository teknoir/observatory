import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import LineCharts from "./routes/Linecharts";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/linecharts" element={<LineCharts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
