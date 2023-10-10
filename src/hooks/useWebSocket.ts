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
    shouldReconnect: () => true,
  });
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
