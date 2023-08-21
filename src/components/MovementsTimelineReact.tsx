import * as d3 from "d3"
import { useChartDimensions } from "./Chart/utils"
import Chart from "./Chart/Chart"
import Circles from "./Chart/Circles"
import Axis from "./Chart/Axis"

const formatDate = d3.timeFormat("%-b %-d")

export const MovementsTimelineReact = ({ data, xAccessor, yAccessor }) => {
  const [ref, dimensions] = useChartDimensions(null)
  const uniquePeripherals = [...new Set(data.map(d => d.peripheral))];

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, xAccessor))
    .range([0, dimensions.boundedWidth])

  const yScale = d3.scalePoint()
    .domain(uniquePeripherals)
    .range([dimensions.boundedHeight, 0])
    .padding(1)

  const xAccessorScaled = d => xScale(xAccessor(d))
  const yAccessorScaled = d => yScale(yAccessor(d))
  const keyAccessor = (d, i) => i

  // const currentTime = new Date()
  // const time24HoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000)
  // const time1WeekAgo = new Date(currentTime.getTime() - 24 * 8 * 60 * 60 * 1000)
  // const time1MonthAgo = new Date(currentTime.getTime() - 24 * 7 * 4 * 60 * 60 * 1000)
  // const time1YearAgo = new Date(currentTime.getTime() - 24 * 7 * 4 * 12 * 60 * 60 * 1000)


  // 4. Create scales 
  // const tooltip = d3.select("body").append("div")
  //   .attr("position", "absolute")
  //   .style("visibility", "hidden")
  //   .style("font-size", "12px")

  // const yScale = d3.scaleBand()
  //   .domain(uniquePeripherals)
  //   // .domain(d3.extent(dataset, yAccessor))
  //   .range([dimensions.boundedHeight, 0])
  //   .padding(1)

  // let xScale = d3.scaleTime()
  //   .domain([time1WeekAgo, currentTime])
  //   .range([0, dimensions.boundedWidth])
  //   .nice()

  // 5. Draw data
  // const dots = bounds.selectAll("circle")
  //   .data(dataset)
  //
  // // Enter new dots
  // dots.enter()
  //   .append("circle")
  //   .attr("cx", d => xScale(xAccessor(d)))
  //   .attr("cy", d => yScale(yAccessor(d)))
  //   .attr("r", 10)
  //   .attr("fill", d => {
  //     if (d.detectionType === "Detection") {
  //       return "red"
  //     }
  //     if (d.detectionType === "Motion") {
  //       return "blue"
  //     }
  //   })
  //   .attr("opacity", 0.2)
  //   .on("mouseover", (event, data) => {
  //     tooltip.style("visibility", "visible")
  //       .html(`
  //       ${data.peripheral}
  //       <br>
  //       ${data.detectionType}
  //       <br>
  //       ${xAccessor(data)}
  //     `)
  //   })
  //   // ${unixTimeParser(correctUnixTime(data.timestamp))}
  //   .on("mousemove", (event) => {
  //     tooltip.style("top", event.pageY - 10 + "px")
  //       .style("margin-left", event.pageX + 10 + "px")
  //       .style("margin-top", (dimensions.height - event.pageY) * (-1) + 10 + "px")
  //   })
  //   .on("mouseout", (event, data) => {
  //     tooltip.style("visibility", "hidden")
  //   })

  return (
    <div className="Timeline" ref={ref}>
      <Chart dimensions={dimensions}>
        <Axis
          dimension="x"
          scale={xScale}
          formatTick={formatDate}
        />
        <Axis
          dimension="y"
          scale={yScale}
        />
        <Circles
          data={data}
          keyAccessor={keyAccessor}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
        />
      </Chart>
    </div>
  )
}
