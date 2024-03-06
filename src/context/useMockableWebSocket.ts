import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import mockMessagesJson from './mockFrontEndVideoMessages.json';
import { Options } from 'react-use-websocket/src/lib/types.ts';
import { useProductionData } from 'enums/mockData';

interface MockMessage {
  type: string;
  time: number;
  opcode: number;
  data: string;
}
const mockMessages: MockMessage[] = mockMessagesJson as MockMessage[];

// Create a wrapper around useWebSocket
export function useMockableWebSocket(socketUrl: string, options: Options) {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl,
    options
  );
  const [mockedLastMessage, setMockedLastMessage] = useState<
    MessageEvent | never
  >(new MessageEvent('', mockMessages[0])); // State to store the mocked last message

  const replayMessagesLoop = async () => {
    let delay = 0;
    let messageIndex = 0;

    // loop through the real production messages forever
    // eslint-disable-next-line no-constant-condition
    while (true) {
      setMockedLastMessage(new MessageEvent('', mockMessages[messageIndex]));
      const message = mockMessages[messageIndex];

      // generate messages also for the device view
      message['data'] = message['data'].replace(
        'front-end-video',
        'raw-front-end-video'
      );
      await new Promise((r) => setTimeout(r, 200));

      setMockedLastMessage(new MessageEvent('', message));
      messageIndex = (messageIndex + 1) % mockMessages.length;

      delay =
        messageIndex > 0
          ? (mockMessages[messageIndex].time -
              mockMessages[messageIndex - 1].time) *
            1000
          : 0;

      await new Promise((r) => setTimeout(r, delay));
    }
  };

  useEffect(() => {
    if (location?.search.includes(useProductionData)) {
      (async () => {
        await replayMessagesLoop();
      })();
    }
  }, []);

  // If using useProductionData query param, return the mocked lastMessage
  if (location?.search.includes(useProductionData)) {
    return {
      ...options,
      lastMessage: mockedLastMessage,
      sendMessage,
      readyState,
    };
  }

  // otherwise return the real useWebSocket lastMessage values
  return {
    sendMessage,
    lastMessage,
    readyState,
  };
}
