import * as d3 from "d3"
import { useEffect, useRef } from "react";

const LineChart = ({ data = [] }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    const svg = renderLineChart(data)

    return () => {
      svg.remove()
    }
  }, [data])

  // Function to render the line chart
  const renderLineChart = (data: any) => {
    const width = 800;
    const height = 300;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const xScale = d3.scaleBand()
      .domain(data.map((d: any) => d.name))
      .range([0, width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      // @ts-ignore: 
      .domain([0, d3.max(data, (d) => d.value)])
      .range([height, 0]);

    // Create a line generator function
    const line = d3.line()
      .x((d: any) => xScale(d.name)! + xScale.bandwidth() / 2)
      .y((d: any) => yScale(d.value))
      .curve(d3.curveStep);

    // Draw the initial line
    svg.append('path')
      .datum(data)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', '#779A99')
      .attr('stroke-width', 2)
    // .classed("path-style", true);

    return svg;
  };

  // Function to update the line chart with new data point
  // const updateLineChart = (svg:any, data:any) => {
  //   const width = 800;
  //   const height = 300;
  //
  //   const xScale = d3.scaleBand()
  //     .domain(data.map(d => d.name))
  //     .range([0, width])
  //     .padding(0.1);
  //
  //   const yScale = d3.scaleLinear()
  //     .domain([0, d3.max(data, d => d.value)])
  //     .range([height, 0]);
  //
  //   // Create a line generator function
  //   const line = d3.line()
  //     .x(d => xScale(d.name) + xScale.bandwidth() / 2)
  //     .y(d => yScale(d.value))
  //     .curve(d3.curveStep);
  //
  //   // Update the line
  //   svg.select('path')
  //     .datum(data)
  //     .attr('d', line);
  //
  //   // Remove any unnecessary data points
  //   svg.selectAll('.data-point').remove();
  // };

  return (
    <div ref={chartRef}></div>
  )
}

export default LineChart
