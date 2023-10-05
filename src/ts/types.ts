export enum CarouselMode {
  General = "general",
  Detail = "detail"
}

export interface Source {
  src: string
}

export type CameraId = string;

export interface SurveillanceCarouselProps {
  mode: CarouselMode;
  sources: Map<CameraId, Source>;
}

export interface CarouselProps {
  sources: Map<CameraId, Source>;
  mainSource: CameraId
  setMainSource: (index: CameraId) => void
}

export interface SurveillanceCarouselModeParams {
  imagesSrc: Array<string>
  mainImage: number
  setMainImage: (idx: number) => number
}

export interface ImageProps {
  src: string
}

export type RefImage = HTMLImageElement;

export interface ImagePreviewProps {
  src: string;
  className?: string;
  onClick?: () => void;
  ref: (ref: HTMLImageElement) => void;
}

export interface VideoProps {
  src: string
}
