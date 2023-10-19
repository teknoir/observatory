import { useState, useEffect } from "react";
import { CarouselMode, Source } from "ts/types";
import useWebSocket, { TYPES } from "hooks/useWebSocket";
import SurveillanceCarousel from "./SurveillanceCarousel";
import Skeleton from "./Skeleton/Skeleton";
import { createRandomSources } from "./utils";

interface Props {
  mode: CarouselMode;
}

const SurveillanceCarouselContainer = ({ mode }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sources, setSources] = useState(createRandomSources(0));
  const {
    lastMessage,
  } = useWebSocket();

  const sourcesSize = sources.size;

  // TODO: only for testing, remove this later
  useEffect(() => {
    const useTestImages = location?.search.includes('useTestImages');
    if (useTestImages) {
      setTimeout(() => {
        setSources(createRandomSources(3));
      }, 3000)
    }
  }, [])

  useEffect(() => {
    if (!isLoaded && sources.size > 0) {
      setIsLoaded(true);
    }
  }, [isLoaded, sourcesSize])

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const { type, meta } = data;
      switch (type) {
        case TYPES.MESSAGE: {
          const { event } = data;
          if (event) {
            const { topic, image, peripheral } = event;
            const peripheralId = peripheral?.id;
            if (topic === 'front-end-video') {
              updateSourceByCameraId(peripheralId, {
                src: image,
                peripheralId,
                peripheralName: peripheral?.name,
              })
            }
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
  }, [lastMessage])

  const updateSourceByCameraId = (cameraId: string, source: Source) => {
    setSources(map => new Map(map.set(cameraId, source)));
  }

  const deleteSourcesByCameraIds = (cameraIds: string[]) => {
    const newSources = new Map(sources);
    cameraIds.forEach(cameraId => {
      newSources.delete(cameraId);
    })
    setSources(newSources);
  }

  if (!isLoaded) return (
    <Skeleton />
  )

  return (
    <SurveillanceCarousel
      mode={mode}
      sources={sources}
    />
  )
}

export default SurveillanceCarouselContainer;
