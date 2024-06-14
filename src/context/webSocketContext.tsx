import React, { createContext, useContext, useEffect } from 'react';
import { ReadyState } from 'react-use-websocket';
import { useQueryClient } from '@tanstack/react-query';
import { IAlertEvent, Source } from 'ts/types';
import { TOPICS, TYPES } from 'enums/wss';
import { wsSources, notifications } from 'enums/queryKeys';
import { useMockableWebSocket } from 'hooks/useMockableWebSocket';

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
  const { sendMessage, lastMessage, readyState } = useMockableWebSocket(
    socketUrl,
    {
      onOpen: () => console.log('WS opened CONTEXT'),
      onError: (event) => console.log('WS error', event),
      shouldReconnect: () => true,
      share: true,
    }
  );

  useEffect(() => {
    if (lastMessage) {
      const msg = JSON.parse(lastMessage.data);
      const { type } = msg;
      switch (type) {
        case TYPES.MESSAGE: {
          // Backward compatibility
          const { topic, device } = msg;
          const peripheral = msg.data?.peripheral || msg.peripheral;
          const image = msg.data?.image || msg.image;
          const event = msg.data?.event || msg.event; // Is this really used anywhere?
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
