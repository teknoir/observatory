import Fetch from "services/fetch";
import API from "enums/api";
import {
  fetchAllMotionsMock,
  fetchMotionsByPeripheralIdMock,
  fetchAlertsByPeripheralIdMock,
  fetchAllAlertsMock
} from "services/fetchMock";
import { getEventsQuery} from "services/queryHistorian";
import {
  IEventsRequestParams,
  IEventsRequestParamsById,
  IAlertEvent,
} from "ts/types";

// TODO: remove this function in future
const shouldUseHistorianDb = (): boolean => location?.search.includes('useHistorianDb');

export const fetchAlerts = (params: IEventsRequestParams) => {
  // TODO: remove this condition in future
  if (shouldUseHistorianDb()) {
    const query = getEventsQuery(params);
    return Fetch.get(API.alerts(query)).then(({ data }) => data)
  }
  return fetchAllAlertsMock(params);
};

export const fetchAlertsByPeripheralId = (params: IEventsRequestParamsById): Promise<IAlertEvent[]> => {
  // TODO: remove this condition in future
  if (shouldUseHistorianDb()) {
    const query = getEventsQuery(params);
    return Fetch.get(API.alerts(query)).then(({ data }) => data)
  }
  return fetchAlertsByPeripheralIdMock(params);
};

// TODO: use real API request in future
// export const fetchMovements = () => Fetch.get(API.movements);
export const fetchMovements = (params: IEventsRequestParams) => fetchAllMotionsMock(params);


// TODO: use real API request in future
export const fetchMovementsByPeripheralId = (params: IEventsRequestParamsById) => fetchMotionsByPeripheralIdMock(params);
