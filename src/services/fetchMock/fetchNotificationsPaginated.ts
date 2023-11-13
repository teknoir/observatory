// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import moment from 'moment';
import { IAlertEvent } from 'ts/types';
import { getUniqueID, dataWithDelay } from './utils';
import { alertItemBase } from './fetchAlerts';

interface fetchNotificationsPaginatedProps {
  current_page: number;
  total_pages: number;
  total_items: number;
  page_size: number;
  data: IAlertEvent[];
}

export const fetchNotificationsPaginatedMock = (
  page: number = 1,
  pageSize: number = 10
): fetchNotificationsPaginatedProps => {
  const res = {
    current_page: 1,
    total_pages: 10,
    total_items: 100,
    page_size: 10,
    data: [],
  };
  const peripheralId = 'parkinglot1';
  const duration = 14;
  const dateFrom = moment().subtract(1, 'days').startOf('day');

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  for (let i = startIndex; i < endIndex; i++) {
    dateFrom.add(1, 'hour');
    const isVerified = false; // TODO: Can we assume that all alerts from this notifications payload are unverified?
    const isSeen = i % 3 == 0;
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
      is_seen: isSeen,
    };
    res.data.push(item);
  }
  return dataWithDelay(res);
};
