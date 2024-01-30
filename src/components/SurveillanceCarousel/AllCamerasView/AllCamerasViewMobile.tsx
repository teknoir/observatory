import { useMemo, ReactNode } from 'react';
import { CarouselProps, ViewImagesProps } from 'ts/types';
import SortableContext from 'components/SurveillanceCarousel/SortableSources/Context';
import SortableItem from 'components/SurveillanceCarousel/SortableSources/SortableItem';
import DragOverlay from 'components/SurveillanceCarousel/SortableSources/DragOverlay';
import CarouselImagePreviewDnD from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreviewDnD';
import useSortableSources from 'components/SurveillanceCarousel/SortableSources/useSortableSources';
import Container from './Container/Container';
import ListItems from './ListItems/ListItems';
import { usePager } from './hooks';
import { getImagesFromSources } from '../utils';
import { imagesPerPage } from './enums';
import styles from './AllCamerasView.module.scss';

function AllCamerasView({ sources, peripheralIdNotified }: CarouselProps) {
  const { sourcesKeys, activeItem, onDragStart, onDragEnd } =
    useSortableSources(sources);

  // FIXME: This is a workaround to render using an array
  const images: ViewImagesProps[] = useMemo(
    () => getImagesFromSources(sourcesKeys, sources),
    [sourcesKeys, sources]
  );
  const { page, pages, changePage, changePageThrottle } = usePager(
    images,
    peripheralIdNotified
  );
  const visibleImages = images.slice(
    page * imagesPerPage,
    page * imagesPerPage + imagesPerPage
  );

  const DraggableComponent = ({
    sourceKey,
    children,
  }: {
    sourceKey: string;
    children: ReactNode;
  }) => (
    <SortableItem
      key={sourceKey}
      id={sourceKey}
      className={styles.imagePreviewContainer}
    >
      {children}
    </SortableItem>
  );

  return (
    <Container
      pages={pages}
      changePage={changePage}
      changePageThrottle={changePageThrottle}
    >
      <SortableContext
        sourcesKeys={sourcesKeys}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <ListItems
          images={visibleImages}
          peripheralIdNotified={peripheralIdNotified}
          DraggableComponent={DraggableComponent}
        />
        <DragOverlay>
          <CarouselImagePreviewDnD
            src={activeItem.src}
            title={activeItem.peripheralName}
            status={activeItem.status}
          />
        </DragOverlay>
      </SortableContext>
    </Container>
  );
}

export default AllCamerasView;
