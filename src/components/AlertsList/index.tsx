import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment/moment';
import _groupBy from 'lodash/groupBy';
import _keys from 'lodash/keys';
import { SelectChangeEvent } from '@mui/material/Select';
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import { fetchAlerts, fetchAlertsByPeripheralId } from 'services/apiRequests';
import { getFlattenDocuments } from 'utils/events';
import { alerts, alertsById } from 'enums/queryKeys';
import { RetrieveEventsResponse } from 'ts/types';
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
  const toDate = useMemo(() => moment(), [period]);

  const { data: dataAlerts, isLoading: isLoadingAlerts } = useQuery({
    queryKey: [alerts, startDate],
    queryFn: () => fetchAlerts({ fromDate: startDate, toDate }),
    enabled: !isPeripheral,
  });

  const {
    data: dataAlertsByPeripheralId,
    isLoading: isLoadingAlertsByPeripheralId,
  } = useQuery({
    queryKey: [alertsById, startDate, peripheralId],
    queryFn: () =>
      fetchAlertsByPeripheralId({ fromDate: startDate, toDate, peripheralId }),
    enabled: isPeripheral,
  });

  const prepareDataByPeripheralId = (data: RetrieveEventsResponse) => {
    if (!data) return data;
    return getFlattenDocuments([data[0]]);
  };

  const data = isPeripheral
    ? prepareDataByPeripheralId(dataAlertsByPeripheralId)
    : getFlattenDocuments(dataAlerts);
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
