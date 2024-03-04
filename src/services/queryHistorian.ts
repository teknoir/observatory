import {
  IQuery,
  IRetrieveEventsRequest,
  IRetrieveEventsRequestById,
  DetectionId,
  INotificationsRequest,
  ICountEventsRequest,
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
  const { peripheralId, fromDate, toDate, types, labels } =
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
  if (types) {
    query = query + `types=${types.join()}&`;
  }
  if (labels) {
    query = query + `labels=${labels.join()}&`;
  }
  return query;
};

export const getSearchQueryNotifications = (params: INotificationsRequest) => {
  let query = '';
  const { fromDate, toDate, status, limit } = params;
  if (fromDate) {
    query = query + `from_date=${fromDate.toISOString()}&`;
  }
  if (toDate) {
    query = query + `to_date=${toDate.toISOString()}&`;
  }
  if (status) {
    query = query + `status=${status}&`;
  }
  if (limit) {
    query = query + `limit=${String(limit)}&`;
  }
  return query;
};

export const getSearchCountsEvents = (params: ICountEventsRequest) => {
  let query = '';
  const { collection, status } = params;
  if (collection) {
    query = query + `collection_name=${collection}&`;
  }
  if (status) {
    query = query + `status=${status}`;
  }
  return query;
};
