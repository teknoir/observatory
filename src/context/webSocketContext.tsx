import React, { createContext, useContext, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useQueryClient } from '@tanstack/react-query';
import { IAlertEvent, Source } from 'ts/types';
import { TOPICS, TYPES } from 'enums/wss';
import { wsSources, notifications } from 'enums/queryKeys';

const socketUrl = import.meta.env.VITE_WS_SERVER;

export const isOpenWS = (readyState: ReadyState) =>
  readyState === ReadyState.OPEN;

type WSSContextValue = {
  isOpened: boolean;
  lastMessage: MessageEvent | null;
  sendMessage: (message: string) => void;
};

const defaultValue: WSSContextValue = {
  isOpened: false,
  lastMessage: null,
  sendMessage: () => {},
};

const WSSContext = createContext(defaultValue);

interface Props {
  children: React.ReactElement;
}
export const WSSProvider = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log('WS opened CONTEXT'),
    onError: (event) => console.log('WS error', event),
    shouldReconnect: () => true,
    share: true,
  });

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      const { type } = data;
      switch (type) {
        case TYPES.MESSAGE: {
          const { topic, image, peripheral, event, device } = data;
          const peripheralId = peripheral?.id;
          if (topic === TOPICS.FRONT_END_VIDEO) {
            const source = {
              src: image,
              peripheralId,
              peripheralName: peripheral?.name,
              device,
            };
            // Save source to queryClient
            queryClient.setQueryData(
              [wsSources],
              (oldData: { [p: string]: Source }) => ({
                ...(oldData || {}),
                [source.peripheralId]: source,
              })
            );
          }
          if (topic === TOPICS.FRONT_END_ALERT) {
            queryClient.setQueryData<IAlertEvent[]>(
              [notifications],
              (oldData) => [...(oldData || []), event]
            );
          }
          break;
        }
      }
    }
  }, [lastMessage, queryClient]);

  const getContextValue = () => ({
    lastMessage,
    sendMessage,
    isOpened: isOpenWS(readyState),
  });

  return (
    <WSSContext.Provider value={getContextValue()}>
      {children}
    </WSSContext.Provider>
  );
};

export const useWSSContext = () => {
  return useContext(WSSContext);
};
