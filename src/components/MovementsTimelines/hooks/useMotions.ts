// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useQuery } from '@tanstack/react-query';
import { motions, motionsById } from 'enums/queryKeys';
import {
  fetchMovements,
  fetchMovementsByPeripheralId,
} from 'services/apiRequests';
import {
  MovementsTimelinePeriod,
  TimelineFilterBy,
  TimelineRefetchInterval,
} from '../enums';

export const useMotionsByPeripheralId = ({
  fromDate,
  toDate,
  filter,
  period,
  enabled,
  peripheralId,
}) => {
  return useQuery({
    queryKey: [motionsById, fromDate, toDate, filter, peripheralId],
    queryFn: () =>
      fetchMovementsByPeripheralId({ fromDate, toDate, peripheralId }),
    refetchInterval: TimelineRefetchInterval.SINGLE_DEVICE,
    enabled:
      enabled &&
      (filter == TimelineFilterBy.MOTIONS ||
        filter == TimelineFilterBy.MOTIONS_ALERTS) &&
      period == MovementsTimelinePeriod.DAYS_1,
  });
};

export const useMotions = ({ fromDate, toDate, filter, period }) => {
  return useQuery({
    queryKey: [motions, fromDate, toDate, filter],
    queryFn: () => fetchMovements({ fromDate, toDate }),
    refetchInterval: TimelineRefetchInterval.ALL_DEVICES,
    enabled:
      (filter == TimelineFilterBy.MOTIONS ||
        filter == TimelineFilterBy.MOTIONS_ALERTS) &&
      period == MovementsTimelinePeriod.DAYS_1,
  });
};
