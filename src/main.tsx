import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

let namespace = null;
let basename = '/';
const pathname = window.location.pathname;
if (pathname !== '/') {
  const match = pathname.match(/\/(?<namespace>.+)\/sdmc\//);
  if (match) {
    namespace = match.groups!.namespace;
    basename = match[0];
  }
}
console.log('namespace', namespace);
console.log('basename', basename);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App basename={basename} />
  </React.StrictMode>
);
