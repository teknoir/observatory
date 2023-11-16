export let HOST = '';
export let NAMESPACE = '';
export let BASENAME = '';

export const setNamespace = (namespace: string) => {
  NAMESPACE = namespace;
};

export const setBasename = (basename: string) => {
  BASENAME = basename;
};

export const setHost = (host: string) => {
  HOST = host;
};

const API_PROTOCOL = import.meta.env.DEV ? 'http' : 'https';

export const getHistorianHost = () => {
  const API_SERVER =
    import.meta.env.VITE_HISTORIAN_DB_SERVER ||
    `${HOST}/${NAMESPACE}/historian-api`;
  return `${API_PROTOCOL}://${API_SERVER}`;
};

export const getWSSHost = () => {
  return (
    import.meta.env.VITE_WS_SERVER ||
    `wss://${HOST}/${NAMESPACE}/ws/sdmc-wss-mqtt`
  );
};
