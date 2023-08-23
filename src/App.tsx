import './App.css'
import wsConnect from './helpers'
import Carousel from './components/Carousel'
import { useEffect, useState } from 'react'
import { LineChart } from './components/LineChart'
import { isDev } from './helpers'
import { Button2 } from './stories/Button2/Button2'
import { MovementsTimelineReact } from './components/MovementsTimelineReact'
import movements from "../datasets/movements.json"
import * as d3 from "d3"

// MovementsTimelineReact settings
const timeParser = d3.timeParse("%m/%d/%Y")
const formatTime = d => new Date(Number(d)).toLocaleDateString("en-US")
const dateAccessor = d => timeParser(formatTime(d.timestamp))
const peripheralAccessor = d => d.peripheral

function App() {
  // WS example
  // const nodeRedWsURL = "ws://127.0.0.1:1880/ws/multiple-charts"
  // const initialData = [
  //   { name: "A", value: 5 },
  //   { name: "B", value: 10 },
  //   { name: "C", value: 7 },
  // ]
  // const [chartData, setChartData] = useState(initialData)
  // const loc = window.location
  // const wsUrl =
  //   loc.protocol === "https:" ? "wss:" : "ws:"
  //     + "//" + loc.host + "/ws" + loc.pathname
  // const data: any = wsConnect(isDev() ? nodeRedWsURL : wsUrl)
  //
  // useEffect(() => {
  //   console.log("WS connected to: ", isDev() ? nodeRedWsURL : wsUrl)
  // }, [])
  //
  // useEffect(() => {
  //   console.log(data)
  // }, [data])
  //
  // function addDataPoint() {
  //   const newDataPoint = {
  //     name: "newName" + Math.random() * 100,
  //     value: Math.ceil(Math.random() * 100)
  //   }
  //   setChartData([...chartData, newDataPoint])
  // }

  return (
    <>
      {/* <LineChart */}
      {/*   data={movements} */}
      {/*   xAccessor={dateAccessor} */}
      {/*   yAccessor={peripheralAccessor} */}
      {/* /> */}
      <MovementsTimelineReact
        data={movements}
        xAccessor={dateAccessor}
        yAccessor={peripheralAccessor}
      />

      {/* WS Examples */}
      {/* <LineChart data={chartData} /> */}
      {/* <Button2 onClick={() => console.log("asdf")} label="hey!" /> */}
      {/* <LineChart data={data["ch1"]} /> */}
      {/* <LineChart data={data["ch2"]} /> */}
      {/* <LineChart data={data["ch3"]} /> */}
      {/* <button onClick={addDataPoint}>Add Data Point</button> */}
      {/* <LineChartExample /> */}
      {/* <Carousel /> */}
    </>
  )
}

export default App
