import { useEffect, useState, useCallback } from 'react';
import { useInterval } from 'usehooks-ts';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineEmbed from 'components/MovementsTimelineEmbed/MovementsTimelineEmbed';
import { Source, SourceStatus } from 'ts/types';
import { useWSSContext } from 'context/webSocketContext';
import { wsSources } from 'enums/queryKeys';
import { TOPICS, TYPES } from 'enums/wss';
import { getStartImagesStreamMsg } from 'services/wsMessage';
import ImageViewer from './ImageViewer/ImageViewer';

const DURATION = 10;
const INTERVAL = DURATION * 1000;

const Device = () => {
  const { peripheralId = '' } = useParams();
  const queryClient = useQueryClient();
  const sources: { [p: string]: Source } = queryClient.getQueryData([
    wsSources,
  ])!;
  const [source, setSource] = useState<Source>(sources?.[peripheralId]);

  const { lastMessage, sendMessage, isOpened } = useWSSContext();

  const playVideo = useCallback(() => {
    if (isOpened && peripheralId) {
      const messageObj = getStartImagesStreamMsg(
        peripheralId,
        source?.device,
        DURATION
      );
      sendMessage(JSON.stringify(messageObj));
    }
  }, [isOpened, peripheralId, source]);

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
              (topic === TOPICS.FRONT_END_VIDEO || topic === TOPICS.RAW_FRONT_END_VIDEO) &&
            peripheralId === peripheral?.id
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
  }, [lastMessage, peripheralId]);

  return (
    <>
      <AppBar>
        <Typography variant="LabelMedium">{peripheralId}</Typography>
      </AppBar>
      <MainContent>
        <MovementsTimelineEmbed
          peripheralId={peripheralId}
          showToolbar
          initiallyLoaded
        >
          <ImageViewer src={source?.src} />
        </MovementsTimelineEmbed>
      </MainContent>
    </>
  );
};

export default Device;
