import { useEffect, useState, useCallback } from 'react';
import { useInterval } from 'usehooks-ts';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import { MovementsTimelineSingle } from 'components/MovementsTimeline';
import { Source, SourceStatus } from 'ts/types';
import { useWSSContext } from 'context/webSocketContext';
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

  const { lastMessage, sendMessage, isOpened } = useWSSContext();

  const playVideo = useCallback(() => {
    if (isOpened && peripheralName) {
      const messageObj = {
        type: TYPES.START_IMAGES_STREAM,
        peripheralName,
        duration: DURATION,
        device: source?.device,
      };
      sendMessage(JSON.stringify(messageObj));
    }
  }, [isOpened, peripheralName, source]);

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
          const { topic, image, peripheral, device } = data;
          if (
            topic === TOPICS.FRONT_END_VIDEO &&
            peripheralName === peripheral?.name
          ) {
            setSource({
              src: image,
              peripheralId: peripheral?.id,
              peripheralName: peripheral?.name,
              device,
              status: SourceStatus.Active,
            });
          }
          break;
        }
      }
    }
  }, [lastMessage, peripheralName]);

  return (
    <>
      <AppBar>
        <Typography variant="LabelMedium">{peripheralId}</Typography>
      </AppBar>
      <MainContent>
        <ImageViewer src={source?.src} />
        <div className={styles.movementsChart}>
          <MovementsTimelineSingle
            peripheralName={peripheralName}
            peripheralId={peripheralId}
          />
        </div>
      </MainContent>
    </>
  );
};

export default Device;
