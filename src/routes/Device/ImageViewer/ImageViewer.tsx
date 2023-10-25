import styles from "./ImageViewer.module.scss";

interface Props {
  src: string;
}

const ImageViewer = ({ src }: Props) => {
  return (
    <div className={styles.root}>
      <img
        src={src}
        className={styles.image}
      />
    </div>
  )
}

export default ImageViewer
