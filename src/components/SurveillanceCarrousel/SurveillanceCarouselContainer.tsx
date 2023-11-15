import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CarouselMode, Source, SourceStatus } from 'ts/types';
import { useWSSContext } from 'context/webSocketContext';
import { wsSources } from 'enums/queryKeys';
import { TOPICS, TYPES } from 'enums/wss';
import SurveillanceCarousel from './SurveillanceCarousel';
import Skeleton from './Skeleton/Skeleton';
import { createRandomSources } from './utils';

interface Props {
  mode: CarouselMode;
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
  const { lastMessage } = useWSSContext();

  const sourcesSize = sources.size;

  // TODO: only for testing, remove this later
  useEffect(() => {
    const useTestImages = location?.search.includes('useTestImages');
    if (useTestImages) {
      setTimeout(() => {
        setSources(createRandomSources(3));
      }, 3000);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded && sources.size > 0) {
      setIsLoaded(true);
    }
  }, [isLoaded, sourcesSize]);

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

  // TODO: remove in future when we have clear vision of this feature
  // const deleteSourcesByCameraIds = (cameraIds: string[]) => {
  //   const newSources = new Map(sources);
  //   cameraIds.forEach((cameraId) => {
  //     newSources.delete(cameraId);
  //   });
  //   setSources(newSources);
  // };

  if (!isLoaded) return <Skeleton />;

  return <SurveillanceCarousel mode={mode} sources={sources} />;
};

export default SurveillanceCarouselContainer;
