import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import classNames from 'classnames';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import AlertItem from 'components/AlertItem/AlertItem';
import { isToday as isTodayFn, isYesterday } from 'utils/moment';
import { IAlertEvent } from 'ts/types';
import styles from './AlertsGroup.module.scss';

const itemHeight = 103;
const maxItemsCount = 6;

interface Props {
  group: IAlertEvent[];
  dayStr: string;
}

const AlertsGroup = ({ group, dayStr }: Props) => {
  const { detectionId: detectionIdUrl } = useParams();
  const day = moment(dayStr);
  const isToday = isTodayFn(day);
  const [open, setOpen] = useState(false);

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

  const selectedIdx = useMemo(() => {
    if (!detectionIdUrl) {
      return -1;
    }
    return group.findIndex((item) => item.detection_id === detectionIdUrl);
  }, [group, detectionIdUrl]);

  const initialScrollOffset = useMemo(() => {
    if (selectedIdx < 0) {
      return 0;
    }
    return selectedIdx * itemHeight;
  }, [selectedIdx]);

  useEffect(() => {
    if (detectionIdUrl) {
      if (selectedIdx >= 0) {
        setOpen(true);
      }
    } else if (isToday) {
      setOpen(true);
    }
  }, [detectionIdUrl, selectedIdx, isToday]);

  return (
    <Box className={classNames('BoxClass', open ? 'BoxOpen' : 'BoxClosed')}>
      {/* The classNames box_border_n are used in AlertListBox.tsx. Don't remove them. */}
      <div className="box_border_1" />
      <div className="box_border_2" />
      <ListItemButton onClick={handleClick} sx={{ pl: '20px' }}>
        <ListItemText
          primary={
            <Typography variant="LabelMedium">
              {dayName} ({group.length})
            </Typography>
          }
        />
        <div className={styles.iconBorder}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </div>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <div
          className={styles.list}
          style={{
            height:
              group.length >= maxItemsCount
                ? itemHeight * maxItemsCount
                : group.length * itemHeight,
          }}
        >
          <AutoSizer>
            {({ height, width }) => {
              return (
                <FixedSizeList
                  height={height}
                  width={width}
                  itemCount={group.length}
                  itemSize={itemHeight}
                  itemData={group}
                  initialScrollOffset={initialScrollOffset}
                >
                  {AlertItem}
                </FixedSizeList>
              );
            }}
          </AutoSizer>
        </div>
      </Collapse>
    </Box>
  );
};

export default AlertsGroup;
