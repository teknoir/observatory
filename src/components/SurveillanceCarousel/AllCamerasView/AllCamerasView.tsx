import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import _throttle from 'lodash/throttle';
import { useInterval } from 'usehooks-ts';
import classNames from 'classnames';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreview';
import useOrderedSourcesKeys from 'hooks/useOrderedSourcesKeys';
import { CarouselProps } from 'ts/types';
import { NextPageOptions, nextPage } from './utils';
import styles from './AllCamerasView.module.scss';

interface ImagesProps {
  sourceKey: string;
  src: string;
  peripheralName: string;
  status: number;
  peripheralId: string;
}

const imagesPerPage = 9;
const delay = 10000;

function AllCamerasView({ sources, peripheralIdNotified }: CarouselProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const {
    sourcesKeys,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  } = useOrderedSourcesKeys(sources);

  // FIXME: This is a workaround to render using an array
  const images: ImagesProps[] = useMemo(() => {
    const generatedImages = sourcesKeys.map((sourceKey) => {
      const {
        src = '',
        peripheralName = '',
        status = 0,
        peripheralId = '',
      } = sources.get(sourceKey) ?? {};
      return {
        sourceKey,
        src,
        peripheralName,
        status,
        peripheralId,
      };
    });
    return generatedImages;
  }, [sourcesKeys, sources]);
  const visibleImages = images.slice(
    page * imagesPerPage,
    page * imagesPerPage + imagesPerPage
  );

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
    navigate(`?hideMotionsAlerts=true`);
    return () => {
      // FIXME: This is a workaround to remove the query param. Replace with react router if possible.
      const currentSearchParams = new URLSearchParams(window.location.search);
      if (currentSearchParams.has('hideMotionsAlerts')) {
        navigate('', { replace: true });
      }
    };
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (peripheralIdNotified) {
      const notifiedDeviceIndex = images.findIndex(
        (image) => image.peripheralId === peripheralIdNotified
      );
      const notifiedDevicePage = Math.floor(
        notifiedDeviceIndex / imagesPerPage
      ) as number;
      setPage(notifiedDevicePage);
    }
  }, [peripheralIdNotified, images]);

  useInterval(() => {
    changePage(NextPageOptions.forward);
  }, delay);

  return (
    <Box className={styles.root}>
      <button
        className={classNames(styles.button, styles.buttonLeft, {
          [styles.buttonHoverState]: pages > 1,
        })}
        onClick={() => changePage(NextPageOptions.backward)}
        onDragOver={() => changePageThrottle(NextPageOptions.backward)}
      >
        <ArrowBackIos />
      </button>
      <div className={styles.grid}>
        {visibleImages.map((image) => (
          <div
            key={image.peripheralId}
            onDragStart={handleDragStart(image.sourceKey)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop(image.sourceKey)}
            draggable
          >
            <CarouselImagePreview
              id={image.peripheralName}
              src={image.src}
              title={image.peripheralName}
              status={image.status}
              classNameContainer={styles.imagePreview}
              className={`${
                peripheralIdNotified === image.peripheralId
                  ? styles.borderNotified
                  : ''
              }`}
            />
          </div>
        ))}
      </div>
      <button
        className={classNames(styles.button, styles.buttonRight, {
          [styles.buttonHoverState]: pages > 1,
        })}
        onClick={() => changePage(NextPageOptions.forward)}
        onDragOver={() => changePageThrottle(NextPageOptions.forward)}
      >
        <ArrowForwardIos />
      </button>
    </Box>
  );
}

export default AllCamerasView;
