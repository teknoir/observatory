import { IQuery, IEventsRequestParams, IEventsRequestParamsById } from 'ts/types';

export const getEventsQuery = (params: IEventsRequestParams | IEventsRequestParamsById) => {
  const { peripheralId, startDate } = params as IEventsRequestParamsById;
  const queryObj: IQuery = {};
  if (peripheralId) {
    queryObj['peripheral_id'] = peripheralId;
  }
  if (startDate) {
    // TODO: uncomment it !!!
    // queryObj['start_time'] = {
    //   $gte: startDate.toISOString()
    // };
  }
  return encodeURIComponent(JSON.stringify(queryObj));
}
