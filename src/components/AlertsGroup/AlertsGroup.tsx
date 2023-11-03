import { useMemo, useState } from "react";
import moment from "moment";
import { FixedSizeList as List } from 'react-window';
import AutoSizer from "react-virtualized-auto-sizer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import AlertItem from "components/AlertItem/AlertItem";
import { isToday as isTodayFn, isYesterday } from "utils/moment";
import { IAlertEvent } from "ts/types";
import styles from './AlertsGroup.module.scss';

const maxHeightList = 620
const itemHeight = 103

interface Props {
  group: IAlertEvent[];
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

  const fullHeight = useMemo(() => itemHeight * group.length, [group.length])

  return (
    <>
      <ListItemButton onClick={handleClick} sx={{ pl: '20px' }}>
        <ListItemText primary={`${dayName} (${group.length})`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div className={styles.list}
          style={{
            height: fullHeight > maxHeightList ? maxHeightList : fullHeight,
            maxHeight: maxHeightList,
          }}
        >
          <AutoSizer>
            {({ height, width }) => {
              return (
                <List
                  height={height}
                  width={width}
                  itemCount={group.length}
                  itemSize={itemHeight}
                  itemData={group}
                >
                  {AlertItem}
                </List>
              )
            }
            }
          </AutoSizer>
        </div>
      </Collapse>
    </>
  )
}

export default AlertsGroup;
