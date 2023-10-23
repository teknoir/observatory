import { useEffect } from "react";
import useWebSocket from 'react-use-websocket';

const socketUrl = import.meta.env.VITE_WS_SERVER;

export const TYPES = {
  MESSAGE: 'MESSAGE',
  INACTIVE: 'INACTIVE',
  START_IMAGES_STREAM: 'START_IMAGES_STREAM',
};

const useWebSocketHook = () => {
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log('WS opened'),
    onError: (event) => console.log('WS error', event),
    shouldReconnect: () => true,
    share: true,
  });

  useEffect(() => {
    return () => {
      getWebSocket()?.close()
    };
  }, [getWebSocket]);

  return {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket
  }
}

export default useWebSocketHook;
