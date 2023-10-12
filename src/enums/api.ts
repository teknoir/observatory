const API_HOST = import.meta.env.VITE_HISTORIAN_DB_SERVER;

const API = {
  events: `${API_HOST}/events`,
};

export default API;
