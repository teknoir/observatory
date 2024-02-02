import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { DragOverlay } from '@dnd-kit/core';
import styles from './DragOverlay.module.scss';

interface Props {
  children: ReactNode;
}

const DragOverlayComponent = ({ children }: Props) => {
  return createPortal(
    <DragOverlay dropAnimation={null} className={styles.root}>
      {children}
    </DragOverlay>,
    document.body
  );
};

export default DragOverlayComponent;
