import ReactPlayer, { ReactPlayerProps } from "react-player";

const VideoPlayer = ({
  url,
  autoPlay = false,
  ...rest
}: ReactPlayerProps) => (
  <ReactPlayer
    url={url}
    controls
    playing={autoPlay}
    muted={autoPlay}
    {...rest}
  />
)

export default VideoPlayer;
