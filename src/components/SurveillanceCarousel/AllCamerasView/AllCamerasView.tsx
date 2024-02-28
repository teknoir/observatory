import { useMemo, ReactNode } from 'react';
import useOrderedSourcesKeys from 'hooks/useOrderedSourcesKeys';
import { CarouselProps, ViewImagesProps } from 'ts/types';
import Container from './Container/Container';
import ListItems from './ListItems/ListItems';
import { usePager } from './hooks';
import { getImagesFromSources } from '../utils';
import { imagesPerPage } from './enums';
import styles from './AllCamerasView.module.scss';

function AllCamerasView({ sources, peripheralIdNotified }: CarouselProps) {
  const {
    sourcesKeys,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  } = useOrderedSourcesKeys(sources);

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
    <div
      className={styles.imagePreviewContainer}
      onDragStart={handleDragStart(sourceKey)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop(sourceKey)}
      draggable
    >
      {children}
    </div>
  );

  return (
    <Container
      pages={pages}
      changePage={changePage}
      changePageThrottle={changePageThrottle}
    >
      <ListItems
        images={visibleImages}
        peripheralIdNotified={peripheralIdNotified}
        DraggableComponent={DraggableComponent}
      />
    </Container>
  );
}

export default AllCamerasView;
