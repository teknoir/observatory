import { useState, useEffect } from "react";
import { CarouselMode, Source } from "ts/types";
import useWebSocket, { TYPES } from "hooks/useWebSocket";
import SurveillanceCarousel from "./SurveillanceCarousel";
import { createRandomSources } from "./utils.ts";

interface Props {
  mode: CarouselMode;
}

const SurveillanceCarouselContainer = ({ mode }: Props) => {
  const [sources, setSources] = useState(createRandomSources(0));
  const {
    lastMessage,
  } = useWebSocket();

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

  return (
    <SurveillanceCarousel
      mode={mode}
      sources={sources}
    />
  )
}

export default SurveillanceCarouselContainer;
