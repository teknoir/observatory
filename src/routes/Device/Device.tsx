import { useEffect, useState, useCallback } from 'react';
import { useInterval } from 'usehooks-ts';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useWebSocket, { isOpenWS } from 'hooks/useWebSocket';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import { MovementsTimelineSingle } from 'components/MovementsTimeline';
import { Source } from 'ts/types';
import { wsSources } from 'enums/queryKeys';
import { TOPICS, TYPES } from 'enums/wss';
import ImageViewer from './ImageViewer/ImageViewer';
import styles from './Device.module.scss';

const DURATION = 10;
const INTERVAL = DURATION * 1000;

const Device = () => {
  const { peripheralId = '', peripheralName = '' } = useParams();
  const queryClient = useQueryClient();
  const sources: { [p: string]: Source } = queryClient.getQueryData([
    wsSources,
  ])!;
  const [source, setSource] = useState<Source>(sources?.[peripheralId]);

  const { lastMessage, readyState, sendMessage } = useWebSocket();

  const isOpened = isOpenWS(readyState);

  const playVideo = useCallback(() => {
    if (isOpened && peripheralName) {
      const messageObj = {
        type: TYPES.START_IMAGES_STREAM,
        peripheralName,
        duration: DURATION,
      };
      sendMessage(JSON.stringify(messageObj));
    }
  }, [isOpened, peripheralName]);

  useEffect(() => {
    if (isOpened) {
      playVideo();
    }
  }, [isOpened]);

  useInterval(() => {
    playVideo();
  }, INTERVAL);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const { type } = data;
      switch (type) {
        case TYPES.MESSAGE: {
          const { topic, image, peripheral } = data;
          if (
            topic === TOPICS.FRONT_END_VIDEO &&
            peripheralName === peripheral?.name
          ) {
            setSource({
              src: image,
              peripheralId: peripheral?.id,
              peripheralName: peripheral?.name,
            });
          }
          break;
        }
      }
    }
  }, [lastMessage, peripheralName]);

  return (
    <>
      <AppBar>{peripheralId}</AppBar>
      <MainContent>
        <ImageViewer src={source?.src} />
        <div className={styles.movementsChart}>
          <MovementsTimelineSingle peripheralId={peripheralId} />
        </div>
      </MainContent>
    </>
  );
};

export default Device;
