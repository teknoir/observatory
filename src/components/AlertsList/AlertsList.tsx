import { useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InputLabel from "@mui/material/InputLabel";
import Select from "muiComponents/Select/Select";
import AlertItem from "components/AlertItem/AlertItem";
import styles from "./AlertsList.module.scss";

const AlertsList = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
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
          value={"1"}
          variant="standard"
          options={[
            { value: "1", label: "Last 7 days" },
            { value: "2", label: "Last 30 days" },
          ]}
        />
      </div>

      <List>
        <ListItemButton onClick={handleClick} sx={{ pl: '20px' }}>
          <ListItemText primary="Today(6)" />
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
    </div>
  )
}

export default AlertsList;
