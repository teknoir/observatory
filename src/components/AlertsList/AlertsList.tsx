import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import _groupBy from "lodash/groupBy";
import _map from "lodash/map";
import _keys from "lodash/keys";
import { SelectChangeEvent } from '@mui/material/Select';
import List from '@mui/material/List';
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import Select from "muiComponents/Select/Select";
import AlertsGroup from "components/AlertsGroup/AlertsGroup";
import { fetchAlerts, fetchAlertsByPeripheralId } from "services/apiRequests";
import { alerts, alertsById} from "enums/queryKeys";
import styles from "./AlertsList.module.scss";

interface Props {
  peripheralId?: string;
}

enum AlertPeriod {
  DAYS_7 = 7,
  DAYS_30 = 30,
}

const periodOptions = [
  { value: AlertPeriod.DAYS_7, label: "Last 7 days" },
  { value: AlertPeriod.DAYS_30, label: "Last 30 days" },
]

const AlertsList = ({ peripheralId = '' }: Props) => {
  const [period, setPeriod] = useState(AlertPeriod.DAYS_7);

  const isPeripheral = !!peripheralId;
  const startDate = useMemo(
    () => moment().subtract(period, 'days').startOf('day'),
    [period]
  );

  const {
    data: dataAlerts,
    isLoading: isLoadingAlerts
  } = useQuery({
    queryKey: [alerts, startDate],
    queryFn: () => fetchAlerts({ startDate }),
    enabled: !isPeripheral
  })

  const {
    data: dataAlertsByPeripheralId,
    isLoading: isLoadingAlertsByPeripheralId
  } = useQuery({
    queryKey: [alertsById, startDate, peripheralId],
    queryFn: () => fetchAlertsByPeripheralId({ startDate, peripheralId }),
    enabled: isPeripheral
  })

  const data = isPeripheral ? dataAlertsByPeripheralId : dataAlerts;
  const isLoading = isPeripheral ? isLoadingAlertsByPeripheralId : isLoadingAlerts;

  const groups = useMemo(() =>
    _groupBy(data, function (item) {
      return moment(item.start_time).startOf('day').format();
    }),
  [period, peripheralId, data])
  const groupsKeys = _keys(groups).sort((a, b) => moment(b).diff(moment(a)));

  const handleChangePeriod = (e: SelectChangeEvent) => setPeriod(Number(e.target.value))

  const renderList = () => {
    if (isLoading || !data) return <CircularProgress />

    return (
      <List>
        {_map(groupsKeys, (dayStr) => (
          <AlertsGroup
            group={groups[dayStr]}
            dayStr={dayStr}
          />
        ))}
      </List>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.selectWrapper}>
        <InputLabel
          id="alertPeriodLabel"
        >
          Alerts from:{' '}
        </InputLabel>
        <Select
          labelId="alertPeriodLabel"
          variant="standard"
          value={period}
          options={periodOptions}
          onChange={handleChangePeriod}
        />
      </div>
      {renderList()}
    </div>
  )
}

export default AlertsList;
