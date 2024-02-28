import { Fragment, ReactNode, ReactElement } from 'react';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview';
import MovementsTimelineEmbed from 'components/MovementsTimelineEmbed/MovementsTimelineEmbed';
import { useMainLayoutContext } from 'context/mainLayoutContext';
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
  const { isSmall } = useMainLayoutContext();
  const EmbedComponent = isSmall ? Fragment : MovementsTimelineEmbed;
  return (
    <div className={styles.grid}>
      {images.map((image) => (
        <DraggableComponent sourceKey={image.sourceKey} key={image.sourceKey}>
          <EmbedComponent
            peripheralId={image.peripheralId}
            classNameContainer={styles.imagePreview}
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
          </EmbedComponent>
        </DraggableComponent>
      ))}
    </div>
  );
};

export default ListItems;
