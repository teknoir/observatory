import { render, screen } from '@testing-library/react';
import SelectLayout from './SelectLayout';
import userEvent from '@testing-library/user-event';

const renderComponent = () => {
  return render(<SelectLayout />);
};

test('component default option at first render is General', () => {
  renderComponent();

  const selectElement = screen.getByText(/general/i);
  expect(selectElement).toBeInTheDocument();
});

test('component renders a list of options when user clicks Select', async () => {
  const user = userEvent.setup();
  renderComponent();

  const selectElement = screen.getByRole('button');
  user.click(selectElement);
  await screen.findAllByRole('option');
  const optionDynamicCarousel = screen.getByText(/dynamic carousel/i);
  const optionAllCameras = screen.getByText(/all cameras/i);
  expect(optionDynamicCarousel).toBeInTheDocument();
  expect(optionAllCameras).toBeInTheDocument();
});
