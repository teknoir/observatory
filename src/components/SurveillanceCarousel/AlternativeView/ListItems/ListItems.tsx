import { Fragment, useContext, ReactNode, ReactElement } from 'react';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview';
import MovementsTimelineEmbed from 'components/MovementsTimelineEmbed/MovementsTimelineEmbed';
import { HomeContext } from 'context/HomeContext/HomeContext';
import { useMainLayoutContext } from 'context/mainLayoutContext';
import { CarouselMode } from 'ts/types';
import styles from './ListItems.module.scss';

interface ImagesProps {
  sourceKey: string;
  src: string;
  peripheralName: string;
  status: number;
  peripheralId: string;
}

interface Props {
  images: ImagesProps[];
  peripheralIdNotified?: string;
  DraggableComponent: ({
    sourceKey,
    children,
  }: {
    sourceKey: string;
    children: ReactNode;
  }) => ReactElement;
}

const ListItems = ({
  images,
  peripheralIdNotified,
  DraggableComponent,
}: Props) => {
  const { setLayout } = useContext(HomeContext);
  const { isSmall } = useMainLayoutContext();
  return (
    <>
      {images.slice(0, 7).map((image, index) => {
        const isEmbedded = !isSmall && index < 3;
        const EmbedComponent = isEmbedded ? MovementsTimelineEmbed : Fragment;
        return (
          <DraggableComponent sourceKey={image.sourceKey}>
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
          </DraggableComponent>
        );
      })}
    </>
  );
};

export default ListItems;
