import {
  IQuery,
  IEventsRequestParams,
  IEventsRequestParamsById,
  DetectionId
} from 'ts/types';

export const getEventQuery = (detectionId: DetectionId) => {
  const queryObj: IQuery = {
    detection_id: detectionId
  };
  return encodeURIComponent(JSON.stringify(queryObj));
}

export const getEventsQuery = (params: IEventsRequestParams | IEventsRequestParamsById) => {
  const { peripheralId, startDate } = params as IEventsRequestParamsById;
  const queryObj: IQuery = {};
  if (peripheralId) {
    queryObj['peripheral_id'] = peripheralId;
  }
  if (startDate) {
    queryObj['start_time'] = {
      // $gte: startDate.toISOString()
      $gt: startDate.toISOString()
    };
  }
  return "{\"start_time\":{\"$gt\":\"2023-10-26T22:00:00.000Z\"}}";
  // return encodeURIComponent(JSON.stringify(queryObj));
}
