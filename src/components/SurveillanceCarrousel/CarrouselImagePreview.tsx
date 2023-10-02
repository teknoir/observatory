import { forwardRef } from 'react';
import { ImagePreviewProps } from 'ts/types';

const CarrouselImagePreview = forwardRef<HTMLImageElement, ImagePreviewProps>(({
  src,
  className = '',
  onClick = () => {}
}: ImagePreviewProps, ref) => (
  <img
    src={src}
    className={`p-3 ${className}`}
    onClick={onClick}
    ref={ref}
  />
))

export default CarrouselImagePreview;
