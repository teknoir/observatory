import CircularProgress from '@mui/material/CircularProgress';
import classNames from 'classnames';
import styles from './CircularProgress.module.scss';

interface Props {
  isAbsolute?: boolean;
  className?: string;
}

export default function CircularProgressMUI({ isAbsolute, className }: Props) {
  return (
    <div
      className={classNames(styles.root, className, {
        [styles.absolute]: isAbsolute,
      })}
    >
      <CircularProgress />
    </div>
  );
}
