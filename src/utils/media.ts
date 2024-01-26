import { API_MEDIA_JPEG, API_MEDIA_MP4 } from 'enums/api';

export const getUrlJpeg = (url: string) => `${API_MEDIA_JPEG}/${url}`;
export const getUrlMp4 = (url: string) => `${API_MEDIA_MP4}/${url}`;
