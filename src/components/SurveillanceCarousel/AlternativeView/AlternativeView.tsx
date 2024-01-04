import { Fragment, useContext, useMemo } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Resizable from 'components/Resizable/Resizable';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreview';
import MovementsTimelineEmbed from 'components/MovementsTimelineEmbed/MovementsTimelineEmbed';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { CarouselMode, CarouselProps } from 'ts/types';
import useOrderedSourcesKeys from 'hooks/useOrderedSourcesKeys';
import styles from './AlternativeView.module.scss';

interface ImagesProps {
  sourceKey: string;
  src: string;
  peripheralName: string;
  status: number;
  peripheralId: string;
}

function AlternativeView({ sources, peripheralIdNotified }: CarouselProps) {
  const { setLayout } = useContext(HomeContext);
  const {
    sourcesKeys,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  } = useOrderedSourcesKeys(sources);

  // FIXME: This is a workaround to render using an array
  const images: ImagesProps[] = useMemo(() => {
    return sourcesKeys.map((sourceKey) => {
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
  }, [sourcesKeys, sources]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Resizable
        enable={{
          bottom: true,
        }}
        minHeight={160}
      >
        <Grid container className={styles.container}>
          {images.slice(0, 7).map((image, index) => {
            const isEmbedded = index < 3;
            const EmbedComponent = isEmbedded
              ? MovementsTimelineEmbed
              : Fragment;
            return (
              <div
                className={styles.imagePreviewContainer}
                onDragStart={handleDragStart(image.sourceKey)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop(image.sourceKey)}
                draggable
              >
                <EmbedComponent
                  peripheralId={image.peripheralId}
                  classNameContainer={styles.imagePreview}
                >
                  <CarouselImagePreview
                    id={image.peripheralName}
                    src={image.src}
                    title={image.peripheralName}
                    status={image.status}
                    className={`${
                      peripheralIdNotified === image.peripheralId
                        ? styles.borderNotified
                        : ''
                    }`}
                    classNameContainer={styles.imagePreview}
                    centered={!isEmbedded}
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
                </EmbedComponent>
              </div>
            );
          })}
        </Grid>
      </Resizable>
    </Box>
  );
}

export default AlternativeView;
