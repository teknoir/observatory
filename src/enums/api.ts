const API_PROTOCOL = import.meta.env.DEV ? 'http' : 'https';
const API_SERVER = import.meta.env.VITE_HISTORIAN_DB_SERVER;
const API_HOST = `${API_PROTOCOL}://${API_SERVER}`;

const API = {
  alerts: (query: string) => `${API_HOST}/events/retrieve?collection_name=alerts&query=${query}`,
  movements: (query: string) => `${API_HOST}/events/retrieve?collection_name=movements&query=${query}`,
};

export default API;
