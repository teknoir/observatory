import { dataWithDelay } from './utils.ts';

export const fetchFeedbackMock = (detectionId) => {
  return dataWithDelay({
    detection_id: detectionId,
  });
};
