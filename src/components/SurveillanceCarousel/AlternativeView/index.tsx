import { Suspense, lazy } from 'react';
import { isMobile } from 'react-device-detect';
import { CarouselProps } from 'ts/types';

const AlternativeViewLazy = lazy(() => import('./AlternativeView'));
const AlternativeViewMobileLazy = lazy(() => import('./AlternativeViewMobile'));

const AlternativeView = (props: CarouselProps) => {
  return (
    <Suspense fallback="">
      {isMobile ? (
        <AlternativeViewMobileLazy {...props} />
      ) : (
        <AlternativeViewLazy {...props} />
      )}
    </Suspense>
  );
};

export default AlternativeView;
