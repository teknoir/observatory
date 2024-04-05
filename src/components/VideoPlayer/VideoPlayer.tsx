import ReactPlayer, { ReactPlayerProps } from 'react-player';
import './VideoPlayer.scss';
import { LegacyRef } from 'react';

interface Props {
  posterUrl?: string;
  playerRef: LegacyRef<ReactPlayer>;
}

const VideoPlayer = ({
  url,
  posterUrl = '',
  playerRef = null,
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
