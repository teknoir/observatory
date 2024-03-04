import { dataWithDelay } from './utils.ts';

export const fetchCountEventsMock = () => {
  return dataWithDelay({
    count: 21,
  });
};
