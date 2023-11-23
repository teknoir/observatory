import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import _throttle from 'lodash/throttle';
import { useInterval } from 'usehooks-ts';
import classNames from 'classnames';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreview';
import useOrderedSourcesKeys from 'hooks/useOrderedSourcesKeys';
import { CarouselProps } from 'ts/types';
import styles from './AllCamerasView.module.scss';

interface ImagesProps {
  sourceKey: string;
  src: string;
  peripheralName: string;
  status: number;
  peripheralId: string;
}

const imagesPerPage = 9;
const delay = 5000;

function AllCamerasView({ sources }: CarouselProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const {
    sourcesKeys,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  } = useOrderedSourcesKeys(sources);

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

  const nextPage = (forward = true) => {
    setPage((prevPage) => {
      if (forward) {
        if (prevPage + 1 === pages) {
          return 0;
        }
        return prevPage + 1;
      } else {
        if (prevPage === 0) {
          return pages - 1;
        }
        return prevPage - 1;
      }
    });
  };

  const nextPageThrottle = useCallback(
    _throttle(
      (forward = true) => {
        nextPage(forward);
      },
      3000,
      { trailing: false }
    ),
    []
  );

  useInterval(() => {
    nextPage();
  }, delay);

  return (
    <Box className={styles.root}>
      <button
        className={classNames(styles.button, styles.buttonLeft)}
        onClick={() => nextPage(false)}
        onDragOver={() => nextPageThrottle(false)}
      >
        <ArrowBackIos />
      </button>
      <Grid container className={styles.container}>
        {visibleImages.map((image) => (
          <Grid
            item
            xs={4}
            key={image.peripheralId}
            className={styles.grid}
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
            />
          </Grid>
        ))}
      </Grid>
      <button
        className={classNames(styles.button, styles.buttonRight)}
        onClick={() => nextPage(true)}
        onDragOver={() => nextPageThrottle(true)}
      >
        <ArrowForwardIos />
      </button>
    </Box>
  );
}

export default AllCamerasView;
