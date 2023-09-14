import './App.css'
import wsConnect from './helpers'
import Carousel from './components/Carousel'
import { useEffect, useState } from 'react'
import { isDev } from './helpers'
import { LineChart } from './components/LineChart'
import { MovementsTimeline } from './components/MovementsTimeline'
import movements from "../datasets/movements_script.json"
import movements2 from "../datasets/movements2.json"
import temperature from "../datasets/temperature.json"
import * as d3 from "d3"

// MovementsTimelineReact settings
const timeParser = d3.timeParse("%m/%d/%Y")
const formatTime = d => new Date(Number(d)).toLocaleDateString("en-US")
const dateAccessor = d => timeParser(formatTime(d.timestamp))
const peripheralAccessor = d => d.peripheral
const countAccessor = d => d.count

const eventAccessor = d => d.event_name;
const contextAccessor = d => d.context;

const dateTemperatureAccessor = d => timeParser(d.date)
const temperatureAccessor = d => d.temperature

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

  const dataByEvent = Array.from(d3.group(movements, eventAccessor), ([key, value]) => ({ event_name: key, data: value }));
  
  {/*
  const dataByEvent = Array.from(d3.group(movements, eventAccessor), ([event_name, eventData]) => ({
    event_name,
    dataByContext: Array.from(d3.group(eventData, contextAccessor), ([context, contextData]) => ({
      context,
      data: contextData,
    })),
  }));
   */}

  return (
    <>
      {/* <LineChart */}
      {/*   data={temperature} */}
      {/*   xAccessor={dateTemperatureAccessor} */}
      {/*   yAccessor={temperatureAccessor} */}
      {/* /> */}
      {/**/}
      {/* <LineChart */}
      {/*   data={movements} */}
      {/*   xAccessor={dateAccessor} */}
      {/*   yAccessor={countAccessor} */}
      {/* /> */}

      {/* <MovementsTimeline */}
      {/*   data={movements2} */}
      {/*   xAccessor={dateAccessor} */}
      {/*   yAccessor={peripheralAccessor} */}
      {/* /> */}
      {/*
      <MovementsTimeline
        data={movements}
        xAccessor={dateAccessor}
        yAccessor={peripheralAccessor}
      /> 
      */}

      {/* WS Examples */}
      {/* <LineChart data={chartData} /> */}
      {/* <Button2 onClick={() => console.log("asdf")} label="hey!" /> */}
      {/* <LineChart data={data["ch1"]} /> */}
      {/* <LineChart data={data["ch2"]} /> */}
      {/* <LineChart data={data["ch3"]} /> */}
      {/* <button onClick={addDataPoint}>Add Data Point</button> */}
      {/* <LineChartExample /> */}
      {/* <Carousel /> */}

      {dataByEvent.map(eventData => (
          <div key={eventData.event_name} style={{ position: 'relative', marginTop: '4em'}}>
            <LineChart
              data={eventData.data}
              xAccessor={dateAccessor}
              yAccessor={countAccessor}
              //colorAccessor= {contextAccessor}
            />
            <center>
              <h1 style={{ marginTop: '0', position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }}>
                <span className="line-chart-title">
                  {eventData.event_name} Detections
                </span>
              </h1>
            </center>
          </div>
      ))}
    </>
  )
}

export default App
