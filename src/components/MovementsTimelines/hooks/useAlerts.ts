// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useQuery } from '@tanstack/react-query';
import { alerts, alertsById } from 'enums/queryKeys';
import { fetchAlerts, fetchAlertsByPeripheralId } from 'services/apiRequests';
import { TimelineFilterBy, TimelineRefetchInterval } from '../enums';

export const useAlertsByPeripheralId = ({
  fromDate,
  toDate,
  filter,
  peripheralId,
  enabled,
}) => {
  return useQuery({
    queryKey: [alertsById, fromDate, toDate, filter, peripheralId],
    queryFn: () =>
      fetchAlertsByPeripheralId({ fromDate, toDate, peripheralId }),
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
    enabled:
      (enabled && filter == TimelineFilterBy.ALERTS) ||
      filter == TimelineFilterBy.MOTIONS_ALERTS,
  });
};

export const useAlerts = ({ fromDate, toDate, filter }) => {
  return useQuery({
    queryKey: [alerts, fromDate, toDate, filter],
    queryFn: () => fetchAlerts({ fromDate, toDate }),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
    enabled:
      filter == TimelineFilterBy.ALERTS ||
      filter == TimelineFilterBy.MOTIONS_ALERTS,
  });
};
