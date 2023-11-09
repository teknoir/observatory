import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { CarouselMode, Source } from 'ts/types';
import useWebSocket from 'hooks/useWebSocket';
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
  const { lastMessage } = useWebSocket();

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
          const { topic, image, peripheral } = data;
          const peripheralId = peripheral?.id;
          if (topic === TOPICS.FRONT_END_VIDEO) {
            const source = {
              src: image,
              peripheralId,
              peripheralName: peripheral?.name,
            };
            updateSourceByCameraId(peripheralId, source);
            // Save source to queryClient
            queryClient.setQueryData(
              [wsSources],
              (oldData: { [p: string]: Source }) => ({
                ...(oldData || {}),
                [source.peripheralId]: source,
              })
            );
          }
          break;
        }
        case TYPES.INACTIVE: {
          const { ids } = meta;
          deleteSourcesByCameraIds(ids);
          break;
        }
      }
    }
  }, [lastMessage, queryClient]);

  const updateSourceByCameraId = (cameraId: string, source: Source) => {
    setSources((map) => new Map(map.set(cameraId, source)));
  };

  const deleteSourcesByCameraIds = (cameraIds: string[]) => {
    const newSources = new Map(sources);
    cameraIds.forEach((cameraId) => {
      newSources.delete(cameraId);
    });
    setSources(newSources);
  };

  if (!isLoaded) return <Skeleton />;

  return <SurveillanceCarousel mode={mode} sources={sources} />;
};

export default SurveillanceCarouselContainer;
