import { Suspense, lazy } from 'react';
import { isMobile } from 'react-device-detect';
import { CarouselProps } from 'ts/types';

const GeneralViewLazy = lazy(() => import('./GeneralView'));
const GeneralViewMobileLazy = lazy(() => import('./GeneralViewMobile'));

const GeneralView = (props: CarouselProps) => {
  return (
    <Suspense fallback="">
      {isMobile ? (
        <GeneralViewMobileLazy {...props} />
      ) : (
        <GeneralViewLazy {...props} />
      )}
    </Suspense>
  );
};

export default GeneralView;
