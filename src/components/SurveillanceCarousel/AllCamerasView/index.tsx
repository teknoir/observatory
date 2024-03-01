import { Suspense, lazy } from 'react';
import { isMobile } from 'react-device-detect';
import { CarouselProps } from 'ts/types';

const AllCamerasViewLazy = lazy(() => import('./AllCamerasView'));
const AllCamerasViewMobileLazy = lazy(() => import('./AllCamerasViewMobile'));

const AllCamerasView = (props: CarouselProps) => {
  return (
    <Suspense fallback="">
      {isMobile ? (
        <AllCamerasViewMobileLazy {...props} />
      ) : (
        <AllCamerasViewLazy {...props} />
      )}
    </Suspense>
  );
};

export default AllCamerasView;
