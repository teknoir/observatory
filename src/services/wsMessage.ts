import { TYPES } from 'enums/wss';

export const getStartImagesStreamMsg = (
  peripheralId: string,
  device: string,
  duration: number
) => {
  return {
    type: TYPES.START_IMAGES_STREAM,
    peripheralId,
    duration,
    device,
  };
};
