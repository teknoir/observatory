import { useState, useEffect, useCallback, useContext } from 'react';
import { useInterval } from 'usehooks-ts';
import { useQueryClient } from '@tanstack/react-query';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { useWSSContext } from 'context/webSocketContext';
import { wsSources } from 'enums/queryKeys';
import { TOPICS, TYPES, CAROUSEL_REFRESH_RATE } from 'enums/wss';
import { useTestImages } from 'enums/mockData';
import { CarouselMode, HomeContextProps, Source, SourceStatus } from 'ts/types';
import { getStartImagesStreamMsg } from 'services/wsMessage';
import SurveillanceCarousel from './SurveillanceCarousel';
import Skeleton from './Skeleton/Skeleton';
import { createRandomSources } from './utils';

interface Props {
  mode?: CarouselMode;
}

const SurveillanceCarouselContainer = ({ mode }: Props) => {
  const queryClient = useQueryClient();
  const cachedSources = queryClient.getQueryData([wsSources]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sources, setSources] = useState(
    cachedSources
      ? new Map(Object.entries(cachedSources))
      : createRandomSources(0)
  );
  const { lastMessage, sendMessage } = useWSSContext();
  const { layout, setNumCameras } = useContext(HomeContext) as HomeContextProps;

  const sourcesSize = sources.size;

  // TODO: only for testing, remove this later
  useEffect(() => {
    const shouldUseTestImages = location?.search.includes(useTestImages);
    if (shouldUseTestImages) {
      setTimeout(() => {
        setSources(createRandomSources(30));
      }, 3000);
    }
  }, []);

  useInterval(() => {
    if (sources.size > 0) {
      sources.forEach((source) => {
        const messageObj = getStartImagesStreamMsg(
          source.peripheralName,
          source.device,
          1
        );
        sendMessage(JSON.stringify(messageObj));
      });
    }
  }, CAROUSEL_REFRESH_RATE);

  useEffect(() => {
    if (!isLoaded && sourcesSize > 0) {
      setIsLoaded(true);
      setNumCameras(sourcesSize);
    }
  }, [isLoaded, sourcesSize, setNumCameras]);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const { type, meta } = data;
      switch (type) {
        case TYPES.MESSAGE: {
          const { topic, image, peripheral, device } = data;
          const peripheralId = peripheral?.id;
          if (topic === TOPICS.FRONT_END_VIDEO) {
            const source = {
              src: image,
              peripheralId,
              peripheralName: peripheral?.name,
              device,
              status: SourceStatus.Active,
            };
            updateSourceByCameraId(peripheralId, source);
          }
          break;
        }
        case TYPES.INACTIVE: {
          const { ids } = meta;
          inactiveSourcesByCameraId(ids);
          break;
        }
      }
    }
  }, [lastMessage, queryClient]);

  const updateSourceByCameraId = (cameraId: string, source: Source) => {
    setSources((map) => new Map(map.set(cameraId, source)));
  };

  const inactiveSourcesByCameraId = useCallback(
    (cameraIds: string[]) => {
      const newSources = new Map(sources);
      cameraIds.forEach((cameraId) => {
        const source = newSources.get(cameraId);
        if (source) {
          newSources.set(cameraId, {
            ...source,
            status: SourceStatus.Inactive,
          });
        }
      });
      setSources(newSources);
    },
    [sources]
  );

  const selectedLayout = mode || layout;

  // TODO: remove in future when we have clear vision of this feature
  // const deleteSourcesByCameraIds = (cameraIds: string[]) => {
  //   const newSources = new Map(sources);
  //   cameraIds.forEach((cameraId) => {
  //     newSources.delete(cameraId);
  //   });
  //   setSources(newSources);
  // };

  if (!isLoaded) return <Skeleton />;

  return <SurveillanceCarousel mode={selectedLayout} sources={sources} />;
};

export default SurveillanceCarouselContainer;
