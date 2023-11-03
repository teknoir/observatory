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
  const query = encodeURIComponent(JSON.stringify(queryObj));
  return `query=${query}`
}

export const getEventsQuery = (params: IEventsRequestParams | IEventsRequestParamsById, fields: string[] = []) => {
  const { peripheralId, startDate } = params as IEventsRequestParamsById;
  const queryObj: IQuery = {};
  if (peripheralId) {
    queryObj['peripheral_id'] = peripheralId;
  }
  if (startDate) {
    queryObj['start_time'] = {
      $gt: startDate.toISOString()
    };
  }
  const projectionObj = fields.reduce((acc, item) => (
    { ...acc, [item]: 1 }
  ), {})
  // TODO: for debug purpose
  // const query = "{\"start_time\":{\"$gt\":\"2023-10-29T22:00:00.000Z\"}}";
  const query = encodeURIComponent(JSON.stringify(queryObj));
  const projection = encodeURIComponent(JSON.stringify(projectionObj));
  return `query=${query}&projection=${projection}`;
}
