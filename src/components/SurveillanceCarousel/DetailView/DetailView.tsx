import CarouselImage from 'components/SurveillanceCarousel/CarouselImage/CarouselImage';
import CarouselImagePreview from 'components/SurveillanceCarousel/CarouselImagePreview/CarouselImagePreview';
import { CarouselProps } from 'ts/types';
import styles from './DetailView.module.scss';

function DetailView({ sources, mainSource, setMainSource }: CarouselProps) {
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
      <div className={styles.container}>
        <button>&lt;</button>
        <div className={styles.imagesContainer}>
          {sources.size > 0 ? (
            [...sources.keys()].map((sourceKey) => {
              const {
                src = '',
                peripheralName = '',
                status = 0,
              } = sources.get(sourceKey) ?? {};
              return (
                <div key={src} onClick={() => setMainSource(sourceKey)}>
                  <CarouselImagePreview
                    id={sourceKey}
                    src={src}
                    title={peripheralName}
                    status={status}
                  />
                </div>
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <button>&gt;</button>
      </div>
    </section>
  );
}

export default DetailView;
