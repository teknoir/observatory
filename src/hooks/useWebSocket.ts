import useWebSocket from 'react-use-websocket';

// const socketUrl = import.meta.env.VITE_WS_SERVER;
const socketUrl = 'wss://teknoir.dev/demonstrations/sdmc-wss-mqtt:8080';

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
