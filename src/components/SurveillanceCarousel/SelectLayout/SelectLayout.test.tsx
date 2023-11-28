import { render, screen } from '@testing-library/react';
import SelectLayout from './SelectLayout';

const renderComponent = () => {
  return render(<SelectLayout />);
};

test('component default option at first render is General', () => {
  renderComponent();

  const selectElement = screen.getByText(/All Cameras/i);
  expect(selectElement).toBeInTheDocument();
});
