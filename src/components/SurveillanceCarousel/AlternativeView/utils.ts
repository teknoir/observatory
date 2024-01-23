import { CarouselProps } from 'ts/types';

export const getImagesFromSources = (
  sourcesKeys: string[],
  sources: CarouselProps['sources']
) =>
  sourcesKeys.map((sourceKey) => {
    const {
      src = '',
      peripheralName = '',
      status = 0,
      peripheralId = '',
    } = sources.get(sourceKey) ?? {};
    return {
      sourceKey,
      src,
      peripheralName,
      status,
      peripheralId,
    };
  });
