import Icon from 'components/Icon/Icon';
import cloudUpload from 'assets/icons/cloudUpload.svg';
import { IconSizes } from 'ts/types';
import styles from './VideoStub.module.scss';

const VideoStub = () => (
  <div className={styles.root}>
    <Icon icon={cloudUpload} size={IconSizes.md} />
  </div>
);

export default VideoStub;
