import Skeleton from '@mui/material/Skeleton';
import styles from "./Skeleton.module.scss";

const SkeletonItem = () => (
  <Skeleton
    animation="wave"
    variant="rectangular"
    height="100%"
    width="100%"
  >
    <div className={styles.label}>
      <Skeleton
        animation="wave"
        height={10}
        width="90%"
      />
      <Skeleton
        animation="wave"
        variant="circular"
        height={8}
        width={8}
      />
    </div>
  </Skeleton>
)

const SkeletonComponent = () => {
  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <div className={styles.item}>
          <SkeletonItem />
        </div>
        <div className={styles.item}>
          <SkeletonItem />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.item}>
          <SkeletonItem />
        </div>
        <div className={styles.item}>
          <div className={styles.column}>
            <div className={styles.item}>
              <SkeletonItem />
            </div>
            <div className={styles.item}>
              <SkeletonItem />
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.item}>
              <SkeletonItem />
            </div>
            <div className={styles.item}>
              <SkeletonItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonComponent;
