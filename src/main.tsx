import React from 'react';
import ReactDOM from 'react-dom/client';
import { setHost, setNamespace, setBasename } from './config';
import App from './App.tsx';

let namespace = 'dev';
let basename = '/apps/';
const { host, pathname } = window.location;
if (pathname !== '/') {
  const match = pathname.match(/\/apps\/(?<namespace>.+)\/sdmc/);
  if (match) {
    namespace = match.groups!.namespace;
    basename = match[0];
  }
}
setHost(host);
setBasename(basename);
setNamespace(namespace);

console.log('namespace', namespace);
console.log('basename', basename);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App basename={basename} />
  </React.StrictMode>
);
