import { useState, useEffect } from "react";
import { CarouselMode } from "ts/types";
import useWebSocket, { TYPES } from "hooks/useWebSocket";
import SurveillanceCarousel from "./SurveillanceCarousel";
import { createRandomSources } from "./utils.ts";

interface Props {
  mode: CarouselMode;
}

const SurveillanceCarouselContainer = ({ mode }: Props) => {
  const [sources, setSources] = useState(createRandomSources(1));
  const {
    lastMessage,
    sendMessage,
  } = useWebSocket();

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const { type, message, meta } = data;
      switch (type) {
        case TYPES.MESSAGE: {
          const { peripheral: { id: cameraId }, image } = message;
          updateSourceByCameraId(cameraId, image)
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

  const updateSourceByCameraId = (cameraId: string, src: string) => {
    setSources(map => new Map(map.set(cameraId, { src })));
  }

  const deleteSourcesByCameraIds = (cameraIds: string[]) => {
    const newSources = new Map(sources);
    cameraIds.forEach(cameraId => {
      newSources.delete(cameraId);
    })
    setSources(newSources);
  }

  const onSetMainSource = (cameraId: string) => {
    sendMessage(JSON.stringify({
      type: 'START_IMAGES_STREAM',
      cameraId
    }));
  }

  return (
    <SurveillanceCarousel
      mode={mode}
      sources={sources}
      onSetMainSource={onSetMainSource}
    />
  )
}

export default SurveillanceCarouselContainer;
