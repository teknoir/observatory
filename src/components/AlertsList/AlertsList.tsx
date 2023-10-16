import { useState, useMemo } from "react";
import moment from "moment/moment";
import { useQuery } from "@tanstack/react-query";
import { SelectChangeEvent } from '@mui/material/Select';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InputLabel from "@mui/material/InputLabel";
import CircularProgress from 'muiComponents/CircularProgress/CircularProgress';
import Select from "muiComponents/Select/Select";
import AlertItem from "components/AlertItem/AlertItem";
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
  const [open, setOpen] = useState(true);

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

  console.log('DATA', data)

  const handleChangePeriod = (e: SelectChangeEvent) => setPeriod(Number(e.target.value))

  const handleClick = () => {
    setOpen(!open);
  };

  const renderList = () => {
    if (isLoading || !data) return <CircularProgress />

    return (
      <List>
        <ListItemButton onClick={handleClick} sx={{ pl: '20px' }}>
          <ListItemText primary={`Today(${data.length})`} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {[1,2,3,4].map((item, index) => (
            <AlertItem
              name={'SW Front Row Parking'}
              severity={'Low'}
              duration={'14:55 (14s)'}
              hasTheft={index % 2 === 0}
              hasComment={index === 3}
              isVerified={index === 3}
            />
          ))}
        </Collapse>
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
