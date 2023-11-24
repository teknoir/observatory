import { render, screen } from '@testing-library/react';
import { CarouselMode, HomeContextProps } from 'ts/types';
import { HomeContext } from 'context/HomeContext/HomeContext';
import CamerasTitle from './CamerasTitle';

const mockedData: HomeContextProps = {
  mainImageCarousel: '',
  setMainImageCarousel: () => '',
  layout: CarouselMode.General,
  setLayout: () => CarouselMode,
  numCameras: 0,
  setNumCameras: () => 0,
};

const renderComponent = (mockedValue: HomeContextProps) => {
  return render(
    <HomeContext.Provider value={mockedValue}>
      <CamerasTitle />
    </HomeContext.Provider>
  );
};

test('component has title', () => {
  renderComponent(mockedData);

  const titleElement = screen.getByText('Cameras (0)');
  expect(titleElement).toBeInTheDocument();
});

test('component has title with correct value of number of cameras', () => {
  const mockedValue = {
    ...mockedData,
    numCameras: 5,
  };

  renderComponent(mockedValue);

  const titleElement = screen.getByText('Cameras (5)');
  expect(titleElement).toBeInTheDocument();
});
