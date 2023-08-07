import { Button2 } from "./Button2";

const meta = {
  component: Button2,
  title: "TestComponents/Button2",
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "Overwritten description"
    },
    primary: {
      description: "Is this button the primary type?",
      default: "true"
    }
  }
}

export default meta

export const Primary = {
  args: {
    label: "Button2",
    primary: true,
    size: "large"
  }
}

export const Secondary = {
  args: {
    label: ""
  }
}
