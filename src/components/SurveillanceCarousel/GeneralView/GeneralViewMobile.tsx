import classNames from 'classnames';
import CarouselImage from 'components/SurveillanceCarousel/CarouselImage';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview';
import { CarouselProps } from 'ts/types';
import DnDContext from 'components/SortableSources/DnDContext';
import SortableContext from 'components/SortableSources/SortableContext';
import SortableItem from 'components/SortableSources/SortableItem';
import DragOverlay from 'components/SortableSources/DragOverlay/DragOverlay';
import useSortableSources from 'components/SortableSources/useSortableSources';
import { Main } from 'components/SortableSources/enums';
import CarouselImagePreviewDnD from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreviewDnD';
import styles from './GeneralView.module.scss';

function GeneralView({
  sources,
  mainSource,
  setMainSource,
  peripheralIdNotified,
}: CarouselProps) {
  const { sourcesKeys, activeItem, onDragStart, onDragEnd } =
    useSortableSources(sources, setMainSource);

  const {
    src: mainSrc = '',
    peripheralName: mainPeripheralName = '',
    peripheralId: mainPeripheralId = '',
    status = 0,
  } = sources.get(mainSource) ?? {};

  return (
    <>
      <DnDContext
        sourcesKeys={sourcesKeys}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext sourcesKeys={sourcesKeys}>
          <SortableItem key={Main} id={Main} className={styles.mainImageMobile}>
            <CarouselImage
              id={mainPeripheralId}
              src={mainSrc}
              title={mainPeripheralName}
              status={status}
            />
          </SortableItem>
          <div className={styles.galleryScrollMobile}>
            {sources.size > 0 ? (
              sourcesKeys.map((sourceKey) => {
                const {
                  src = '',
                  peripheralId,
                  peripheralName = '',
                  status = 0,
                } = sources.get(sourceKey) ?? {};
                return (
                  <SortableItem
                    key={peripheralId}
                    id={sourceKey}
                    className={styles.imagePreviewContainer}
                  >
                    <CarouselImagePreview
                      id={sourceKey}
                      src={src}
                      title={peripheralName}
                      status={status}
                      className={classNames(
                        `${mainSource === sourceKey ? styles.border : ''}`,
                        `${
                          peripheralIdNotified === sourceKey
                            ? styles.borderNotified
                            : ''
                        }`
                      )}
                      centered
                    />
                  </SortableItem>
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </SortableContext>
        <DragOverlay>
          <CarouselImagePreviewDnD
            src={activeItem.src}
            title={activeItem.peripheralName}
            status={activeItem.status}
          />
        </DragOverlay>
      </DnDContext>
    </>
  );
}

export default GeneralView;
