import { ReactNode } from 'react';
import {
  DndContext,
  pointerWithin,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import _sortBy from 'lodash/sortBy';
import { CameraId } from 'ts/types.ts';

interface Props {
  sourcesKeys: CameraId[];
  children: ReactNode;
  onDragStart: (event: DragStartEvent) => void;
  onDragEnd: (event: DragEndEvent) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const pointerWithinCustom = (args) => {
  const res = pointerWithin(args);
  if (res.length > 0 && res.find(({ id }) => id === 'main')) {
    return _sortBy(res, ({ id }) => (id === 'main' ? 0 : 1));
  }
  return res;
};

const Context = ({ onDragStart, onDragEnd, children }: Props) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 0.01,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
        distance: 0.01,
      },
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithinCustom}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      autoScroll={false}
    >
      {children}
    </DndContext>
  );
};

export default Context;
