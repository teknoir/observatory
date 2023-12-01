import { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import classNames from 'classnames';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import loiteringIcon from 'assets/icons/loiteringIcon.svg';
// import personDownIcon from 'assets/icons/personDownIcon.svg';
import theftIcon from 'assets/icons/theftIcon.svg';
import Icon from 'components/Icon/Icon';
import Verified, { Sizes } from 'components/Verified/Verified';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import { IEventDocumentWithPeripheral, IconSizes } from 'ts/types';
import styles from './AlertItem.module.scss';

interface Props {
  data: IEventDocumentWithPeripheral[];
  index: number;
  style: CSSProperties;
}

const AlertItem = ({ data, index, style }: Props) => {
  const { detectionId: detectionIdUrl } = useParams();
  const item = data[index];
  const {
    detection_id: detectionId,
    peripheral_id: peripheralId,
    peripheral_name: name,
    severity,
    start_time: startTime,
    duration,
  } = item;
  // TODO: it's temporary solution, we need to use real data here
  let isVerified = false;
  let hasTheft = false;
  let hasComment = false;
  let hasLoitering = true;
  // let hasPersonDown = false;
  if (detectionId && detectionId.slice(-1).match(/[a-z]/i)) {
    isVerified = true;
    hasTheft = true;
    hasComment = true;
    hasLoitering = false;
  }

  const startDate = moment(startTime);
  const durationSecs = Math.round(duration / 1000);
  const startDateFormat = startDate.format('HH:mm');

  const hasLink = detectionId && peripheralId;
  const isSelected = detectionIdUrl === detectionId;

  const renderContent = () => (
    <>
      <div className={styles.titleLine}>
        <div className={styles.leftTitleLine}>
          <CircleIcon color="error" className={styles.statusIcon} />
          <Typography variant="LabelMedium">
            {`${startDateFormat} (${durationSecs}s)`}
          </Typography>
        </div>
        <div className={styles.status}>
          <div className={styles.statusIcon}></div>
          {isVerified && <Verified size={Sizes.small} />}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.imgWrapper}></div>
        <div className={styles.details}>
          <Typography variant="BodySmall" display="block" gutterBottom>
            {name}
          </Typography>
          <Typography variant="BodySmall" display="block">
            Severity: {severity}
          </Typography>
        </div>
        <div className={styles.actionIcons}>
          {hasComment && <ChatBubbleIcon />}
          {hasTheft && <Icon icon={theftIcon} size={IconSizes.lg} />}
          {hasLoitering && <Icon icon={loiteringIcon} size={IconSizes.lg} />}
          {/* {hasPersonDown && <Icon icon={personDownIcon} />} */}
        </div>
      </div>
    </>
  );

  return (
    <div
      className={classNames(styles.root, {
        [styles.selected]: isSelected,
      })}
      style={style}
    >
      {hasLink ? (
        <Link
          to={generatePath(APP_URLS.alerts, { detectionId, peripheralId })}
          className={styles.rootLink}
        >
          {renderContent()}
        </Link>
      ) : (
        renderContent()
      )}
    </div>
  );
};

export default AlertItem;
