// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import moment from 'moment';


const dataWithDelay = (data, ms: number = 500) =>
  new Promise((resolve) => setTimeout(() => {
    resolve(data)
  }, ms))

const getUniqueID = function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

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

// const startDate = moment().subtract(1, 'days');
// const startDate = moment().startOf('day');
// const startDate = moment().subtract(7, 'days').startOf('day');

export const fetchMotionsByPeripheralId = ({
  peripheralId,
  startDate,
}) => {
  console.log(peripheralId,
    startDate)
  const res = [];
  const now = moment();
  const dateFrom = startDate.clone();
  const { duration, minutes } = motionsSchema.get(peripheralId);
  console.log(duration, minutes)
  while(dateFrom.isBefore(now)) {
    dateFrom.add(1, 'hour');
    minutes.forEach(minute => {
      const time = dateFrom.clone();
      const startTime = time.add().minute(minute)
      res.push({
        ...motionItemBase,
        detection_id: getUniqueID(),
        peripheral_id: peripheralId,
        peripheral_name: peripheralId,
        start_time: startTime.format(),
        end_time: startTime.add(duration, 'seconds').format(),
      })
    })
  }
  return dataWithDelay(res)
}

export const fetchAllMotions = ({
  startDate,
}) => {
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
        res.push({
          ...motionItemBase,
          detection_id: getUniqueID(),
          peripheral_id: peripheralId,
          peripheral_name: peripheralId,
          start_time: startTime.format(),
          end_time: startTime.add(duration, 'seconds').format(),
        })
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

const alertItemBase = {
  "detection_id": "651b3ef3a34a910001348126",
  "annotations": [],
  "branch": "texas",
  "count": 78,
  "country": "us",
  "duration": 9694,
  "end_time": "2023-10-02T22:06:42.303Z",
  "facility": "houston",
  "from_device": "demo-orin-se",
  "group": "demo",
  "label": "person",
  "last_modification": "2023-10-02T22:10:45.390Z",
  "message": "WARNING: nearvehicle observed at SITE:teknoir, ZONE:office at 2023-10-02T22:06:32.609Z",
  "peripheral_id": "parkinglot2",
  "peripheral_name": "parkinglot2",
  "peripheral_type": "camera",
  "proof": {
    "id": "651b3ef3a34a910001348126"
  },
  "region": "southwest",
  "sent": "2023-10-02T22:09:52.410Z",
  "severity": "WARNING",
  "site": "teknoir",
  "start_time": "2023-10-02T22:06:32.609Z",
  "type": "nearvehicle",
  "zone": "office"
};