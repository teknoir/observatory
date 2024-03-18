import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { Options } from 'react-use-websocket/src/lib/types.ts';
import { useProductionData } from 'enums/mockData.ts';
import { TOPICS } from 'enums/wss';

interface MockMessage {
  type: string;
  time: number;
  opcode: number;
  data: string;
}
let mockMessagesJson: MockMessage[];

// Create a wrapper around useWebSocket
export function useMockableWebSocket(socketUrl: string, options: Options) {
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl,
    options
  );

  const { mockedLastMessage } = useMockableData();
  const useMockProductionData = location?.search.includes(useProductionData);

  return {
    sendMessage,
    lastMessage: useMockProductionData ? mockedLastMessage : lastMessage,
    readyState,
  };
}

const useMockableData = () => {
  const [mockedLastMessage, setMockedLastMessage] = useState<
    MessageEvent | never
  >(new MessageEvent('', { data: JSON.stringify({ type: '' }) })); // State to store the mocked last message

  const isProductionData = location?.search.includes(useProductionData);

  useEffect(() => {
    if (isProductionData) {
      (async () => {
        // Dynamically import the JSON file
        const module = await import('./mockFrontEndVideoMessages.json');
        mockMessagesJson = module.default as MockMessage[];
        await replayMessagesLoop();
      })();
    }
  }, [isProductionData]);

  const replayMessagesLoop = async () => {
    let delay = 0;
    let messageIndex = 0;

    // loop through the real production messages forever
    // eslint-disable-next-line no-constant-condition
    while (true) {
      setMockedLastMessage(
        new MessageEvent('', mockMessagesJson[messageIndex])
      );
      const message = mockMessagesJson[messageIndex];

      // generate messages also for the device view
      message['data'] = message['data'].replace(
        TOPICS.FRONT_END_VIDEO,
        TOPICS.RAW_FRONT_END_VIDEO
      );
      await new Promise((r) => setTimeout(r, 200));

      setMockedLastMessage(new MessageEvent('', message));
      messageIndex = (messageIndex + 1) % mockMessagesJson.length;

      delay =
        messageIndex > 0
          ? (mockMessagesJson[messageIndex].time -
              mockMessagesJson[messageIndex - 1].time) *
            1000
          : 0;

      await new Promise((r) => setTimeout(r, delay));
    }
  };

  return {
    mockedLastMessage,
  };
};
