// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import moment from 'moment';
import _pick from "lodash/pick";
import { IAlertEvent } from "ts/types";
import { getUniqueID, dataWithDelay } from './utils';

// const startDate = moment().subtract(1, 'days');
// const startDate = moment().startOf('day');
// const startDate = moment().subtract(7, 'days').startOf('day');

const motionsSchema = new Map<string, object>([
  ['parkinglot1', {
    minutes: [5, 28, 40],
    duration: 15,
  }],
  ['parkinglot2', {
    minutes: [10, 18, 55],
    duration: 10,
  }],
  ['parkinglot3', {
    minutes: [4, 12, 18, 36, 48],
    duration: 30,
  }],
  ['parkinglot4', {
    minutes: [35, 50],
    duration: 20,
  }],
  ['parkinglot5', {
    minutes: [11, 36, 43],
    duration: 18,
  }],
  ['parkinglot6', {
    minutes: [15, 20, 25],
    duration: 25,
  }],
  ['parkinglot7', {
    minutes: [5, 28, 40],
    duration: 15,
  }],
  ['parkinglot8', {
    minutes: [10, 18, 55],
    duration: 10,
  }],
  ['parkinglot9', {
    minutes: [4, 12, 18, 36, 48],
    duration: 30,
  }],
  ['parkinglot10', {
    minutes: [35, 50],
    duration: 20,
  }],
  ['parkinglot11', {
    minutes: [11, 36, 43],
    duration: 18,
  }],
  ['catalytic', {
    minutes: [15, 20, 25],
    duration: 25,
  }]
])

const getMotionMinutes = () => {
  const res = new Map<number, string[]>();
  motionsSchema.forEach((value, key) => {
    value.minutes.forEach(minute => {
      const arr = res.get(minute) || [];
      arr.push(key);
      res.set(minute, arr);
    })
  })
  return res;
}

export const fetchMotionsByPeripheralIdMock = ({
  peripheralId,
  startDate,
}, fields: string[] = []): Promise<IAlertEvent[]> => {
  const res = [];
  const now = moment();
  const dateFrom = startDate.clone();
  const { duration, minutes } = motionsSchema.get(peripheralId);
  while(dateFrom.isBefore(now)) {
    dateFrom.add(1, 'hour');
    minutes.forEach(minute => {
      const time = dateFrom.clone();
      const startTime = time.add().minute(minute)
      let item = {
        ...motionItemBase,
        detection_id: getUniqueID(),
        peripheral_id: peripheralId,
        peripheral_name: peripheralId,
        start_time: startTime.format(),
        end_time: startTime.add(duration, 'seconds').format(),
      }
      if (fields.length) {
        item = _pick(item, fields);
      }
      res.push(item)
    })
  }
  return dataWithDelay(res)
}

export const fetchAllMotionsMock = ({
  startDate,
}, fields: string[] = []) => {
  const res = [];
  const now = moment();
  const dateFrom = startDate.clone();
  const minutes = getMotionMinutes();
  while(dateFrom.isBefore(now)) {
    dateFrom.add(1, 'hour');
    minutes.forEach((peripheralIds, minute) => {
      peripheralIds.forEach(peripheralId => {
        const { duration } = motionsSchema.get(peripheralId);
        const time = dateFrom.clone();
        const startTime = time.add().minute(minute)
        let item = {
          ...motionItemBase,
          detection_id: getUniqueID(),
          peripheral_id: peripheralId,
          peripheral_name: peripheralId,
          start_time: startTime.format(),
          end_time: startTime.add(duration, 'seconds').format(),
        };
        if (fields.length) {
          item = _pick(item, fields);
        }
        res.push(item)
      })
    })
  }
  return dataWithDelay(res)
}

const motionItemBase = {
  "detection_id": "651b324da34a910001346676",
  "branch": "texas",
  "country": "us",
  "end_time": "2023-10-02T21:13:00.439Z",
  "facility": "houston",
  "group": "demo",
  "label": "person",
  "last_modification": "2023-10-02T21:16:10.096Z",
  "lineage": [
    {
      "name": "gstreamer-mqtt-capture",
      "version": "'0.0.1",
      "runtime": "go1.21.1"
    },
    {
      "name": "yolov7-bytetrack-5",
      "version": "1.0.0",
      "runtime": 0.07046158900084265
    }
  ],
  "name": "object-person",
  "peripheral_id": "parkinglot2",
  "peripheral_name": "parkinglot2",
  "peripheral_type": "camera",
  "region": "southwest",
  "site": "teknoir",
  "start_time": "2023-10-02T21:12:45.979Z",
  "type": "nearvehicle",
  "zone": "office",
  "count": 118,
  "duration": 14000
};
