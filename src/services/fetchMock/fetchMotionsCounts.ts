// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import moment from 'moment';
import { IMotionsCounts } from 'ts/types';
import { dataWithDelay } from './utils';

export const fetchMotionsCountsMock = ({
  startDate,
}): Promise<IMotionsCounts> => {
  const cardsInPerDay = 3;
  const cardsOutPerDay = 3;
  const peopleInPerDay = 2;
  const peopleOutPerDay = 2;
  const now = moment();
  const diff = now.diff(startDate, 'days');
  const res = {
    'Cars in': cardsInPerDay * diff,
    'Cars out': cardsOutPerDay * diff,
    'People in': peopleInPerDay * diff,
    'People oit': peopleOutPerDay * diff,
  };
  return dataWithDelay(res);
};
