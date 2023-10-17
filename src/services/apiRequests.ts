// import Fetch from "services/fetch";
// import API from "enums/api";
import {Moment} from "moment";
import {
  fetchAllMotionsMock,
  fetchMotionsByPeripheralIdMock,
  fetchAlertsByPeripheralIdMock,
  fetchAllAlertsMock
} from "services/fetchMock";
import {IAlertEvent} from "ts/types";

interface RequestParamsById {
  startDate: Date | Moment;
  peripheralId: string;
}

interface RequestParams {
  startDate: Date | Moment;
}

// TODO: use real API request in future
// export const fetchAlerts = () => Fetch.get(API.alerts);
export const fetchAlerts = (params: RequestParams): Promise<IAlertEvent[]> => fetchAllAlertsMock(params);

// TODO: use real API request in future
export const fetchAlertsByPeripheralId = (params: RequestParamsById): Promise<IAlertEvent[]> => fetchAlertsByPeripheralIdMock(params);


// TODO: use real API request in future
// export const fetchMovements = () => Fetch.get(API.movements);
export const fetchMovements = (params: RequestParams) => fetchAllMotionsMock(params);


// TODO: use real API request in future
export const fetchMovementsByPeripheralId = (params: RequestParamsById) => fetchMotionsByPeripheralIdMock(params);
