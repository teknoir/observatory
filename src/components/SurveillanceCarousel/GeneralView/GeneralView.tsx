import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import CarouselImage from 'components/SurveillanceCarousel/CarouselImage/CarouselImage';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreview';
import { CarouselProps, RefImage } from 'ts/types';
import styles from './GeneralView.module.scss';

function GeneralView({
  sources,
  mainSource,
  setMainSource,
  peripheralIdNotified,
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
    <section className={styles.root}>
      <CarouselImage
        id={mainPeripheralId}
        src={mainSrc}
        title={mainPeripheralName}
        status={status}
      />
      <div ref={galleryRef} className={styles.galleryContainer}>
        <div
          className={styles.galleryScroll}
          style={{
            gridTemplateRows: `repeat(${sources.size}, auto)`,
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
      </div>
    </section>
  );
}

export default GeneralView;
