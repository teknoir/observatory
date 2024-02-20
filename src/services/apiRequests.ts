import Fetch from 'services/fetch';
import API from 'enums/api';
import {
  fetchAllMotionsMock,
  fetchMotionsByPeripheralIdMock,
  fetchAlertsByPeripheralIdMock,
  fetchAllAlertsMock,
  fetchMotionsAggregationMock,
  fetchAlertMock,
  fetchNotificationsMock,
  fetchNotificationsPaginatedMock,
  fetchFeedbackMock,
  fetchCountEventsMock,
} from 'services/fetchMock';
import {
  getSearchCountsEvents,
  getSearchQuery,
  getSearchQueryNotifications,
} from 'services/queryHistorian';
import {
  DetectionId,
  IAlertFormValues,
  IRetrieveEventsRequest,
  IRetrieveEventsRequestById,
  IMotionsAggregationRequest,
  INotificationsRequest,
  IAlertEvent,
  EventStatus,
} from 'ts/types';
import { useMockDb } from 'enums/mockData';
import { getUrlJpeg, getUrlMp4 } from 'utils/media';

// TODO: remove this function in future
const shouldUseMockData = (): boolean =>
  location?.search.includes(useMockDb) ||
  import.meta.env.VITE_USE_MOCK_HISTORIAN_DB;
const shouldUseMotionsDb = (): boolean => true;
const shouldUseNotificationsPaginatedDb = (): boolean => false;

export const fetchAlert = (detectionId: DetectionId, type: string | null) => {
  // TODO: remove this condition in future
  if (shouldUseMockData()) {
    return fetchAlertMock(detectionId);
  }
  return Fetch.get(API.eventAlert(detectionId)).then(({ data }) => {
    const res = type
      ? data.find((item: IAlertEvent) => item.type === type)
      : data[0];
    if (res) {
      if (res.video_url) {
        res.video_url = getUrlMp4(res.video_url);
      }
      if (res.video_snapshot) {
        res.video_snapshot = getUrlJpeg(res.video_snapshot);
      }
    }
    return res;
  });
};

export const fetchFeedback = (detectionId: DetectionId) => {
  // TODO: remove this condition in future
  if (shouldUseMockData()) {
    return fetchFeedbackMock(detectionId);
  }
  return Fetch.get(API.feedback(detectionId)).then(({ data }) => data[0]);
};

export const fetchAlerts = (filters: IRetrieveEventsRequest) => {
  // TODO: remove this condition in future
  if (shouldUseMockData()) {
    return fetchAllAlertsMock(filters);
  }
  const query = getSearchQuery(filters);
  return Fetch.get(API.eventsAlerts(query)).then(({ data }) => data);
};

export const fetchAlertsByPeripheralId = (
  filters: IRetrieveEventsRequestById
) => {
  // TODO: remove this condition in future
  if (shouldUseMockData()) {
    return fetchAlertsByPeripheralIdMock(filters);
  }
  const query = getSearchQuery(filters);
  return Fetch.get(API.eventsAlerts(query)).then(({ data }) => data);
};

export const sendFeedback = (
  data: IAlertFormValues & { detection_id: DetectionId; username: string }
) => {
  return Fetch.post(API.sendFeedback, data).then(({ data }) => data);
};

export const sendNotificationSeen = (detectionId: DetectionId) => {
  return Fetch.put(API.sendNotificationSeen(detectionId)).then(
    ({ data }) => data
  );
};

export const fetchMotionsAggregation = (
  filters: IMotionsAggregationRequest
) => {
  // TODO: remove this condition in future
  if (shouldUseMotionsDb()) {
    const query = getSearchQuery(filters);
    return Fetch.get(API.motionsAggregation(query)).then(({ data }) => data);
  }
  return fetchMotionsAggregationMock(filters);
};

export const fetchMovements = (filters: IRetrieveEventsRequest) => {
  // TODO: remove this condition in future
  if (shouldUseMockData()) {
    return fetchAllMotionsMock(filters);
  }
  const query = getSearchQuery(filters);
  return Fetch.get(API.eventsMovements(query)).then(({ data }) => data);
};

export const fetchMovementsByPeripheralId = (
  filters: IRetrieveEventsRequestById
) => {
  // TODO: remove this condition in future
  if (shouldUseMockData()) {
    return fetchMotionsByPeripheralIdMock(filters);
  }
  const query = getSearchQuery(filters);
  return Fetch.get(API.eventsMovements(query)).then(({ data }) => data);
};

export const fetchNotifications = (filters: INotificationsRequest) => {
  if (shouldUseMockData()) {
    return fetchNotificationsMock(filters);
  }
  const query = getSearchQueryNotifications(filters);
  return Fetch.get(API.notifications(query)).then(({ data }) => data);
};

export const fetchNotificationsPaginated = (page: number, pageSize: number) => {
  // TODO: remove this condition in future
  if (shouldUseNotificationsPaginatedDb()) {
    // TODO: request here
  }
  return fetchNotificationsPaginatedMock(page, pageSize);
};

export const fetchCountEvents = (status: EventStatus, collection: string) => {
  // TODO: remove this condition in future
  if (shouldUseMockData()) {
    return fetchCountEventsMock();
  }
  const query = getSearchCountsEvents({ status, collection });
  return Fetch.get(API.countEvents(query)).then(({ count }) => count);
};
