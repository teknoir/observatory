import { useEffect, useState } from 'react';
import _union from 'lodash/union';
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { Source, CameraId } from 'ts/types';
import { Main } from './enums';

type Sources = Map<CameraId, Source>;

const useSortableSources = (
  sources: Sources,
  onMain?: (index: CameraId) => void
) => {
  const [sourcesKeys, setSourcesKeys] = useState<string[]>([...sources.keys()]);
  const [activeId, setActiveId] = useState<CameraId | null>(null);
  const activeItem = sources.get(activeId!) ?? ({} as Source);

  useEffect(() => {
    setSourcesKeys((prev) => _union(prev, [...sources.keys()]));
  }, [sources]);

  const swapBoxes = (fromVal: CameraId, toVal: CameraId) => {
    const keys = sourcesKeys.slice();
    const fromIndex = keys.indexOf(fromVal);
    const toIndex = keys.indexOf(toVal);
    keys[fromIndex] = toVal;
    keys[toIndex] = fromVal;
    setSourcesKeys(keys);
  };

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as CameraId);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id === Main) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      onMain(active.id);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      swapBoxes(active.id, over.id);
    }
    setActiveId(null);
  };

  return {
    sourcesKeys,
    activeId,
    activeItem,
    onDragStart,
    onDragEnd,
  };
};

export default useSortableSources;
