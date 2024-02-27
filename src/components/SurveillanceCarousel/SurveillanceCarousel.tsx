import { useState, useEffect, useContext } from 'react';
import { useInterval } from 'usehooks-ts';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { useWSSContext } from 'context/webSocketContext';
import { CarouselMode, SurveillanceCarouselProps } from 'ts/types';
import { getStartRawImagesStreamMsg } from 'services/wsMessage';
import AllCamerasView from './AllCamerasView';
import AlternativeView from './AlternativeView';
import DetailView from './DetailView/DetailView';
import GeneralView from './GeneralView';

const surveillanceCarouselComponentsByMode = {
  [CarouselMode.AllCamerasView]: AllCamerasView,
  [CarouselMode.AlternativeView]: AlternativeView,
  [CarouselMode.Detail]: DetailView,
  [CarouselMode.General]: GeneralView,
  [CarouselMode.SideSettingsView]: null,
};

const SurveillanceCarousel = ({
  mode,
  sources,
  parentSetMainImage,
}: SurveillanceCarouselProps) => {
  const [mainImage, setMainImage] = useState('');
  const { mainImageCarousel, setMainImageCarousel, peripheralIdNotified } =
    useContext(HomeContext);
  const { sendMessage } = useWSSContext();

  useEffect(() => {
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

    // upon changing main camera source immediately update state in parent
    // and request changes on the cloud
    parentSetMainImage(cameraId);

    const { peripheralId = '', device = '' } = sources.get(cameraId) ?? {};
    const messageObj = getStartRawImagesStreamMsg(peripheralId, device, 10);
    sendMessage(JSON.stringify(messageObj));
  };

  const Component = surveillanceCarouselComponentsByMode[mode];
  if (!Component) return null;

  return (
    <Component
      sources={sources}
      mainSource={mainImage}
      setMainSource={setMainSource}
      peripheralIdNotified={peripheralIdNotified}
    />
  );
};

export default SurveillanceCarousel;
