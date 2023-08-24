import type { Meta, StoryObj } from "@storybook/react"
import * as d3 from "d3"
import { MovementsTimeline } from "../../../components/MovementsTimeline"
import movements from "../../../../datasets/movements.json"
import "../../../App.css"

// MovementsTimelineReact settings
const timeParser = d3.timeParse("%m/%d/%Y")
const formatTime = d => new Date(Number(d)).toLocaleDateString("en-US")
const dateAccessor = d => timeParser(formatTime(d.timestamp))
const peripheralAccessor = d => d.peripheral

const meta = {
  component: MovementsTimeline,
  title: "Charts/MovementsTimeline",
  tags: ["autodocs"],
  argTypes: {
    data: {
      // control: {
      //   type: "object",
      //   addable: true,
      // }
    }
  }
} satisfies Meta<typeof MovementsTimeline>

export default meta
type Story = StoryObj<typeof meta>

export const BasicExample: Story = {
  args: {
    data: movements,
    xAccessor: dateAccessor,
    yAccessor: peripheralAccessor,
  }
}
