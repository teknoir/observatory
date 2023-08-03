import './App.css'
import wsConnect from './helpers'
import Carousel from './components/Carousel'
import { useEffect, useState } from 'react'
import LineChart from './components/LineChart'
import LineChartExample from './components/LineChartExample'
import { isDev } from './helpers'

function App() {
  const nodeRedWsURL = "ws://127.0.0.1:1880/ws/multiple-charts"
  const initialData = [
    { name: "A", value: 5 },
    { name: "B", value: 10 },
    { name: "C", value: 7 },
  ]
  const [chartData, setChartData] = useState(initialData)
  const loc = window.location
  const wsUrl =
    loc.protocol === "https:" ? "wss:" : "ws:"
      + "//" + loc.host + "/ws" + loc.pathname
  const data: any = wsConnect(isDev() ? nodeRedWsURL : wsUrl)

  useEffect(() => {
    console.log("WS connected to: ", isDev() ? nodeRedWsURL : wsUrl)
  }, [])

  useEffect(() => {
    // console.log(data)
    // console.log(data["ch1"])
  }, [data])

  function addDataPoint() {
    const newDataPoint = {
      name: "newName" + Math.random() * 100,
      value: Math.ceil(Math.random() * 100)
    }
    setChartData([...chartData, newDataPoint])
  }

  return (
    <>
      {/* <LineChart data={chartData} /> */}
      <LineChart data={data["ch1"]} />
      <LineChart data={data["ch2"]} />
      <LineChart data={data["ch3"]} />
      <button onClick={addDataPoint}>Add Data Point</button>
      <LineChartExample />
      <Carousel />
    </>
  )
}

export default App
