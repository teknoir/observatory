import { dataWithDelay } from './utils.ts';

export const fetchFeedbackMock = (detectionId: string) => {
  return dataWithDelay({
    detection_id: detectionId,
  });
};
