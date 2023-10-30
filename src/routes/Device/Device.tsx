import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from 'react-router-dom';
import useWebSocket, { TYPES, isOpenWS } from "hooks/useWebSocket";
import AlertsMotionsTabs from "components/AlertsMotionsTabs/AlertsMotionsTabs";
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import { MovementsTimelineSingle } from 'components/MovementsTimeline';
import { Source } from "ts/types";
import { wsSources } from "enums/queryKeys";
import RightSideBar from "layouts/MainLayout/RightSideBar";
import ImageViewer from "./ImageViewer/ImageViewer";
import styles from "./Device.module.scss";

const Device = () => {
  const { peripheralId = "" } = useParams();
  const queryClient = useQueryClient();
  const sources: {[p: string]: Source} = queryClient.getQueryData([wsSources])!;
  const [source, setSource] = useState<Source>(sources?.[peripheralId]);
  const [isPlay, setIsPlay] = useState(false);

  const {
    lastMessage,
    readyState,
    sendMessage
  } = useWebSocket();

  const isOpened = isOpenWS(readyState);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const { type } = data;
      switch (type) {
        case TYPES.MESSAGE: {
          const { topic, image, peripheral } = data;
          if (topic === 'front-end-video' && peripheralId === peripheral?.id) {
            // setSource(image)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setSource({
              src: image
            })
          }
          break;
        }
      }
    }
  }, [lastMessage, peripheralId])

  useEffect(() => {
    if (!isPlay && isOpened) {
      const messageObj = {
        type: TYPES.START_IMAGES_STREAM,
        peripheralId
      };
      sendMessage(JSON.stringify(messageObj));
      setIsPlay(true);
    }
  }, [isPlay, isOpened, peripheralId])

  return (
    <>
      <AppBar>
        {peripheralId}
      </AppBar>
      <MainContent>
        <ImageViewer src={source?.src} />
        <div className={styles.movementsChart}>
          <MovementsTimelineSingle peripheralId={peripheralId} />
        </div>
      </MainContent>
      <RightSideBar>
        <AlertsMotionsTabs peripheralId={peripheralId} />
      </RightSideBar>
    </>
  )
}

export default Device;
