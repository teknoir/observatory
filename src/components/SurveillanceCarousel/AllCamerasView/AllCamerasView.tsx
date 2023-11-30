import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterval } from 'usehooks-ts';
import classNames from 'classnames';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreview';
import { CarouselProps } from 'ts/types';
import { NextPageOptions, nextPage } from './utils';
import styles from './AllCamerasView.module.scss';

interface ImagesProps {
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
    const arr = [...sources.keys()];
    const generatedImages = arr.map((sourceKey) => {
      const {
        src = '',
        peripheralName = '',
        status = 0,
        peripheralId = '',
      } = sources.get(sourceKey) ?? {};
      return {
        src,
        peripheralName,
        status,
        peripheralId,
      };
    });
    return generatedImages;
  }, [sources]);
  const visibleImages = images.slice(
    page * imagesPerPage,
    page * imagesPerPage + imagesPerPage
  );

  const pages = Math.ceil(images.length / imagesPerPage);

  const changePage = (direction: NextPageOptions) => {
    setPage((prevPage) => nextPage(direction, prevPage, pages));
  };

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
      >
        <ArrowBackIos />
      </button>
      <div className={styles.grid}>
        {visibleImages.map((image) => (
          <div key={image.peripheralId}>
            <CarouselImagePreview
              id={image.peripheralName}
              src={image.src}
              title={image.peripheralName}
              status={image.status}
              classNameContainer={styles.imagePreview}
            />
          </div>
        ))}
      </div>
      <button
        className={classNames(styles.button, styles.buttonRight, {
          [styles.buttonHoverState]: pages > 1,
        })}
        onClick={() => changePage(NextPageOptions.forward)}
      >
        <ArrowForwardIos />
      </button>
    </Box>
  );
}

export default AllCamerasView;
