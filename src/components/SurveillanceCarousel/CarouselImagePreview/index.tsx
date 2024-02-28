import { Suspense, lazy } from 'react';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import { ImagePreviewProps } from 'ts/types';

const CarouselImagePreviewLazy = lazy(() => import('./CarouselImagePreview'));
const CarouselImagePreviewMobileLazy = lazy(
  () => import('./CarouselImagePreviewMobile')
);

const CarouselImagePreview = (props: Omit<ImagePreviewProps, 'ref'>) => {
  const { isSmall } = useMainLayoutContext();

  return (
    <Suspense fallback="">
      {isSmall ? (
        <CarouselImagePreviewMobileLazy {...props} />
      ) : (
        <CarouselImagePreviewLazy {...props} />
      )}
    </Suspense>
  );
};

export default CarouselImagePreview;
