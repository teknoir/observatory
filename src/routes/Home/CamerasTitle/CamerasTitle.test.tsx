import { render } from '@testing-library/react';
import CamerasTitle from './CamerasTitle';
import { HomeContext } from 'context/HomeContext/HomeContext';

test('renders CamerasTitle component with default value', () => {
  // Mock the context value for HomeContext
  const mockedValue = {
    numCameras: 5, // Set the desired default value for numCameras
  };

  // Render CamerasTitle component with the provided context value
  const { getByText } = render(
    <HomeContext.Provider value={mockedValue}>
      <CamerasTitle />
    </HomeContext.Provider>
  );

  // Check if the title with the default value is rendered
  const titleElement = getByText('Cameras (5)');
  expect(titleElement).toBeInTheDocument();
});

test('renders CamerasTitle component with null value', () => {
  // Mock the context value for HomeContext
  const mockedValue = {
    numCameras: null, // Set the context value to null for numCameras
  };

  // Render CamerasTitle component with the provided context value
  const { getByText } = render(
    <HomeContext.Provider value={mockedValue}>
      <CamerasTitle />
    </HomeContext.Provider>
  );

  // Check if the title with the default value 'Cameras (0)' is rendered when numCameras is null
  const titleElement = getByText('Cameras (0)');
  expect(titleElement).toBeInTheDocument();
});
