import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
import { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { fetchMotionsCounts } from 'services/apiRequests';
import { motionsCounts } from 'enums/queryKeys';
import MotionsList from './MotionsList';
import { MotionsPeriod } from './enums';

const MotionsListContainer = () => {
  const [period, setPeriod] = useState(MotionsPeriod.DAYS_7);

  const startDate = useMemo(
    () => moment().subtract(period, 'days').startOf('day'),
    [period]
  );

  const { data, isLoading } = useQuery({
    queryKey: [motionsCounts, startDate],
    queryFn: () => fetchMotionsCounts({ startDate }),
  });

  const handleChangePeriod = (e: SelectChangeEvent<unknown>) =>
    setPeriod(Number(e.target.value));

  if (isLoading) return <CircularProgress />;

  return (
    <MotionsList
      data={data}
      period={period}
      handleChangePeriod={handleChangePeriod}
    />
  );
};

export default MotionsListContainer;
