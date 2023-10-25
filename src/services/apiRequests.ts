import Fetch from "services/fetch";
import API from "enums/api";
import {
  fetchAllMotionsMock,
  fetchMotionsByPeripheralIdMock,
  fetchAlertsByPeripheralIdMock,
  fetchAllAlertsMock,
  fetchMotionsCountsMock,
  fetchAlertMock,
} from "services/fetchMock";
import { getEventQuery, getEventsQuery } from "services/queryHistorian";
import {
  IEventsRequestParams,
  IEventsRequestParamsById,
  IAlertEvent,
  DetectionId
} from "ts/types";

// TODO: remove this function in future
const shouldUseHistorianDb = (): boolean => location?.search.includes('useHistorianDb');
const shouldUseMotionsDb = (): boolean => false;

export const fetchAlert = (detectionId: DetectionId) => {
  // TODO: remove this condition in future
  if (shouldUseHistorianDb()) {
    const query = getEventQuery(detectionId);
    // TODO: pass test video url
    return Fetch.get(API.alerts(query)).then(({ data }) => data)
  }
  return fetchAlertMock(detectionId);
};

export const fetchAlerts = (params: IEventsRequestParams) => {
  // TODO: remove this condition in future
  if (shouldUseHistorianDb()) {
    const query = getEventsQuery(params);
    return Fetch.get(API.alerts(query)).then(({ data }) => data)
  }
  return fetchAllAlertsMock(params);
};

export const fetchAlertsByPeripheralId = (params: IEventsRequestParamsById) => {
  // TODO: remove this condition in future
  if (shouldUseHistorianDb()) {
    const query = getEventsQuery(params);
    return Fetch.get(API.alerts(query)).then(({ data }) => data)
  }
  return fetchAlertsByPeripheralIdMock(params);
};

export const fetchMotionsCounts = (params: IEventsRequestParams) => {
  // TODO: remove this condition in future
  if (shouldUseMotionsDb()) {
    // TODO: request here
  }
  return fetchMotionsCountsMock(params);
};

// TODO: use real API request in future
// export const fetchMovements = () => Fetch.get(API.movements);
export const fetchMovements = (params: IEventsRequestParams) => {
  // TODO: remove this condition in future
  if (shouldUseHistorianDb()) {
    const query = getEventsQuery(params);
    return Fetch.get(API.movements(query)).then(({ data }) => data)
  }
  return fetchAllMotionsMock(params);
};

// TODO: use real API request in future
export const fetchMovementsByPeripheralId = (params: IEventsRequestParamsById) => {
  // TODO: remove this condition in future
  if (shouldUseHistorianDb()) {
    const query = getEventsQuery(params);
    return Fetch.get(API.movements(query)).then(({ data }) => data)
  }
  return fetchMotionsByPeripheralIdMock(params);
}
