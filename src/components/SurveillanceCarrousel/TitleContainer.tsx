import { SourceStatus } from 'ts/types';
import styles from './SurveillanceCarousel.module.scss';

interface Props {
  title: string;
  status: SourceStatus;
}

const TitleContainer = ({ title, status }: Props) => {
  return (
    <div className={styles.titleContainer}>
      <p className={styles.titleText}>{title}</p>
      <div
        aria-label="status-icon"
        className={
          status
            ? styles.titleStatusIndicator
            : styles.titleStatusIndicatorInactive
        }
      />
    </div>
  );
};

export default TitleContainer;
