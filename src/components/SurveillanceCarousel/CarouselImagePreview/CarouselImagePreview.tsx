import { forwardRef, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import TitleContainer from 'components/SurveillanceCarousel/TitleContainer/TitleContainer';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import { ImagePreviewProps } from 'ts/types';
import styleVariables from 'enums/styleVariables.module.scss';
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
      centered = false,
    }: ImagePreviewProps,
    ref
  ) => {
    const navigate = useNavigate();

    const goDevicePage = useCallback(() => {
      const url = generatePath(APP_URLS.devices, {
        peripheralId: id,
        peripheralName: title,
      });
      navigate(url);
    }, [id, title]);

    return (
      <div
        className={classNames(styles.root, classNameContainer)}
        onClick={goDevicePage}
      >
        <img
          src={src}
          className={classNames(styles.image, className)}
          onClick={onClick}
          ref={ref}
        />
        <TitleContainer title={title} status={status} />
        <div
          className={styles.hoverState}
          style={{
            paddingBottom: centered
              ? 0
              : styleVariables.movementsTimelineEmbedHeight,
          }}
        />
        {children}
      </div>
    );
  }
);

const CarouselImagePreviewMemo = memo(CarouselImagePreview);
export default CarouselImagePreviewMemo;
