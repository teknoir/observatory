// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import moment from 'moment';
import _shuffle from 'lodash/shuffle';
import { IAlertEvent } from 'ts/types';
import { getUniqueID, dataWithDelay } from './utils';

const defaultPeripheralId = 'parkinglot1';

const alertsSchemaList = [
  [
    defaultPeripheralId,
    {
      hours: [2, 15, 22],
      minute: 12,
      duration: 1,
    },
  ],
  [
    'parkinglot2',
    {
      hours: [5, 7, 10],
      minute: 25,
      duration: 3,
    },
  ],
  [
    'parkinglot3',
    {
      hours: [13, 16, 20, 22],
      minute: 50,
      duration: 2,
    },
  ],
  [
    'parkinglot4',
    {
      hours: [14, 20, 21],
      minute: 5,
      duration: 2,
    },
  ],
  [
    'parkinglot5',
    {
      hours: [3, 7, 11],
      minute: 33,
      duration: 3,
    },
  ],
  [
    'parkinglot6',
    {
      hours: [1, 4],
      minute: 42,
      duration: 1,
    },
  ],
  [
    'parkinglot7',
    {
      hours: [2, 15, 22],
      minute: 12,
      duration: 1,
    },
  ],
  [
    'parkinglot8',
    {
      hours: [5, 7, 10],
      minute: 25,
      duration: 3,
    },
  ],
  [
    'parkinglot9',
    {
      hours: [13, 16, 20, 22],
      minute: 50,
      duration: 2,
    },
  ],
  [
    'parkinglot10',
    {
      hours: [14, 20, 21],
      minute: 5,
      duration: 2,
    },
  ],
  [
    'boxerproperty3',
    {
      hours: [3, 7, 11],
      minute: 33,
      duration: 3,
    },
  ],
  [
    'catalytic',
    {
      hours: [1, 4],
      minute: 42,
      duration: 1,
    },
  ],
];
const alertsSchema = new Map<string, object>(alertsSchemaList);

// const getAlertsHours = () => {
//   const res = new Map<number, string[]>();
//   alertsSchema.forEach((value, key) => {
//     value.hours.forEach((hour) => {
//       const arr = res.get(hour) || [];
//       arr.push(key);
//       res.set(hour, arr);
//     });
//   });
//   return res;
// };

export const fetchAlertsByPeripheralIdMock = ({
  peripheralId,
  fromDate,
}): Promise<IAlertEvent[]> => {
  const res = [];
  const now = moment();
  const documents = [];
  const dateFrom = fromDate.clone();
  const { duration, hours, minute } =
    alertsSchema.get(peripheralId) || alertsSchema.get(defaultPeripheralId);
  while (dateFrom.isBefore(now)) {
    dateFrom.add(1, 'hour');
    const currentHour = dateFrom.hour();
    if (hours.includes(currentHour)) {
      const time = dateFrom.clone();
      const startTime = time.add().minute(minute);
      const item = {
        detection_id: getUniqueID(),
        type: alertItemBase.type,
        start_time: startTime.format(),
        duration: duration * 1000,
        severity: 'low',
      };
      documents.push(item);
    }
  }
  res.push({
    peripheral_id: peripheralId,
    peripheral_name: peripheralId,
    documents,
  });
  return dataWithDelay(res);
};

export const fetchAllAlertsMock = ({ fromDate }): Promise<IAlertEvent[]> => {
  const res = [];
  const alertsSchema = new Map(_shuffle(alertsSchemaList));
  alertsSchema.forEach((value, key) => {
    const documents = [];
    const now = moment();
    const dateFrom = fromDate.clone();
    const { hours, duration, minute } = value;
    while (dateFrom.isBefore(now)) {
      dateFrom.add(1, 'hour');
      const currentHour = dateFrom.hour();
      if (hours.includes(currentHour)) {
        const time = dateFrom.clone();
        const startTime = time.add().minute(minute);
        const item = {
          detection_id: getUniqueID(),
          type: alertItemBase.type,
          start_time: startTime.format(),
          duration: duration * 1000,
          severity: 'low',
        };
        documents.push(item);
      }
    }
    res.push({
      peripheral_id: key,
      peripheral_name: key,
      documents,
    });
  });
  return dataWithDelay(res);
};

export const fetchAlertMock = (detectionId) => {
  return dataWithDelay({
    ...alertItemBase,
    detection_id: detectionId,
    video_url:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    video_snapshot: 'https://picsum.photos/600/300',
  });
};

export const alertItemBase = {
  detection_id: '651b3ef3a34a910001348126',
  annotations: [],
  branch: 'texas',
  count: 78,
  country: 'us',
  duration: 9694,
  end_time: '2023-10-02T22:06:42.303Z',
  facility: 'houston',
  from_device: 'demo-orin-se',
  group: 'demo',
  label: 'person',
  last_modification: '2023-10-02T22:10:45.390Z',
  message:
    'WARNING: nearvehicle observed at SITE:teknoir, ZONE:office at 2023-10-02T22:06:32.609Z',
  peripheral_id: 'parkinglot2',
  peripheral_name: 'parkinglot2',
  peripheral_type: 'camera',
  proof: {
    id: '651b3ef3a34a910001348126',
  },
  region: 'southwest',
  sent: '2023-10-02T22:09:52.410Z',
  severity: 'WARNING',
  site: 'teknoir',
  start_time: '2023-10-02T22:06:32.609Z',
  type: 'loitering',
  zone: 'office',
};
