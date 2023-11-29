const API_PROTOCOL = import.meta.env.DEV ? 'http' : 'https';
const API_SERVER = import.meta.env.VITE_HISTORIAN_DB_SERVER;
const MIDDLE_END_API_SERVER = import.meta.env.VITE_HISTORIAN_MIDDLE_END_API;
const API_HOST_HISTORIAN = `${API_PROTOCOL}://${API_SERVER}`;
const API_HOST_MIDDLE_END = `${API_PROTOCOL}://${MIDDLE_END_API_SERVER}`;

const API = {
  alerts: (query: string) =>
    `${API_HOST_HISTORIAN}/events/retrieve?collection_name=alerts&${query}`,
  movements: (query: string) =>
    `${API_HOST_HISTORIAN}/events/retrieve?collection_name=movements&${query}`,
  historianEventAlert: (detectionId: string) =>
    `${API_HOST_MIDDLE_END}/events?collection_name=alerts&detection_id=${detectionId}`,
  historianAlerts: (query: string) =>
    `${API_HOST_MIDDLE_END}/retrieve_events?collection_name=alerts&${query}`,
  historianMovements: (query: string) =>
    `${API_HOST_MIDDLE_END}/retrieve_events?collection_name=movements&${query}`,
  motionsAggregation: (query: string) =>
    `${API_HOST_MIDDLE_END}/motions_aggregation?collection_name=movements&${query}`,
  historianFeedback: (detectionId: string) =>
    `${API_HOST_MIDDLE_END}/feedbacks?detection_id=${detectionId}`,
};

export default API;
