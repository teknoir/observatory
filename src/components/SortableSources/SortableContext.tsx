import { ReactNode } from 'react';
import { SortableContext, rectSwappingStrategy } from '@dnd-kit/sortable';
import { CameraId } from 'ts/types.ts';

interface Props {
  sourcesKeys: CameraId[];
  children: ReactNode;
}

const Context = ({ sourcesKeys, children }: Props) => {
  return (
    <SortableContext items={sourcesKeys} strategy={rectSwappingStrategy}>
      {children}
    </SortableContext>
  );
};

export default Context;
