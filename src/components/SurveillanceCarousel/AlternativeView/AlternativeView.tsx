import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreview';
import { CarouselProps } from 'ts/types';
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
      <Grid container className={styles.container}>
        {mainImages.map((image, index) => (
          <Grid key={index} xs={index === 2 ? 7 : 6} className={styles.grid}>
            <CarouselImagePreview
              id={image.peripheralName}
              src={image.src}
              title={image.peripheralName}
              status={image.status}
              classNameContainer={styles.imagePreview}
            />
          </Grid>
        ))}

        <Grid container xs={5} className={styles.grid}>
          {bottomImages.map((image, index) => (
            // TODO: Add action to click
            <Grid
              key={index}
              xs={6}
              className={styles.smallImages}
              onClick={() => console.log('click')}
            >
              <CarouselImagePreview
                id={image.peripheralName}
                src={image.src}
                title={image.peripheralName}
                status={image.status}
                classNameContainer={styles.imagePreview}
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
