import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
// import { useParams } from 'react-router-dom';
import useWebSocket, { TYPES } from "hooks/useWebSocket";
// import moment from 'moment';
import AlertsMotionsTabs from "components/AlertsMotionsTabs/AlertsMotionsTabs";
import AppBar from 'components/AppBar/AppBar';
import MainContent from 'components/MainContent/MainContent';
import { Source } from "ts/types";
import { wsSources } from "enums/queryKeys";
import RightSideBar from "layouts/MainLayout/RightSideBar";
import ImageViewer from "./ImageViewer/ImageViewer";

const Device = () => {
  // const { peripheralId = "" } = useParams();
  const peripheralId = "6";
  const queryClient = useQueryClient();
  const sources: {[p: string]: Source} = queryClient.getQueryData([wsSources])!;
  console.log('source', sources)
  // const source = sources[peripheralId];
  const [source, setSource] = useState<Source>(sources?.[peripheralId]);

  const {
    lastMessage,
  } = useWebSocket();

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const { type } = data;
      switch (type) {
        case TYPES.MESSAGE: {
          const { event } = data;
          if (event) {
            const { topic, image, peripheral } = event;
            if (topic === 'front-end-video' && peripheralId === peripheral?.id) {
              // setSource(image)
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setSource({
                src: image
              })
            }
          }
          break;
        }
      }
    }
  }, [lastMessage, peripheralId])

  return (
    <>
      <AppBar>
        {peripheralId}
      </AppBar>
      <MainContent>
        <ImageViewer src={source?.src} />
      </MainContent>
      <RightSideBar>
        <AlertsMotionsTabs peripheralId={peripheralId} />
      </RightSideBar>
    </>
  )
}

export default Device;
