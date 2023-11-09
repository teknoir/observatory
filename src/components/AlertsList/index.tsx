import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
import _groupBy from 'lodash/groupBy';
import _keys from 'lodash/keys';
import { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { fetchAlerts, fetchAlertsByPeripheralId } from 'services/apiRequests';
import { alerts, alertsById } from 'enums/queryKeys';
import AlertsList from './AlertsList';
import { AlertPeriod } from './enums';

interface Props {
  peripheralId?: string;
}

const AlertsListContainer = ({ peripheralId = '' }: Props) => {
  const [period, setPeriod] = useState(AlertPeriod.DAYS_7);

  const isPeripheral = !!peripheralId;
  const startDate = useMemo(
    () => moment().subtract(period, 'days').startOf('day'),
    [period]
  );
  const fields = [
    'detection_id',
    'peripheral_id',
    'peripheral_name',
    'severity',
    'start_time',
    'end_time',
  ];

  const { data: dataAlerts, isLoading: isLoadingAlerts } = useQuery({
    queryKey: [alerts, startDate, fields],
    queryFn: () => fetchAlerts({ startDate }, fields),
    enabled: !isPeripheral,
  });

  const {
    data: dataAlertsByPeripheralId,
    isLoading: isLoadingAlertsByPeripheralId,
  } = useQuery({
    queryKey: [alertsById, startDate, peripheralId, fields],
    queryFn: () =>
      fetchAlertsByPeripheralId({ startDate, peripheralId }, fields),
    enabled: isPeripheral,
  });

  const data = isPeripheral ? dataAlertsByPeripheralId : dataAlerts;
  const isLoading = isPeripheral
    ? isLoadingAlertsByPeripheralId
    : isLoadingAlerts;

  const groups = useMemo(
    () =>
      _groupBy(data, function (item) {
        return moment(item.start_time).startOf('day').format();
      }),
    [isLoading, period, peripheralId]
  );
  const groupsKeys = _keys(groups).sort((a, b) => moment(b).diff(moment(a)));

  const handleChangePeriod = (e: SelectChangeEvent<unknown>) =>
    setPeriod(Number(e.target.value));

  if (isLoading) return <CircularProgress />;

  return (
    <AlertsList
      groups={groups}
      groupsKeys={groupsKeys}
      period={period}
      handleChangePeriod={handleChangePeriod}
    />
  );
};

export default AlertsListContainer;
