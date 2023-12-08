import { TYPES } from 'enums/wss';

export const getStartImagesStreamMsg = (
  peripheralName: string,
  device: string,
  duration: number
) => {
  return {
    type: TYPES.START_IMAGES_STREAM,
    peripheralName,
    duration,
    device,
  };
};
