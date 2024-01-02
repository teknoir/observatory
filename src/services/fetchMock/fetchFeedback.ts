// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { dataWithDelay } from './utils.ts';

export const fetchFeedbackMock = () => {
  return dataWithDelay({
    ground_truth: true,
    username: 'John Wayne',
    comment:
      'We double checked this and was actually a theft, called the police at 15:42.',
    creation_time: '2023-11-02T22:06:42.303Z',
  });
};
