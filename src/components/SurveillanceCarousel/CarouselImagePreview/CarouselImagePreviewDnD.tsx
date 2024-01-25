import { forwardRef, memo } from 'react';
import TitleContainer from 'components/SurveillanceCarousel/TitleContainer/TitleContainer';
import { ImagePreviewProps } from 'ts/types';
import styles from './CarouselImagePreview.module.scss';

type ImagePreviewPropsMinify = Pick<
  ImagePreviewProps,
  'src' | 'title' | 'status'
>;

const CarouselImagePreviewDnD = forwardRef<
  HTMLImageElement,
  ImagePreviewPropsMinify
>(({ src, title, status }: ImagePreviewPropsMinify, ref) => {
  return (
    <div className={styles.root}>
      <img src={src} className={styles.image} ref={ref} />
      <TitleContainer title={title} status={status} />
    </div>
  );
});

const CarouselImagePreviewDnDMemo = memo(CarouselImagePreviewDnD);
export default CarouselImagePreviewDnDMemo;
