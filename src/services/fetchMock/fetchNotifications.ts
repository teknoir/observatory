import { INotifications, INotificationsRequest } from 'ts/types';
import { getUniqueID, dataWithDelay } from './utils';

export const fetchNotificationsMock = (params: INotificationsRequest) => {
  const { fromDate, status, limit = 30 } = params;
  const res: INotifications[] = [];
  const peripheralId = 'peripheral_id';
  const peripheralName = `peripheral_name${status ? `_${status}` : ''}`;
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
      peripheral_name: peripheralName,
      severity: severity,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      start_time: dateFrom.format(),
      type: type,
      video_snapshot: '',
      video_url: '',
    };
    res.push(item);
  }
  return dataWithDelay(res.reverse());
};
