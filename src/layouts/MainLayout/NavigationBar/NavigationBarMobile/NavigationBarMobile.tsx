import classNames from 'classnames';
import { useMainLayoutContext } from 'context/mainLayoutContext.tsx';
import NavigationList from 'layouts/components/NavigationList/NavigationList.tsx';
import styles from './NavigationBarMobile.module.scss';

const NavigationBarMobile = () => {
  const { isOpenedLeft, closeLeft } = useMainLayoutContext();
  return (
    <div
      className={classNames(
        styles.root,
        isOpenedLeft ? styles.visible : styles.hidden
      )}
    >
      <NavigationList onClickItem={closeLeft} />
    </div>
  );
};

export default NavigationBarMobile;
