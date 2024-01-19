import { useEffect, useState, useCallback, Fragment } from 'react';
import { useInterval } from 'usehooks-ts';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ContentBar from 'components/ContentBar/ContentBar';
import MainContent from 'components/MainContent/MainContent';
import MovementsTimelineEmbed from 'components/MovementsTimelineEmbed/MovementsTimelineEmbed';
// import MovementsTimelineContainer from 'components/MovementsTimelineVertical/MovementsTimelineContainer';
import { MovementsTimelineVerticalV2Single } from 'components/MovementsTimelineVerticalV2';
import { Source, SourceStatus } from 'ts/types';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import { useWSSContext } from 'context/webSocketContext';
import { wsSources } from 'enums/queryKeys';
import { TOPICS, TYPES } from 'enums/wss';
import { getStartImagesStreamMsg } from 'services/wsMessage';
import ImageViewer from './ImageViewer/ImageViewer';
import styles from './Device.module.scss';

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
  const { isSmall } = useMainLayoutContext();

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
            topic === TOPICS.FRONT_END_VIDEO &&
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

  const EmbedComponent = isSmall ? Fragment : MovementsTimelineEmbed;

  return (
    <>
      <ContentBar>
        <Typography variant="LabelMedium">{peripheralId}</Typography>
      </ContentBar>
      <MainContent>
        <EmbedComponent peripheralId={peripheralId} showToolbar initiallyLoaded>
          <div className={styles.mainContent}>
            <ImageViewer src={source?.src} />
            {isSmall && (
              // <MovementsTimelineContainer peripheralId={peripheralId} />
              <MovementsTimelineVerticalV2Single peripheralId={peripheralId} />
            )}
          </div>
        </EmbedComponent>
      </MainContent>
    </>
  );
};

export default Device;
