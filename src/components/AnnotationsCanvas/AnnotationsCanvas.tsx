import { AnnotationsCanvasProps } from 'ts/types';
import { useContext, useEffect, useRef } from 'react';
import {AnnotationsCanvasProps} from 'ts/types';
import { DisplaySettingsContext } from "context/DisplaySettingsContext/DisplaySettingsContext.ts";

function AnnotationsCanvas({
  src,
  detections,
  stylesImage,
  labelFontSize = 12,
}: AnnotationsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    boundaryBoxesChecked,
    objectLabelsChecked,
  } = useContext(DisplaySettingsContext);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext('2d');

    if (!context) return;

    const image = new Image();
    image.src = src;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);

      const fontSize = labelFontSize;
      context.font = `bold ${fontSize}px Verdana`;
      context.lineWidth = 1;

      if (detections) {
        detections.forEach((detection) => {
          const { label, x1, y1, x_center, y_center, width, height } =
            detection.detection;

          const x = x1 * canvas.width;
          const y = y1 * canvas.height;
          const xc = x_center * canvas.width;
          const yc = y_center * canvas.height;
          const w = width * canvas.width;
          const h = height * canvas.height;

          context.strokeStyle = 'white';
          context.fillStyle = 'white';

          if (boundaryBoxesChecked) {
            context.strokeRect(x, y, w, h);
          }

          if (objectLabelsChecked) {
            context.fillText(
              label,
              xc - w / 2 + fontSize,
              yc - h / 2 - fontSize < fontSize
                ? fontSize
                : yc - h / 2 + 2 * fontSize
            );
          }
        });
      }
    }
  }, [src, detections, labelFontSize, boundaryBoxesChecked, objectLabelsChecked])

  return <canvas ref={canvasRef} className={stylesImage} />;
}

export default AnnotationsCanvas;
