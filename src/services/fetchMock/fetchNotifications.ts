// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import moment from 'moment';
import { IAlertEvent } from 'ts/types';
import { getUniqueID, dataWithDelay } from './utils';
import { alertItemBase } from './fetchAlerts';

export const fetchNotificationsMock = (): IAlertEvent[] => {
  const res = [];
  const peripheralId = 'parkinglot1';
  const duration = 14;
  const dateFrom = moment().subtract(1, 'days').startOf('day');
  for (let i = 0; i < 10; i++) {
    dateFrom.add(1, 'hour');
    const isVerified = i <= 7;
    const uniqueId = getUniqueID();
    const detectionId = uniqueId + (isVerified ? 'a' : '1');
    const item = {
      ...alertItemBase,
      detection_id: detectionId,
      peripheral_id: peripheralId,
      peripheral_name: peripheralId,
      start_time: dateFrom.format(),
      end_time: dateFrom.add(duration, 'seconds').format(),
      is_verified: isVerified,
    };
    res.push(item);
  }
  return dataWithDelay(res);
};
