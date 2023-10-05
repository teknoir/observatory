import { useState, useEffect } from "react";
import { CarouselMode } from "ts/types";
import useWebSocket from "hooks/useWebSocket";
import SurveillanceCarousel from "./SurveillanceCarousel";
import { createRandomSources } from "./utils.ts";

interface Props {
  mode: CarouselMode;
}

const SurveillanceCarouselContainer = ({ mode }: Props) => {
  const [sources, setSources] = useState(createRandomSources(10));
  const {
    lastMessage,
  } = useWebSocket();

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const { message } = data;
      if (message) {
        const { peripheral: { id: cameraId }, image } = message;
        updateSourceByCameraId(cameraId, image)
      }
    }
  }, [lastMessage])

  const updateSourceByCameraId = (cameraId: string, src: string) => {
    setSources(map => new Map(map.set(cameraId, { src })));
  }

  return (
    <SurveillanceCarousel
      mode={mode}
      sources={sources}
    />
  )
}

export default SurveillanceCarouselContainer;
