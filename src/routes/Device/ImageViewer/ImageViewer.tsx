import Resizable from 'components/Resizable/Resizable';
import styles from './ImageViewer.module.scss';
import AnnotationsCanvas from 'components/AnnotationsCanvas/AnnotationsCanvas.tsx';
import { Detection } from 'ts/types.ts';

interface Props {
  src: string;
  detections: Array<Detection>;
}

const ImageViewer = ({ src, detections }: Props) => {
  return (
    <Resizable
      enable={{
        bottom: true,
      }}
      defaultSize={{
        width: '100%',
        height: 520,
      }}
      minHeight={160}
      className={styles.imageWrapper}
    >
      <AnnotationsCanvas
        src={src}
        detections={detections}
        stylesImage={styles.image}
        labelFontSize={20}
      />
    </Resizable>
  );
};

export default ImageViewer;
