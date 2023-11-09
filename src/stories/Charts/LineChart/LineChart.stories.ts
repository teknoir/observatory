import type { Meta, StoryObj } from '@storybook/react';

import { LineChart } from './LineChart';

const meta = {
  component: LineChart,
  title: 'Charts/LineChart',
  tags: ['autodocs'],
  argTypes: {
    data: {
      // control: {
      //   type: "object",
      //   addable: true,
      // }
    },
  },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicExample: Story = {
  args: {
    data: [
      { name: 'id_1', value: 20 },
      { name: 'id_2', value: 30 },
      { name: 'id_3', value: 40 },
    ],
  },
};
