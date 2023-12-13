import { IEventDocumentWithPeripheral, RetrieveEventsResponse } from 'ts/types';

export const getFlattenDocuments = (data: RetrieveEventsResponse) => {
  if (!data) return [];
  const res: IEventDocumentWithPeripheral[] = [];
  data.forEach(({ peripheral_id, peripheral_name, documents }) => {
    documents.forEach((item) => {
      res.push({
        ...item,
        peripheral_id,
        peripheral_name,
      });
    });
  });
  return res;
};
