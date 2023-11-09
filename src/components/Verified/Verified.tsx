import classNames from 'classnames';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import Typography from '@mui/material/Typography';
import styles from './Verified.module.scss';

export enum Sizes {
  small = 'small',
  medium = 'medium',
}
interface Props {
  size?: Sizes;
}

const Verified = ({ size = Sizes.medium }: Props) => (
  <div
    className={classNames(styles.root, {
      [styles.small]: size === Sizes.small,
      [styles.medium]: size === Sizes.medium,
    })}
  >
    <VerifiedOutlinedIcon className={styles.icon} />
    <Typography variant="body2" display="block" className={styles.text}>
      Verified
    </Typography>
  </div>
);

export default Verified;
