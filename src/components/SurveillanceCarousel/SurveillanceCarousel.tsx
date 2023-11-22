import { useState, useEffect, useContext } from 'react';
import { useInterval } from 'usehooks-ts';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { CarouselMode, SurveillanceCarouselProps } from 'ts/types';
import AllCamerasView from './AllCamerasView/AllCamerasView';
import AlternativeView from './AlternativeView/AlternativeView';
import DetailView from './DetailView/DetailView';
import GeneralView from './GeneralView/GeneralView';

const surveillanceCarouselComponentsByMode = {
  [CarouselMode.AllCamerasView]: AllCamerasView,
  [CarouselMode.AlternativeView]: AlternativeView,
  [CarouselMode.Detail]: DetailView,
  [CarouselMode.General]: GeneralView,
};

const SurveillanceCarousel = ({ mode, sources }: SurveillanceCarouselProps) => {
  const [mainImage, setMainImage] = useState('');
  const { mainImageCarousel, setMainImageCarousel, peripheralIdNotified } =
    useContext(HomeContext);

  // TODO: Clean code after finishing testing
  useEffect(() => {
    console.log('peripheralIdNotified changed: ', peripheralIdNotified);
    if (peripheralIdNotified) {
      setMainSource(peripheralIdNotified);
    }
  }, [peripheralIdNotified]);

  const sourcesSize = sources.size;

  useEffect(() => {
    if (!mainImage && sources.size > 0) {
      setMainImage(sources.keys().next().value);
    }
  }, [mainImage, sourcesSize, sources]);

  useEffect(() => {
    if (mainImageCarousel) {
      setMainSource(mainImageCarousel);
      setMainImageCarousel('');
    }
  }, [mainImageCarousel, setMainImageCarousel]);

  useInterval(() => {
    if (sources.size > 0) {
      setMainImage((prevImgIndex) => {
        const ids = [...sources.keys()];
        let newIndex = '';
        const mainIdx = ids.findIndex((id) => id === prevImgIndex);
        if (!mainImage) {
          newIndex = ids[0];
        } else {
          newIndex = ids[mainIdx + 1] || ids[0];
        }
        return newIndex;
      });
    }
  }, 60000);

  const setMainSource = (cameraId: string) => {
    setMainImage(cameraId);
  };

  const Component = surveillanceCarouselComponentsByMode[mode];
  if (!Component) return null;

  return (
    <Component
      sources={sources}
      mainSource={mainImage}
      setMainSource={setMainSource}
    />
  );
};

export default SurveillanceCarousel;
