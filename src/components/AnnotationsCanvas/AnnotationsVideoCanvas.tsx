import { AnnotationsVideoCanvasProps, TimestampedDetection } from 'ts/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDisplaySettingsContext } from 'context/DisplaySettingsContext/displaySettingsContext.tsx';
import styleVariables from 'enums/styleVariables.module.scss';

function AnnotationsVideoCanvas({
  timestampedDetections,
  video,
  className,
}: AnnotationsVideoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { boundaryBoxesChecked, objectLabelsChecked, colorFillBoxesChecked } =
    useDisplaySettingsContext();
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null
  );

  // Sets the canvas size based on the size of the video playback area
  const setCanvasSize = useCallback(
    (canvas: HTMLCanvasElement) => {
      if (!videoElement) return;

      const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
      let scaledWidth, scaledHeight;

      if (videoElement.clientWidth / aspectRatio <= videoElement.clientHeight) {
        // If the width is the constraining factor
        scaledWidth = videoElement.clientWidth;
        scaledHeight = scaledWidth / aspectRatio;
      } else {
        // If the height is the constraining factor
        scaledHeight = videoElement.clientHeight;
        scaledWidth = scaledHeight * aspectRatio;
      }

      canvas.width = scaledWidth;
      canvas.height = scaledHeight;
    },
    [
      videoElement?.videoWidth,
      videoElement?.videoHeight,
      videoElement?.clientWidth,
      videoElement?.clientHeight,
    ]
  );

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext('2d');

    if (!context) return;

    if (!video || !video.getInternalPlayer()) return;

    setVideoElement(video.getInternalPlayer() as HTMLVideoElement);
    setCanvasSize(canvas);
    context.clearRect(0, 0, canvas.width, canvas.height);

    const fontSize = 12;
    context.font = `bold ${fontSize}px Verdana`;
    context.lineWidth = 1;

    if (timestampedDetections) {
      timestampedDetections.forEach(
        (timestampedDetection: TimestampedDetection) => {
          const { label, x1, y1, x_center, y_center, width, height } =
            timestampedDetection.detection;

          const x = x1 * canvas.width;
          const y = y1 * canvas.height;
          const xc = x_center * canvas.width;
          const yc = y_center * canvas.height;
          const w = width * canvas.width;
          const h = height * canvas.height;

          context.strokeStyle = 'white';
          context.fillStyle = 'white';

          if (objectLabelsChecked) {
            context.fillText(
              label,
              xc - w / 2 + fontSize,
              yc - h / 2 - fontSize < fontSize
                ? fontSize
                : yc - h / 2 + 2 * fontSize
            );
          }

          if (boundaryBoxesChecked) {
            context.strokeRect(x, y, w, h);

            if (colorFillBoxesChecked) {
              context.fillStyle = styleVariables.blueBoundaryBoxFill;
              context.fillRect(x, y, w, h);
            }
          }
        }
      );
    }
  }, [
    video,
    timestampedDetections,
    boundaryBoxesChecked,
    objectLabelsChecked,
    colorFillBoxesChecked,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={canvasRef.current?.width}
      height={canvasRef.current?.height}
    />
  );
}

export default AnnotationsVideoCanvas;
