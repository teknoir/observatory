// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import moment from 'moment';
import { IMotionsCounts, IMotionsActions, IMotionsTypes } from 'ts/types';
import { dataWithDelay } from './utils';

export const fetchMotionsCountsMock = ({
  startDate,
}): Promise<IMotionsCounts> => {
  const carsInPerDay = 3;
  const carsOutPerDay = 3;
  const peopleInPerDay = 2;
  const peopleOutPerDay = 2;
  const now = moment();
  const diff = now.diff(startDate, 'days');
  const res = {
    'Cars in': {
      type: IMotionsTypes.Cars,
      action: IMotionsActions.In,
      number: carsInPerDay * diff,
    },
    'Cars out': {
      type: IMotionsTypes.Cars,
      action: IMotionsActions.Out,
      number: carsOutPerDay * diff,
    },
    'People in': {
      type: IMotionsTypes.People,
      action: IMotionsActions.In,
      number: peopleInPerDay * diff,
    },
    'People out': {
      type: IMotionsTypes.People,
      action: IMotionsActions.Out,
      number: peopleOutPerDay * diff,
    },
  };
  return dataWithDelay(res);
};
