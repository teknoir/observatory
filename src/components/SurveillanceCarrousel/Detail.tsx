import { CarouselProps } from 'ts/types';
import CarrouselImage from './CarrouselImage';
import CarrouselImagePreview from './CarrouselImagePreview';

function SurveillanceCarouselDetail({
  sources,
  mainSource,
  setMainSource,
}: CarouselProps) {
  const {
    src: mainSrc = '',
    peripheralName: mainPeripheralName = '',
    peripheralId: mainPeripheralId = '',
  } = sources.get(mainSource) ?? {};

  return (
    <section className="flex flex-col">
      <CarrouselImage
        id={mainPeripheralId}
        src={mainSrc}
        title={mainPeripheralName}
      />
      <div className="flex">
        <button>&lt;</button>
        <div className="flex flex-row overflow-auto">
          {sources.size > 0 ? (
            [...sources.keys()].map((sourceKey) => {
              const { src = '', peripheralName = '' } =
                sources.get(sourceKey) ?? {};
              return (
                <div key={src} onClick={() => setMainSource(sourceKey)}>
                  <CarrouselImagePreview
                    id={sourceKey}
                    src={src}
                    title={peripheralName}
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

export default SurveillanceCarouselDetail;
