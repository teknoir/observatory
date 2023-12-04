import { useEffect, useState, DragEvent } from 'react';
import _union from 'lodash/union';
import { Source, CameraId } from 'ts/types';
import styleVariables from 'enums/styleVariables.module.scss';

type Sources = Map<CameraId, Source>;

const useOrderedSourcesKeys = (sources: Sources) => {
  const [sourcesKeys, setSourcesKeys] = useState<string[]>([...sources.keys()]);

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

  const handleDragStart = (sourceKey: CameraId) => (event: DragEvent) => {
    (
      event.target as HTMLInputElement
    ).style.border = `6px solid ${styleVariables.offWhite}`;
    const fromBox = JSON.stringify({ val: sourceKey });
    event.dataTransfer.setData('dragContent', fromBox);
  };

  const handleDragEnd = (event: DragEvent) => {
    (event.target as HTMLInputElement).style.border = 'none';
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault(); // Necessary. Allows us to drop.
    return false;
  };

  const handleDrop = (sourceKey: CameraId) => (event: DragEvent) => {
    event.preventDefault();
    try {
      const fromBox = JSON.parse(event.dataTransfer.getData('dragContent'));
      swapBoxes(fromBox.val, sourceKey);
    } catch (e) {
      return undefined;
    }
    return false;
  };

  return {
    sourcesKeys,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop,
  };
};

export default useOrderedSourcesKeys;
