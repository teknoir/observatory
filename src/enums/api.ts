const API_HOST = import.meta.env.VITE_HISTORIAN_DB_SERVER;

const API = {
  // alerts: `${API_HOST}/events/retrieve?collection_name=alerts&query="peripheral_name:'parkinglot2'"`,
  alerts: `${API_HOST}/events/retrieve?collection_name=alerts`,
  movements: `${API_HOST}/events/retrieve?collection_name=movements`,
};

export default API;
