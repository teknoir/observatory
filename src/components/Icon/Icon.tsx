import classNames from 'classnames';
import { IconSizes } from 'ts/types';
import styles from './Icon.module.scss';

interface Props {
  icon: string;
  size?: IconSizes;
  rotated?: boolean;
}

const Icon = ({ icon, size = IconSizes.md, rotated = false }: Props) => {
  console.log('icon', icon);
  return (
    <div
      className={classNames(styles.root, {
        [styles[size]]: !!size,
        [styles.rotated]: rotated,
      })}
    >
      <img src={icon} />
    </div>
  );
};

export default Icon;
