import {
  IQuery,
  IRetrieveEventsRequest,
  IRetrieveEventsRequestById,
  DetectionId,
} from 'ts/types';

export const getEventQuery = (detectionId: DetectionId) => {
  const queryObj: IQuery = {
    detection_id: detectionId,
  };
  const query = encodeURIComponent(JSON.stringify(queryObj));
  return `query=${query}`;
};

export const getSearchQuery = (
  params: IRetrieveEventsRequest | IRetrieveEventsRequestById
) => {
  let query = '';
  const { peripheralId, fromDate, toDate } =
    params as IRetrieveEventsRequestById;
  const queryObj: IQuery = {};
  if (peripheralId) {
    queryObj['peripheral_id'] = peripheralId;
    query = query + `peripheral_id=${peripheralId}&`;
  }
  if (fromDate) {
    query = query + `from_date=${fromDate.toISOString()}&`;
  }
  if (toDate) {
    query = query + `to_date=${toDate.toISOString()}&`;
  }
  return query;
};
