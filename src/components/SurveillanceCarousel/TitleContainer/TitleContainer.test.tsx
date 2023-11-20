import { render, screen } from '@testing-library/react';
import { SourceStatus } from 'ts/types';
import TitleContainer from './TitleContainer';

const title = 'Camera 1';

const renderComponent = (status: SourceStatus = SourceStatus.Active) => {
  return render(<TitleContainer title={title} status={status} />);
};

test('component has title', () => {
  renderComponent();

  const titleElement = screen.getByText(title);
  expect(titleElement).toBeInTheDocument();
});

test('component has active status', () => {
  renderComponent();

  const statusElement = screen.getByLabelText(/status-icon/i);
  expect(statusElement).toBeInTheDocument();
  expect(statusElement).toHaveAttribute(
    'class',
    expect.stringMatching(/titleStatusIndicator/)
  );
});

test('component has inactive status', () => {
  renderComponent(SourceStatus.Inactive);

  const statusElement = screen.getByLabelText(/status-icon/i);
  expect(statusElement).toBeInTheDocument();
  expect(statusElement).toHaveAttribute(
    'class',
    expect.stringMatching(/titleStatusIndicatorInactive/)
  );
});
