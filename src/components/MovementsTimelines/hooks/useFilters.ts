import { useState, useMemo } from 'react';
import moment from 'moment';
import {
  MovementsTimelinePeriod,
  TimelineFilterBy,
} from 'components/MovementsTimelines/enums';

const useFilters = () => {
  const [filter, setFilter] = useState<string>(TimelineFilterBy.MOTIONS_ALERTS);
  const [period, setPeriod] = useState(MovementsTimelinePeriod.DAYS_1);

  const fromDate = useMemo(
    () => moment().subtract(period, 'days').startOf('day'),
    [period]
  );
  const startTime = useMemo(
    () => moment().subtract(period, 'days').toDate(),
    [period]
  );
  const toDate = useMemo(() => moment(), [period]);

  return {
    filter,
    period,
    fromDate,
    startTime,
    toDate,
    setFilter,
    setPeriod,
  };
};

export default useFilters;
