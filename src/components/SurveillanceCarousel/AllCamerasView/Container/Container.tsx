import { ReactNode } from 'react';
import classNames from 'classnames';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import { NextPageOptions } from '../utils';
import styles from './Container.module.scss';

interface Props {
  pages: number;
  changePage: (val: NextPageOptions) => void;
  changePageThrottle: (val: NextPageOptions) => void;
  children: ReactNode;
}

const Container = ({
  pages,
  changePage,
  changePageThrottle,
  children,
}: Props) => {
  return (
    <Box className={styles.root}>
      <button
        className={classNames(styles.button, styles.buttonLeft, {
          [styles.buttonHoverState]: pages > 1,
        })}
        onClick={() => changePage(NextPageOptions.backward)}
        onDragOver={() => changePageThrottle(NextPageOptions.backward)}
      >
        <ArrowBackIos />
      </button>
      {children}
      <button
        className={classNames(styles.button, styles.buttonRight, {
          [styles.buttonHoverState]: pages > 1,
        })}
        onClick={() => changePage(NextPageOptions.forward)}
        onDragOver={() => changePageThrottle(NextPageOptions.forward)}
      >
        <ArrowForwardIos />
      </button>
    </Box>
  );
};

export default Container;
