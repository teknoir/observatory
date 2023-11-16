import { getHistorianHost } from '../config';

const API = {
  alerts: (query: string) =>
    `${getHistorianHost()}/events/retrieve?collection_name=alerts&${query}`,
  movements: (query: string) =>
    `${getHistorianHost()}/events/retrieve?collection_name=movements&${query}`,
};

export default API;
