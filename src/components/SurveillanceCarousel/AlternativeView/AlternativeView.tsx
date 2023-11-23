import { useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreview';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { CarouselMode, CarouselProps } from 'ts/types';
import styles from './AlternativeView.module.scss';

interface ImagesProps {
  src: string;
  peripheralName: string;
  status: number;
}

function AlternativeView({ sources }: CarouselProps) {
  const { setLayout } = useContext(HomeContext);
  // FIXME: This is a workaround to render using an array
  const images: ImagesProps[] = useMemo(() => {
    const arr = [...sources.keys()];
    const generatedImages = arr.map((sourceKey) => {
      const {
        src = '',
        peripheralName = '',
        status = 0,
      } = sources.get(sourceKey) ?? {};
      return {
        src,
        peripheralName,
        status,
      };
    });
    return generatedImages;
  }, [sources]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container className={styles.container}>
        {images.slice(0, 7).map((image, index) => (
          <CarouselImagePreview
            id={image.peripheralName}
            src={image.src}
            title={image.peripheralName}
            status={image.status}
            classNameContainer={styles.imagePreview}
          >
            {index === 6 && images.length > 7 && (
              <div
                className={styles.backdrop}
                onClick={() => setLayout(CarouselMode.AllCamerasView)}
              >
                +{images.length - 7}
              </div>
            )}
          </CarouselImagePreview>
        ))}
      </Grid>
    </Box>
  );
}

export default AlternativeView;
