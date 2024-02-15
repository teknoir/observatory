import { useState, useEffect, useCallback } from 'react';
import _throttle from 'lodash/throttle';
import { useInterval } from 'usehooks-ts';
import { ViewImagesProps, CarouselProps } from 'ts/types';
import { NextPageOptions, nextPage } from './utils';
import { imagesPerPage, delay } from './enums';

export const usePager = (
  images: ViewImagesProps[],
  peripheralIdNotified: CarouselProps['peripheralIdNotified']
) => {
  const [page, setPage] = useState<number>(0);
  const pages = Math.ceil(images.length / imagesPerPage);

  const changePage = (direction: NextPageOptions) => {
    setPage((prevPage) => nextPage(direction, prevPage, pages));
  };

  const changePageThrottle = useCallback(
    _throttle(
      (direction) => {
        changePage(direction);
      },
      3000,
      { trailing: false }
    ),
    []
  );

  useEffect(() => {
    if (peripheralIdNotified) {
      const notifiedDeviceIndex = images.findIndex(
        (image) => image.peripheralId === peripheralIdNotified
      );
      if (notifiedDeviceIndex > -1) {
        const notifiedDevicePage = Math.floor(
          notifiedDeviceIndex / imagesPerPage
        ) as number;
        setPage(notifiedDevicePage);
      }
    }
  }, [peripheralIdNotified, images]);

  useInterval(() => {
    changePage(NextPageOptions.forward);
  }, delay);

  return {
    page,
    pages,
    changePage,
    changePageThrottle,
  };
};
