const API_HOST = import.meta.env.VITE_HISTORIAN_DB_SERVER;

const API = {
  alerts: (query: string) => `${API_HOST}/events/retrieve?collection_name=alerts&query=${query}`,
  movements: `${API_HOST}/events/retrieve?collection_name=movements`,
};

export default API;
