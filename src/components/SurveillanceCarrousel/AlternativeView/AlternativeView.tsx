import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { CarouselProps } from 'ts/types';
import CarrouselImagePreview from '../CarrouselImagePreview';
// FIXME: Remove this import when the styles are moved to the component
import surveillanceCarouselStyles from '../SurveillanceCarousel.module.scss';
import styles from './AlternativeView.module.scss';

interface ImagesProps {
  src: string;
  peripheralName: string;
  status: number;
}

function AlternativeView({ sources }: CarouselProps) {
  const images: ImagesProps[] = [];

  // FIXME: This is a workaround to render using an array
  const arr = [...sources.keys()];
  arr.map((sourceKey) => {
    const {
      src = '',
      peripheralName = '',
      status = 0,
    } = sources.get(sourceKey) ?? {};
    images.push({
      src,
      peripheralName,
      status,
    });
  });
  const mainImages = images.slice(0, 3);
  const bottomImages = images.slice(3, 7);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container className={surveillanceCarouselStyles.layoutContainer}>
        {mainImages.map((image, index) => (
          <Grid
            key={index}
            xs={index === 2 ? 7 : 6}
            className={surveillanceCarouselStyles.containerHeightHalf}
          >
            <CarrouselImagePreview
              id={image.peripheralName}
              src={image.src}
              title={image.peripheralName}
              status={image.status}
              classNameContainer={
                surveillanceCarouselStyles.containerHeightFull
              }
            />
          </Grid>
        ))}

        <Grid
          container
          xs={5}
          className={surveillanceCarouselStyles.containerHeightHalf}
        >
          {bottomImages.map((image, index) => (
            // TODO: Add action to click
            <Grid
              key={index}
              xs={6}
              className={styles.smallImages}
              onClick={() => console.log('click')}
            >
              <CarrouselImagePreview
                id={image.peripheralName}
                src={image.src}
                title={image.peripheralName}
                status={image.status}
                classNameContainer={
                  surveillanceCarouselStyles.containerHeightFull
                }
              />
              {index === 3 && images.length > 7 && (
                <div className={styles.backdrop}>+{images.length - 6}</div>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AlternativeView;
