import Resizable from 'components/Resizable/Resizable';
import styles from './ImageViewer.module.scss';

interface Props {
  src: string;
}

const ImageViewer = ({ src }: Props) => {
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
      <img src={src} className={styles.image} />
    </Resizable>
  );
};

export default ImageViewer;
