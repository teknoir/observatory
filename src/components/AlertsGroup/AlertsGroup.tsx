import { useState } from "react";
import moment from "moment";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { isToday as isTodayFn, isYesterday } from "utils/moment";
import AlertItem from "components/AlertItem/AlertItem";

interface Props {
  group: any[];
  dayStr: string;
}

const AlertsGroup = ({
  group,
  dayStr
}: Props) => {
  const day = moment(dayStr);
  const isToday = isTodayFn(day);
  const [open, setOpen] = useState(isToday);

  const handleClick = () => {
    setOpen(!open);
  };

  let dayName = '';
  if (isToday) {
    dayName = 'Today';
  } else if (isYesterday(day)) {
    dayName = 'Yesterday';
  } else {
    dayName = day.format('MMMM DD, YYYY');
  }
  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: '20px' }}>
        <ListItemText primary={`${dayName} (${group.length})`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {group.map((item, index) => (
          <AlertItem
            name={item.peripheral_name}
            severity={item.severity}
            startTime={item.start_time}
            endTime={item.end_time}
            hasTheft={index % 2 === 0}
            hasComment={index === 3}
            isVerified={index === 3}
            key={item.detection_id}
          />
        ))}
      </Collapse>
    </>
  )
}

export default AlertsGroup;
