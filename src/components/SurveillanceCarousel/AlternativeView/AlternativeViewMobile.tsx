import { useMemo, ReactNode } from 'react';
import { CarouselProps, ViewImagesProps } from 'ts/types';
import SortableContext from 'components/SurveillanceCarousel/SortableSources/Context';
import SortableItem from 'components/SurveillanceCarousel/SortableSources/SortableItem';
import useSortableSources from 'components/SurveillanceCarousel/SortableSources/useSortableSources';
import ResizableContainer from './ResizableContainer/ResizableContainer';
import ListItems from './ListItems/ListItems';
import { getImagesFromSources } from '../utils';
import styles from './AlternativeView.module.scss';

function AlternativeView({ sources, peripheralIdNotified }: CarouselProps) {
  const { sourcesKeys, onDragStart, onDragEnd } = useSortableSources(sources);

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
      <SortableContext
        sourcesKeys={sourcesKeys}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <ListItems
          images={images}
          peripheralIdNotified={peripheralIdNotified}
          DraggableComponent={DraggableComponent}
        />
      </SortableContext>
    </ResizableContainer>
  );
}

export default AlternativeView;
