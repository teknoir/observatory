import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import TitleContainer from 'components/SurveillanceCarousel/TitleContainer/TitleContainer';
import { ImageProps } from 'ts/types';
import APP_URLS from 'enums/urls';
import { generatePath } from 'utils/router';
import styles from './CarouselImage.module.scss';
import {useEffect, useRef} from "react";

function CarouselImage({ id, src, title, status, detections }: ImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const colors: Record<string, string> = {
        "person": "magenta",
        "car": "cyan",
        "truck": "cyan",
        "motorbike": "cyan",
        "bicycle": "cyan"
    };

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
          context.drawImage(image, 0, 0)

          const fontSize = 9;
          context.font = `bold ${fontSize}px Verdana`;
          context.lineWidth = 1;

          if (detections) {
              detections.forEach((detection) => {
                  const {
                      label,
                      x1,
                      y1,
                      x_center,
                      y_center,
                      width,
                      height,
                      id,
                  } = detection.detection;

                  const x = x1 * canvas.width;
                  const y = y1 * canvas.height;
                  const xc = x_center * canvas.width;
                  const yc = y_center * canvas.height;
                  const w = width * canvas.width;
                  const h = height * canvas.height;

                  context.strokeStyle = colors[label] || 'black';
                  context.fillStyle = colors[label] || 'black';

                  context.strokeRect(x, y, w, h);
                  context.fillText(
                      label,
                      xc,
                      yc - fontSize < fontSize ? fontSize : yc - fontSize
                  );
                  context.fillText(
                      `#${id.slice(-4)}`,
                      xc,
                      yc + fontSize / 4 < fontSize ? fontSize : yc + fontSize / 4
                  );
              });
          }
      }
  }, [src])

  return (
    <div className={styles.root}>
      <canvas ref={canvasRef} className={styles.image} />
      <TitleContainer title={title} status={status} />
      <div className={styles.hoverState}>
        <Link
          component={RouterLink}
          to={generatePath(APP_URLS.devices, {
            peripheralId: id,
            peripheralName: title,
          })}
          color="inherit"
          underline="none"
          className={styles.hoverStateLink}
        >
          View device
        </Link>
      </div>
    </div>
  );
}

export default CarouselImage;
