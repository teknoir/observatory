const API_PROTOCOL = import.meta.env.DEV ? 'http' : 'https';
const API_SERVER = import.meta.env.VITE_HISTORIAN_MIDDLE_END_API;
const MEDIA_MP4_SERVER = import.meta.env.VITE_MEDIA_MP4_API;
const MEDIA_JPEG_SERVER = import.meta.env.VITE_MEDIA_JPEG_API;
const API_HOST_MIDDLE_END = `${API_PROTOCOL}://${API_SERVER}`;
export const API_MEDIA_MP4 = `${API_PROTOCOL}://${MEDIA_MP4_SERVER}`;
export const API_MEDIA_JPEG = `${API_PROTOCOL}://${MEDIA_JPEG_SERVER}`;

const API = {
  eventAlert: (detectionId: string) =>
    `${API_HOST_MIDDLE_END}/events?collection_name=alerts&detection_id=${detectionId}`,
  eventsAlerts: (query: string) =>
    `${API_HOST_MIDDLE_END}/retrieve_events?collection_name=alerts&${query}`,
  eventsMovements: (query: string) =>
    `${API_HOST_MIDDLE_END}/retrieve_events?collection_name=movements&${query}`,
  motionsAggregation: (query: string) =>
    `${API_HOST_MIDDLE_END}/motions_aggregation?collection_name=movements&${query}`,
  feedback: (detectionId: string) =>
    `${API_HOST_MIDDLE_END}/feedbacks?detection_id=${detectionId}`,
  notifications: (query: string) =>
    `${API_HOST_MIDDLE_END}/notifications?${query}`,
  sendNotificationSeen: (query: string) =>
    `${API_HOST_MIDDLE_END}/notifications/${query}`,
  sendFeedback: `${API_HOST_MIDDLE_END}/feedbacks`,
};

export default API;
