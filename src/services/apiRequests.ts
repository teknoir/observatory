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

export const fetchAlerts = (filters: IEventsRequestParams, fields: string[] = []) => {
  // TODO: remove this condition in future
  if (shouldUseHistorianDb()) {
    const query = getEventsQuery(filters, fields);
    return Fetch.get(API.alerts(query)).then(({ data }) => data)
  }
  return fetchAllAlertsMock(filters, fields);
};

export const fetchAlertsByPeripheralId = (filters: IEventsRequestParamsById, fields: string[] = []) => {
  // TODO: remove this condition in future
  if (shouldUseHistorianDb()) {
    const query = getEventsQuery(filters, fields);
    return Fetch.get(API.alerts(query)).then(({ data }) => data)
  }
  return fetchAlertsByPeripheralIdMock(filters, fields);
};

export const fetchMotionsCounts = (filters: IEventsRequestParams) => {
  // TODO: remove this condition in future
  if (shouldUseMotionsDb()) {
    // TODO: request here
  }
  return fetchMotionsCountsMock(filters);
};

// TODO: use real API request in future
// export const fetchMovements = () => Fetch.get(API.movements);
export const fetchMovements = (filters: IEventsRequestParams, fields: string[] = []) => {
  // TODO: remove this condition in future
  if (shouldUseHistorianDb()) {
    const query = getEventsQuery(filters, fields);
    return Fetch.get(API.movements(query)).then(({ data }) => data)
  }
  return fetchAllMotionsMock(filters, fields);
};

// TODO: use real API request in future
export const fetchMovementsByPeripheralId = (filters: IEventsRequestParamsById, fields: string[] = []) => {
  // TODO: remove this condition in future
  if (shouldUseHistorianDb()) {
    const query = getEventsQuery(filters, fields);
    return Fetch.get(API.movements(query)).then(({ data }) => data)
  }
  return fetchMotionsByPeripheralIdMock(filters, fields);
}
