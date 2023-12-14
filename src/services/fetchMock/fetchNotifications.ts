import { INotifications, INotificationsRequest } from 'ts/types';
import { getUniqueID, dataWithDelay } from './utils';

export const fetchNotificationsMock = (params: INotificationsRequest) => {
  const { fromDate, status, limit = 100 } = params;
  const res: INotifications[] = [];
  const peripheralId = `peripheral_id${status ? `_${status}` : ''}`;
  const duration = 14000;
  const dateFrom = fromDate;
  const severity = 'WARNING';
  const type = 'nearvehicle';
  for (let i = 0; i < limit; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dateFrom.add(1, 'hour');
    const uniqueId = getUniqueID();
    const detectionId = uniqueId;
    const item = {
      detection_id: detectionId,
      duration: duration,
      peripheral_id: peripheralId,
      peripheral_name: peripheralId,
      severity: severity,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      start_time: dateFrom.format(),
      type: type,
    };
    res.push(item);
  }
  return dataWithDelay(res.reverse());
};
