import { generatePath as generatePathBase } from 'react-router-dom';
import { useMockDb, useTestImages } from 'enums/mockData';

type Params = { [key: string]: string };

export const generatePath = (path: string, params?: Params) => {
  const pathnameBase = generatePathBase(path, params);
  const isMultipleQueryParams = pathnameBase.includes('?');
  const searchParams = new URLSearchParams(location.search);
  const newSearchParams = new URLSearchParams();
  if (searchParams.has(useMockDb)) {
    newSearchParams.set(useMockDb, '');
  }
  if (searchParams.has(useTestImages)) {
    newSearchParams.set(useTestImages, '');
  }
  if (newSearchParams.size) {
    return (
      pathnameBase +
      (isMultipleQueryParams ? '&' : '?') +
      newSearchParams.toString()
    );
  }
  return pathnameBase;
};
