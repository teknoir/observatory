import { useMemo, ReactNode } from 'react';
import { CarouselProps, ViewImagesProps } from 'ts/types';
import DnDContext from 'components/SortableSources/DnDContext';
import SortableContext from 'components/SortableSources/SortableContext';
import SortableItem from 'components/SortableSources/SortableItem';
import DragOverlay from 'components/SortableSources/DragOverlay/DragOverlay';
import useSortableSources from 'components/SortableSources/useSortableSources';
import CarouselImagePreviewDnD from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreviewDnD';
import ResizableContainer from './ResizableContainer/ResizableContainer';
import ListItems from './ListItems/ListItems';
import { getImagesFromSources } from '../utils';
import styles from './AlternativeView.module.scss';

function AlternativeView({ sources, peripheralIdNotified }: CarouselProps) {
  const { sourcesKeys, activeItem, onDragStart, onDragEnd } =
    useSortableSources(sources);

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
    <SortableItem
      key={sourceKey}
      id={sourceKey}
      className={styles.imagePreviewContainer}
    >
      {children}
    </SortableItem>
  );

  return (
    <ResizableContainer>
      <DnDContext
        sourcesKeys={sourcesKeys}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext sourcesKeys={sourcesKeys}>
          <ListItems
            images={images}
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
      </DnDContext>
    </ResizableContainer>
  );
}

export default AlternativeView;
