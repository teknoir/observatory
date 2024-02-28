import { Suspense, lazy } from 'react';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import { ImageProps } from 'ts/types';

const CarouselImageLazy = lazy(() => import('./CarouselImage'));
const CarouselImageMobileLazy = lazy(() => import('./CarouselImageMobile'));

const CarouselImage = (props: ImageProps) => {
  const { isSmall } = useMainLayoutContext();

  return (
    <Suspense fallback="">
      {isSmall ? (
        <CarouselImageMobileLazy {...props} />
      ) : (
        <CarouselImageLazy {...props} />
      )}
    </Suspense>
  );
};

export default CarouselImage;
