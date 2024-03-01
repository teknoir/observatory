import { useMemo } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import classNames from 'classnames';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import homeIcon from 'assets/icons/home.svg';
import aimIcon from 'assets/icons/aim.svg';
import settingsIcon from 'assets/icons/settingsIcon.svg';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import styles from './NavigationList.module.scss';

const homeItem = {
  name: 'Home',
  url: generatePath(APP_URLS.home),
  iconSrc: homeIcon,
};

const motionsAlertsItem = {
  name: 'Motions & Alerts',
  url: generatePath(APP_URLS.motionsAlerts),
  iconSrc: aimIcon,
};

// TODO: remove this after ready to go to production
const annotationsFlag = false;

const getNavigationItems = (isSmall: boolean) => {
  const items = [homeItem];
  if (isSmall) return items;
  return [...items, motionsAlertsItem];
};

interface Props {
  onClickItem?: () => void;
}

const NavigationList = ({ onClickItem }: Props) => {
  const {
    isOpenedLeft,
    isSmall,
    isOpenedRightOverlay,
    openRightOverlay,
    closeRightOverlay,
  } = useMainLayoutContext();
  const navigationItems = useMemo(() => getNavigationItems(isSmall), [isSmall]);

  return (
    <List className={styles.list}>
      {navigationItems.map(({ name, url, iconSrc }) => (
        <ListItem key={url} disablePadding>
          <ListItemButton className={styles.navItem} onClick={onClickItem}>
            <Link
              component={RouterLink}
              to={url}
              color="inherit"
              underline="none"
              className={styles.link}
            >
              <img src={iconSrc} alt={name} />
              <div className={classNames({ [styles.textHide]: !isOpenedLeft })}>
                {name}
              </div>
            </Link>
          </ListItemButton>
        </ListItem>
      ))}
      {annotationsFlag && (
        <ListItem disablePadding>
          <ListItemButton
            className={styles.navItem}
            onClick={
              isOpenedRightOverlay ? closeRightOverlay : openRightOverlay
            }
          >
            <div className={styles.link}>
              <img src={settingsIcon} alt={'Settings'} />
              <div className={classNames({ [styles.textHide]: !isOpenedLeft })}>
                {'Settings'}
              </div>
            </div>
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );
};

export default NavigationList;
