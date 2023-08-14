import { useEffect, useRef } from "react"
import * as d3 from "d3"

export const MovementsTimeline = ({ data }) => {
  const ref = useRef()

  useEffect(() => {
    drawExperiment()
  }, [data])

  function drawExperiment() {
    const dataset = data
    console.log(dataset)
    // const uniquePeripherals = ["Camera A", "Camera B", "Camera C", "Camera D"]
    const uniquePeripherals = dataset.map(d => d.peripheral)

    const currentTime = new Date()
    const time24HoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000)
    const time1WeekAgo = new Date(currentTime.getTime() - 24 * 8 * 60 * 60 * 1000)
    const time1MonthAgo = new Date(currentTime.getTime() - 24 * 7 * 4 * 60 * 60 * 1000)
    const time1YearAgo = new Date(currentTime.getTime() - 24 * 7 * 4 * 12 * 60 * 60 * 1000)

    // 1. Access data
    const yAccessor = d => d.peripheral
    // const timeParser = d3.timeParse("%Y-%m-%dT%H:%M:%SZ")
    // const xAccessor = d => timeParser(d.timestamp)
    // 
    // const unixTimeParser = d3.timeParse("%s")
    // const correctUnixTime = d => String(Math.floor(d / 1000))
    // const xAccessor = d => unixTimeParser(correctUnixTime(d.timestamp))
    // 
    const timeParser2 = d3.timeParse("%m/%d/%Y")
    const formatTime = d => new Date(Number(d.timestamp)).toLocaleDateString("en-US")
    const xAccessor = d => timeParser2(formatTime(d))

    const testUnixTimestamp = 1678684800000
    const formattedTime = new Date(testUnixTimestamp).toLocaleDateString("en-US")

    console.log(formattedTime)
    console.log(timeParser2(formattedTime))

    // 2. Dimensions
    const width = d3.min([window.innerWidth, window.innerHeight])

    const dimensions = {
      width: width,
      height: width,
      margin: {
        top: 15,
        right: 15,
        bottom: 50,
        left: 50,
      },
    }

    dimensions.boundedWidth =
      dimensions.width
      - dimensions.margin.right
      - dimensions.margin.left
    dimensions.boundedHeight =
      dimensions.height
      - dimensions.margin.top
      - dimensions.margin.bottom

    // 3. Draw canvas
    const wrapper = d3.select(ref.current)
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)

    const bounds = wrapper.append("g")
      .attr("width", dimensions.boundedWidth)
      .attr("height", dimensions.boundedHeight)
      .style("transform", `translate(
      ${dimensions.margin.left}px,
      ${dimensions.margin.top}px
    )`)

    // 4. Create scales 
    // const yScale = d3.scaleOrdinal()
    //   .domain(d3.extent(dataset, yAccessor))
    //   .range([dimensions.boundedHeight, 0])
    const tooltip = d3.select("body").append("div")
      .attr("position", "absolute")
      .style("visibility", "hidden")
      .style("font-size", "12px")

    const yScale = d3.scaleBand()
      .domain(uniquePeripherals)
      // .domain(d3.extent(dataset, yAccessor))
      .range([dimensions.boundedHeight, 0])
      .padding(1)

    let xScale = d3.scaleTime()
      // .domain(d3.extent(dataset, xAccessor))
      // .domain([time24HoursAgo, currentTime])
      .domain([time1WeekAgo, currentTime])
      // .domain([time1MonthAgo, currentTime])
      // .domain([time1YearAgo, currentTime])
      .range([0, dimensions.boundedWidth])
      .nice()

    function draw() {
      // 5. Draw data
      const dots = bounds.selectAll("circle")
        .data(dataset)

      // Exit
      dots.exit().remove()

      // Update existing dots  
      dots
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("fill", d => {
          if (d.detectionType === "Detection") {
            return "red"
          }
          if (d.detectionType === "Motion") {
            return "blue"
          }
        })
        .on("mouseover", (event, data) => {
          tooltip.style("visibility", "visible")
            .html(`
          ${data.peripheral}
          <br>
          ${data.detectionType}
          <br>
          ${xAccessor(data)}
        `)
        })
        // ${unixTimeParser(correctUnixTime(data.timestamp))}
        .on("mousemove", (event) => {
          tooltip.style("top", event.pageY - 10 + "px")
            .style("margin-left", event.pageX + 10 + "px")
            .style("margin-top", (dimensions.height - event.pageY) * (-1) + 10 + "px")
        })
        .on("mouseout", (event, data) => {
          tooltip.style("visibility", "hidden")
        })

      // Enter new dots
      dots.enter()
        .append("circle")
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 10)
        .attr("fill", d => {
          if (d.detectionType === "Detection") {
            return "red"
          }
          if (d.detectionType === "Motion") {
            return "blue"
          }
        })
        .attr("opacity", 0.2)
        .on("mouseover", (event, data) => {
          tooltip.style("visibility", "visible")
            .html(`
          ${data.peripheral}
          <br>
          ${data.detectionType}
          <br>
          ${xAccessor(data)}
        `)
        })
        // ${unixTimeParser(correctUnixTime(data.timestamp))}
        .on("mousemove", (event) => {
          tooltip.style("top", event.pageY - 10 + "px")
            .style("margin-left", event.pageX + 10 + "px")
            .style("margin-top", (dimensions.height - event.pageY) * (-1) + 10 + "px")
        })
        .on("mouseout", (event, data) => {
          tooltip.style("visibility", "hidden")
        })

      // 6. Draw peripherals
      const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
      const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
        .tickSize(0)
      const yGridLinesGenerator = d3.axisLeft()
        .scale(yScale)
        .tickSize(-dimensions.boundedWidth)
        .tickFormat("")
      const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`)
      const yAxis = bounds.append("g")
        .call(yAxisGenerator)
      const yGridLines = bounds.append("g")
        .call(yGridLinesGenerator)
        .attr("stroke-width", 0.2)
    }

    draw()

  }

  drawExperiment()

  return (
    <svg ref={ref}></svg>
  )
}










// import { useEffect, useRef } from "react"
// import * as d3 from "d3"
//
// export const MovementsTimeline = ({ data }) => {
//   const ref = useRef()
//
//   useEffect(() => {
//     drawExperiment()
//   }, [data])
//
//   function drawExperiment() {
//     const dataset = data
//     console.log(dataset)
//     // const uniquePeripherals = ["Camera A", "Camera B", "Camera C", "Camera D"]
//     const uniquePeripherals = dataset.map(d => d.peripheral)
//
//     const currentTime = new Date()
//     const time24HoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000)
//     const time1WeekAgo = new Date(currentTime.getTime() - 24 * 8 * 60 * 60 * 1000)
//     const time1MonthAgo = new Date(currentTime.getTime() - 24 * 7 * 4 * 60 * 60 * 1000)
//     const time1YearAgo = new Date(currentTime.getTime() - 24 * 7 * 4 * 12 * 60 * 60 * 1000)
//
//     // 1. Access data
//     const yAccessor = d => d.peripheral
//     // const timeParser = d3.timeParse("%Y-%m-%dT%H:%M:%SZ")
//     // const xAccessor = d => timeParser(d.timestamp)
//     // 
//     // const unixTimeParser = d3.timeParse("%s")
//     // const correctUnixTime = d => String(Math.floor(d / 1000))
//     // const xAccessor = d => unixTimeParser(correctUnixTime(d.timestamp))
//     // 
//     const timeParser2 = d3.timeParse("%m/%d/%Y")
//     const formatTime = d => new Date(Number(d.timestamp)).toLocaleDateString("en-US")
//     const xAccessor = d => timeParser2(formatTime(d))
//
//     const testUnixTimestamp = 1678684800000
//     const formattedTime = new Date(testUnixTimestamp).toLocaleDateString("en-US")
//
//     console.log(formattedTime)
//     console.log(timeParser2(formattedTime))
//
//     // 2. Dimensions
//     const width = d3.min([window.innerWidth, window.innerHeight])
//
//     const dimensions = {
//       width: width,
//       height: width,
//       margin: {
//         top: 15,
//         right: 15,
//         bottom: 50,
//         left: 50,
//       },
//     }
//
//     dimensions.boundedWidth =
//       dimensions.width
//       - dimensions.margin.right
//       - dimensions.margin.left
//     dimensions.boundedHeight =
//       dimensions.height
//       - dimensions.margin.top
//       - dimensions.margin.bottom
//
//     // 3. Draw canvas
//     const wrapper = d3.select(ref.current)
//       .attr("width", dimensions.width)
//       .attr("height", dimensions.height)
//
//     const bounds = wrapper.append("g")
//       .attr("width", dimensions.boundedWidth)
//       .attr("height", dimensions.boundedHeight)
//       .style("transform", `translate(
//       ${dimensions.margin.left}px,
//       ${dimensions.margin.top}px
//     )`)
//
//     // 4. Create scales 
//     // const yScale = d3.scaleOrdinal()
//     //   .domain(d3.extent(dataset, yAccessor))
//     //   .range([dimensions.boundedHeight, 0])
//     const tooltip = d3.select("body").append("div")
//       .attr("position", "absolute")
//       .style("visibility", "hidden")
//       .style("font-size", "12px")
//
//     const yScale = d3.scaleBand()
//       .domain(uniquePeripherals)
//       // .domain(d3.extent(dataset, yAccessor))
//       .range([dimensions.boundedHeight, 0])
//       .padding(1)
//
//     let xScale = d3.scaleTime()
//       // .domain(d3.extent(dataset, xAccessor))
//       // .domain([time24HoursAgo, currentTime])
//       .domain([time1WeekAgo, currentTime])
//       // .domain([time1MonthAgo, currentTime])
//       // .domain([time1YearAgo, currentTime])
//       .range([0, dimensions.boundedWidth])
//       .nice()
//
//     function draw() {
//       // 5. Draw data
//       const dots = bounds.selectAll("circle")
//         .data(dataset)
//         .enter()
//         .append("circle")
//         .attr("cx", d => xScale(xAccessor(d)))
//         .attr("cy", d => yScale(yAccessor(d)))
//         .attr("r", 10)
//         .attr("fill", d => {
//           if (d.detectionType === "Detection") {
//             return "red"
//           }
//           if (d.detectionType === "Motion") {
//             return "blue"
//           }
//         })
//         .attr("opacity", 0.2)
//         .on("mouseover", (event, data) => {
//           tooltip.style("visibility", "visible")
//             .html(`
//           ${data.peripheral}
//           <br>
//           ${data.detectionType}
//           <br>
//           ${xAccessor(data)}
//         `)
//         })
//         // ${unixTimeParser(correctUnixTime(data.timestamp))}
//         .on("mousemove", (event) => {
//           tooltip.style("top", event.pageY - 10 + "px")
//             .style("margin-left", event.pageX + 10 + "px")
//             .style("margin-top", (dimensions.height - event.pageY) * (-1) + 10 + "px")
//         })
//         .on("mouseout", (event, data) => {
//           tooltip.style("visibility", "hidden")
//         })
//         .exit()
//         .remove()
//
//       // 6. Draw peripherals
//       const xAxisGenerator = d3.axisBottom()
//         .scale(xScale)
//       const yAxisGenerator = d3.axisLeft()
//         .scale(yScale)
//         .tickSize(0)
//       const yGridLinesGenerator = d3.axisLeft()
//         .scale(yScale)
//         .tickSize(-dimensions.boundedWidth)
//         .tickFormat("")
//       const xAxis = bounds.append("g")
//         .call(xAxisGenerator)
//         .style("transform", `translateY(${dimensions.boundedHeight}px)`)
//       const yAxis = bounds.append("g")
//         .call(yAxisGenerator)
//       const yGridLines = bounds.append("g")
//         .call(yGridLinesGenerator)
//         .attr("stroke-width", 0.2)
//     }
//
//     draw()
//
//   }
//
//   drawExperiment()
//
//   return (
//     <svg ref={ref}></svg>
//   )
// }
