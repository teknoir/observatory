import { VideoProps } from 'ts/types';

function CarouselVideo({ src }: VideoProps) {
  return (
    <video
      controls
      src={src}
      // keeping this src as an example:
      // src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    ></video>
  );
}

export default CarouselVideo;
