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
} from 'services/fetchMock';
import { dataWithDelay } from 'services/fetchMock/utils';
import { getEventQuery, getSearchQuery } from 'services/queryHistorian';
import {
  DetectionId,
  IAlertFormValues,
  IRetrieveEventsRequest,
  IRetrieveEventsRequestById,
  IMotionsAggregationRequest,
} from 'ts/types';

// TODO: remove this function in future
const shouldUseMockData = (): boolean =>
  location?.search.includes('useMockDb') ||
  import.meta.env.VITE_USE_MOCK_HISTORIAN_DB;
const shouldUseMotionsDb = (): boolean => true;
const shouldUseNotificationsDb = (): boolean => false;
const shouldUseNotificationsPaginatedDb = (): boolean => false;

export const fetchAlert = (detectionId: DetectionId) => {
  // TODO: remove this condition in future
  if (shouldUseMockData()) {
    return fetchAlertMock(detectionId);
  }
  const query = getEventQuery(detectionId);
  return Fetch.get(API.alerts(query)).then(({ data }) => {
    const res = data[0];
    if (res) {
      // TODO: pass test video url
      res.video_url =
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    }
    return res;
  });
};

export const fetchAlertME = (detectionId: DetectionId) => {
  // TODO: remove this condition in future
  // if (shouldUseMockData()) {
  //   return fetchAlertMock(detectionId);
  // }
  return Fetch.get(API.historianEventAlert(detectionId)).then(({ data }) => {
    const res = data[0];
    if (res) {
      // TODO: pass test video url
      res.video_url =
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    }
    return res;
  });
};

export const fetchFeedbackME = (detectionId: DetectionId) => {
  // TODO: remove this condition in future
  // if (shouldUseMockData()) {
  //   return fetchAlertMock(detectionId);
  // }
  return Fetch.get(API.historianFeedback(detectionId)).then(({ data }) => data);
};

export const fetchAlerts = (filters: IRetrieveEventsRequest) => {
  // TODO: remove this condition in future
  if (shouldUseMockData()) {
    return fetchAllAlertsMock(filters);
  }
  const query = getSearchQuery(filters);
  return Fetch.get(API.historianAlerts(query)).then(({ data }) => data);
};

export const fetchAlertsByPeripheralId = (
  filters: IRetrieveEventsRequestById
) => {
  // TODO: remove this condition in future
  if (shouldUseMockData()) {
    return fetchAlertsByPeripheralIdMock(filters);
  }
  const query = getSearchQuery(filters);
  return Fetch.get(API.historianAlerts(query)).then(({ data }) => data);
};

// TODO: implement a real API request
export const verifyAlert = (data: {
  detectionId: DetectionId;
  values: IAlertFormValues;
}) => {
  const { detectionId, values } = data;
  console.log('verifyAlert', detectionId, values);
  return dataWithDelay(values);
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
  return Fetch.get(API.historianMovements(query)).then(({ data }) => data);
};

export const fetchMovementsByPeripheralId = (
  filters: IRetrieveEventsRequestById
) => {
  // TODO: remove this condition in future
  if (shouldUseMockData()) {
    return fetchMotionsByPeripheralIdMock(filters);
  }
  const query = getSearchQuery(filters);
  return Fetch.get(API.historianMovements(query)).then(({ data }) => data);
};

export const fetchNotifications = () => {
  // TODO: remove this condition in future
  if (shouldUseNotificationsDb()) {
    // TODO: request here
  }
  return fetchNotificationsMock();
};

export const fetchNotificationsPaginated = (page: number, pageSize: number) => {
  // TODO: remove this condition in future
  if (shouldUseNotificationsPaginatedDb()) {
    // TODO: request here
  }
  return fetchNotificationsPaginatedMock(page, pageSize);
};
