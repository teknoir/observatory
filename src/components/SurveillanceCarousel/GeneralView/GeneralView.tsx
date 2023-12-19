import { useEffect, useRef, DragEvent } from 'react';
import Resizable from 'components/Resizable/Resizable';
import classNames from 'classnames';
import CarouselImage from 'components/SurveillanceCarousel/CarouselImage/CarouselImage';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreview';
import MovementsTimelineEmbed from 'components/MovementsTimelineEmbed/MovementsTimelineEmbed';
import { CarouselProps, RefImage, CameraId } from 'ts/types';
import useOrderedSourcesKeys from 'hooks/useOrderedSourcesKeys';
import styles from './GeneralView.module.scss';

function GeneralView({
  sources,
  mainSource,
  setMainSource,
  peripheralIdNotified,
}: CarouselProps) {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const selectedImageRef = useRef<HTMLImageElement | null>(null);
  const {
    sourcesKeys,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  } = useOrderedSourcesKeys(sources);

  useEffect(() => {
    if (selectedImageRef.current && galleryRef.current) {
      const selectedImageElement = selectedImageRef.current;
      const galleryElement = galleryRef.current;
      const offsetTop = selectedImageElement.offsetTop;
      galleryElement.scrollTop = offsetTop - galleryElement.clientHeight / 2;
    }
  }, [mainSource]);

  const setSelectedImageRef = (element: RefImage, index: string) => {
    if (mainSource === index) {
      selectedImageRef.current = element;
    }
  };

  const handleDropMain = (sourceKey: CameraId) => (event: DragEvent) => {
    handleDrop(sourceKey)(event);
    const fromBox = JSON.parse(event.dataTransfer.getData('dragContent'));
    const mainSourceKey = fromBox.val;
    setMainSource(mainSourceKey);
  };

  const {
    src: mainSrc = '',
    peripheralName: mainPeripheralName = '',
    peripheralId: mainPeripheralId = '',
    status = 0,
  } = sources.get(mainSource) ?? {};

  return (
    <>
      <Resizable
        enable={{
          bottom: true,
        }}
        minHeight={160}
      >
        <div
          className={styles.mainImage}
          onDragOver={handleDragOver}
          onDrop={handleDropMain(mainSource)}
          draggable
        >
          <MovementsTimelineEmbed
            peripheralId={mainPeripheralId}
            classNameContainer={styles.mainImageEmbed}
          >
            <CarouselImage
              id={mainPeripheralId}
              src={mainSrc}
              title={mainPeripheralName}
              status={status}
            />
          </MovementsTimelineEmbed>
        </div>
      </Resizable>
      <Resizable
        enable={{
          left: true,
        }}
      >
        <div className={styles.galleryScroll}>
          {sources.size > 0 ? (
            sourcesKeys.map((sourceKey) => {
              const {
                src = '',
                peripheralId,
                peripheralName = '',
                status = 0,
              } = sources.get(sourceKey) ?? {};
              return (
                <div
                  key={peripheralId}
                  onClick={() => setMainSource(sourceKey)}
                  ref={(ref: HTMLImageElement) =>
                    setSelectedImageRef(ref, sourceKey)
                  }
                  className={styles.imagePreviewContainer}
                  onDragStart={handleDragStart(sourceKey)}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop(sourceKey)}
                  draggable
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
                  />
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </Resizable>
    </>
  );
}

export default GeneralView;
