// import Fetch from "services/fetch";
// import API from "enums/api";
import {
  fetchAllMotionsMock,
  fetchMotionsByPeripheralIdMock,
  fetchAlertsByPeripheralIdMock,
  fetchAllAlertsMock
} from "services/fetchMock";

interface RequestParamsById {
  startDate: Date;
  peripheralId: string;
}

interface RequestParams {
  startDate: Date;
}

// TODO: use real API request in future
// export const fetchAlerts = () => Fetch.get(API.alerts);
export const fetchAlerts = (params: RequestParams) => fetchAllAlertsMock(params);

// TODO: use real API request in future
export const fetchAlertsByPeripheralId = (params: RequestParamsById) => fetchAlertsByPeripheralIdMock(params);


// TODO: use real API request in future
// export const fetchMovements = () => Fetch.get(API.movements);
export const fetchMovements = (params: RequestParams) => fetchAllMotionsMock(params);


// TODO: use real API request in future
export const fetchMovementsByPeripheralId = (params: RequestParamsById) => fetchMotionsByPeripheralIdMock(params);
