import { useMemo, ReactNode } from 'react';
import { CarouselProps, ViewImagesProps } from 'ts/types';
import useOrderedSourcesKeys from 'hooks/useOrderedSourcesKeys';
import ResizableContainer from './ResizableContainer/ResizableContainer';
import ListItems from './ListItems/ListItems';
import { getImagesFromSources } from '../utils';
import styles from './AlternativeView.module.scss';

function AlternativeView({ sources, peripheralIdNotified }: CarouselProps) {
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
    <ResizableContainer>
      <ListItems
        images={images}
        peripheralIdNotified={peripheralIdNotified}
        DraggableComponent={DraggableComponent}
      />
    </ResizableContainer>
  );
}

export default AlternativeView;
