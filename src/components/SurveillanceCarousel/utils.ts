import { Source, CameraId, SourceStatus } from 'ts/types';

// export function createRandomImages(quantity: number) {
//   const images = []
//   for (let i = 0; i < quantity; i++) {
//     const randomNum = generateRandomNum()
//     const newImage = `https://picsum.photos/id/${randomNum}/400/300`
//     images.push(newImage)
//   }
//   return images
// }

export function createRandomSources(quantity: number) {
  const images: Map<CameraId, Source> = new Map();
  for (let i = 0; i < quantity; i++) {
    const randomNum = generateRandomNum();
    const newImage =
      i % 3 === 0
        ? `https://picsum.photos/id/${randomNum}/800/450`
        : `https://picsum.photos/id/${randomNum}/400/300`;
    images.set(String(i + 1), {
      src: newImage,
      peripheralId: String(i + 1),
      peripheralName: `camera_${i + 1}`,
      device: 'demo',
      status: SourceStatus.Active,
    });
  }
  return images;
}

export function generateRandomNum() {
  const randomNum = Math.ceil(Math.random() * 100);
  return randomNum;
}
