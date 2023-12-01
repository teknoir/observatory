import {
  IQuery,
  IRetrieveEventsRequest,
  IRetrieveEventsRequestById,
  DetectionId,
  INotificationsRequest,
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

export const getSearchQueryNotifications = (params: INotificationsRequest) => {
  let query = '';
  const { fromDate, toDate, isVerified, limit } = params;
  if (fromDate) {
    query = query + `from_date=${fromDate.toISOString()}&`;
  }
  if (toDate) {
    query = query + `to_date=${toDate.toISOString()}&`;
  }
  if (isVerified) {
    query = query + `is_verified=${isVerified}&`;
  }
  if (limit) {
    query = query + `limit=${String(limit)}&`;
  }
  return query;
};
