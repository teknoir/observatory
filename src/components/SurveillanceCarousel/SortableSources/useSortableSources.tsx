// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useState } from 'react';
import _union from 'lodash/union';
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { Source, CameraId } from 'ts/types.ts';

type Sources = Map<CameraId, Source>;

const useSortableSources = (sources: Sources) => {
  const [sourcesKeys, setSourcesKeys] = useState<string[]>([...sources.keys()]);
  const [activeId, setActiveId] = useState(null);
  const activeItem = sources.get(activeId) ?? ({} as Source);

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
    console.log('handleDragStart', event.active.id);
    setActiveId(event.active.id);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log('handleDragEnd', active.id, over.id);
    swapBoxes(active.id, over.id);
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
