import type { Meta, StoryObj } from "@storybook/react"
import { MovementsTimeline } from "../../../components/MovementsTimeline"
import movements from "../../../../datasets/movements.json"

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
    data: movements
  }
}
