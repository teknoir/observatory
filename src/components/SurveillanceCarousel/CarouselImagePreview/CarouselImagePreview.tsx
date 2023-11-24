import { forwardRef, memo } from 'react';
import { NavLink as RouterLink, generatePath } from 'react-router-dom';
import classNames from 'classnames';
import Link from '@mui/material/Link';
import TitleContainer from 'components/SurveillanceCarousel/TitleContainer/TitleContainer';
import APP_URLS from 'enums/urls';
import { ImagePreviewProps } from 'ts/types';
import styles from './CarouselImagePreview.module.scss';

const CarouselImagePreview = forwardRef<HTMLImageElement, ImagePreviewProps>(
  (
    {
      id,
      src,
      title,
      status,
      classNameContainer = '',
      className = '',
      onClick = () => {},
      children,
    }: ImagePreviewProps,
    ref
  ) => {
    return (
      <div className={classNames(styles.root, classNameContainer)}>
        <img
          src={src}
          className={classNames(styles.image, className)}
          onClick={onClick}
          ref={ref}
        />
        <TitleContainer title={title} status={status} />
        <div className={styles.hoverState}>
          <Link
            component={RouterLink}
            to={generatePath(APP_URLS.devices, {
              peripheralId: id,
              peripheralName: title,
            })}
            color="inherit"
            underline="none"
            className={styles.hoverStateLink}
          >
            View device
          </Link>
        </div>
        {children}
      </div>
    );
  }
);

const CarouselImagePreviewMemo = memo(CarouselImagePreview);
export default CarouselImagePreviewMemo;
