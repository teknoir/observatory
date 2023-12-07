import ReactPlayer, { ReactPlayerProps } from 'react-player';
import './VideoPlayer.scss';

interface Props {
  posterUrl?: string;
}

const VideoPlayer = ({
  url,
  posterUrl = '',
  autoPlay = false,
  ...rest
}: ReactPlayerProps & Props) => (
  <ReactPlayer
    url={url}
    controls
    playing={autoPlay}
    muted={autoPlay}
    light={posterUrl ? <img src={posterUrl} alt="" /> : ''}
    {...rest}
  />
);

export default VideoPlayer;
