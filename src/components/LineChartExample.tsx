import * as d3 from "d3"
import { useEffect, useRef } from "react"

function LineChartExample() {
  const mockData = [{ "name": "id_1", "value": 80 }, { "name": "id_2", "value": 43 }, { "name": "id_3", "value": 61 }, { "name": "id_4", "value": 63 }, { "name": "id_5", "value": 72 }, { "name": "id_6", "value": 62 }, { "name": "id_7", "value": 81 }, { "name": "id_8", "value": 59 }, { "name": "id_9", "value": 1 }, { "name": "id_10", "value": 82 }, { "name": "id_11", "value": 31 }, { "name": "id_12", "value": 82 }, { "name": "id_13", "value": 26 }, { "name": "id_14", "value": 94 }, { "name": "id_15", "value": 16 }, { "name": "id_16", "value": 35 }, { "name": "id_17", "value": 93 }, { "name": "id_18", "value": 55 }, { "name": "id_19", "value": 98 }, { "name": "id_20", "value": 22 }, { "name": "id_21", "value": 91 }, { "name": "id_22", "value": 67 }, { "name": "id_23", "value": 30 }, { "name": "id_24", "value": 27 }, { "name": "id_25", "value": 54 }, { "name": "id_26", "value": 76 }, { "name": "id_27", "value": 62 }, { "name": "id_28", "value": 68 }, { "name": "id_29", "value": 70 }, { "name": "id_30", "value": 13 }, { "name": "id_31", "value": 59 }, { "name": "id_32", "value": 45 }, { "name": "id_33", "value": 66 }, { "name": "id_34", "value": 93 }, { "name": "id_35", "value": 89 }, { "name": "id_36", "value": 94 }, { "name": "id_37", "value": 5 }, { "name": "id_38", "value": 62 }, { "name": "id_39", "value": 100 }, { "name": "id_40", "value": 94 }, { "name": "id_41", "value": 95 }, { "name": "id_42", "value": 67 }, { "name": "id_43", "value": 86 }, { "name": "id_44", "value": 56 }, { "name": "id_45", "value": 5 }, { "name": "id_46", "value": 62 }, { "name": "id_47", "value": 91 }, { "name": "id_48", "value": 1 }, { "name": "id_49", "value": 18 }, { "name": "id_50", "value": 45 }, { "name": "id_51", "value": 76 }, { "name": "id_52", "value": 91 }, { "name": "id_53", "value": 100 }, { "name": "id_54", "value": 23 }, { "name": "id_55", "value": 9 }, { "name": "id_56", "value": 44 }, { "name": "id_57", "value": 97 }, { "name": "id_58", "value": 96 }, { "name": "id_59", "value": 43 }, { "name": "id_60", "value": 35 }, { "name": "id_61", "value": 54 }, { "name": "id_62", "value": 8 }, { "name": "id_63", "value": 34 }, { "name": "id_64", "value": 14 }, { "name": "id_65", "value": 95 }, { "name": "id_66", "value": 2 }, { "name": "id_67", "value": 82 }, { "name": "id_68", "value": 4 }, { "name": "id_69", "value": 70 }, { "name": "id_70", "value": 17 }, { "name": "id_71", "value": 45 }, { "name": "id_72", "value": 16 }, { "name": "id_73", "value": 33 }, { "name": "id_74", "value": 6 }, { "name": "id_75", "value": 7 }, { "name": "id_76", "value": 23 }, { "name": "id_77", "value": 86 }, { "name": "id_78", "value": 76 }, { "name": "id_79", "value": 53 }, { "name": "id_80", "value": 17 }]
  const data = mockData.map(d => d.value)
  const width = 640
  const height = 400
  const marginTop = 20
  const marginRight = 20
  const marginBottom = 30
  const marginLeft = 40
  const gx = useRef(null)
  const gy = useRef(null)
  const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight])
  // @ts-ignore
  const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop])
  const line = d3.line((_, i) => x(i), y)
  useEffect(() => {
    // @ts-ignore
    void d3.select(gx.current).call(d3.axisBottom(x))
  }, [gx, x])
  useEffect(() => {
    // @ts-ignore
    void d3.select(gy.current).call(d3.axisLeft(y))
  }, [gy, y])
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0, ${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft}, 0)`} />
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data)!} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {
          data.map((d, i) => (
            <circle key={i} cx={x(i)} cy={y(d)} r="2.5" />
          ))
        }
      </g>
    </svg>

  )

}

export default LineChartExample
