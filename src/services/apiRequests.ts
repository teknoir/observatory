import Fetch from "services/fetch";
import { fetchAllMotions, fetchMotionsByPeripheralId } from "services/fetchMock";
import API from "enums/api";

interface MotionsByIdRequestParams {
  startDate: Date;
  peripheralId: string;
}

interface MotionsRequestParams {
  startDate: Date;
}
export const fetchAlerts = () => Fetch.get(API.alerts);

// TODO: use real API request in future
export const fetchMovementsByPeripheralId = (params: MotionsByIdRequestParams) => fetchMotionsByPeripheralId(params);

// TODO: use real API request in future
// export const fetchMovements = () => Fetch.get(API.movements);
export const fetchMovements = (params: MotionsRequestParams) => fetchAllMotions(params);
