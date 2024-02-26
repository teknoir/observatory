import Resizable from 'components/Resizable/Resizable';
import styles from './ImageViewer.module.scss';
import AnnotationsCanvas from 'components/AnnotationsCanvas/AnnotationsCanvas.tsx';
import { Detection } from 'ts/types.ts';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useMainLayoutContext } from 'context/mainLayoutContext.tsx';
import IconButton from '@mui/material/IconButton';

interface Props {
  src: string;
  detections: Array<Detection>;
}

const ImageViewer = ({ src, detections }: Props) => {
  const { isOpenedRightOverlay, openRightOverlay, closeRightOverlay } =
    useMainLayoutContext();

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
      <IconButton
        className={styles.settingsIcon}
        onClick={isOpenedRightOverlay ? closeRightOverlay : openRightOverlay}
      >
        <SettingsOutlinedIcon />
      </IconButton>
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
