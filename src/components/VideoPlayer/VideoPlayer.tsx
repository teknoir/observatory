import ReactPlayer, { ReactPlayerProps } from 'react-player';
import './VideoPlayer.scss';
import { RefObject } from 'react';

interface Props {
  posterUrl?: string;
  playerRef?: RefObject<ReactPlayer>;
}

const VideoPlayer = ({
  url,
  posterUrl = '',
  playerRef,
  autoPlay = false,
  ...rest
}: ReactPlayerProps & Props) => (
  <ReactPlayer
    url={url}
    controls
    playing={autoPlay}
    muted={autoPlay}
    light={posterUrl ? <img src={posterUrl} alt="" /> : ''}
    ref={playerRef}
    {...rest}
  />
);

export default VideoPlayer;
