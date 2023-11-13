import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { CarouselProps, RefImage } from 'ts/types';
import CarrouselImage from './CarrouselImage';
import CarrouselImagePreview from './CarrouselImagePreview';
import styles from './SurveillanceCarousel.module.scss';

function SurveillanceCarouselGeneral({
  sources,
  mainSource,
  setMainSource,
}: CarouselProps) {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const selectedImageRef = useRef<HTMLImageElement | null>(null);

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

  const {
    src: mainSrc = '',
    peripheralName: mainPeripheralName = '',
    peripheralId: mainPeripheralId = '',
    status = 0,
  } = sources.get(mainSource) ?? {};

  return (
    <section className={classNames(styles.layoutContainer, styles.containerGeneral)}>
      <CarrouselImage
        id={mainPeripheralId}
        src={mainSrc}
        title={mainPeripheralName}
        status={status}
      />
      <div
        ref={galleryRef}
        className={styles.galleryScroll}
        style={{
          gridTemplateRows: `repeat(${sources.size}, 1fr)`,
        }}
      >
        {sources.size > 0 ? (
          [...sources.keys()].map((sourceKey) => {
            const {
              src = '',
              peripheralName = '',
              status = 0,
            } = sources.get(sourceKey) ?? {};
            return (
              <div
                key={src}
                onClick={() => setMainSource(sourceKey)}
                ref={(ref: HTMLImageElement) =>
                  setSelectedImageRef(ref, sourceKey)
                }
                className={styles.imagePreviewContainer}
              >
                <CarrouselImagePreview
                  id={sourceKey}
                  src={src}
                  title={peripheralName}
                  status={status}
                  className={`${
                    mainSource === sourceKey ? styles.galleryItemBorder : ''
                  }`}
                />
              </div>
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </section>
  );
}

export default SurveillanceCarouselGeneral;
