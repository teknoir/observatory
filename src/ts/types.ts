export enum CarouselMode {
  General = "general",
  Detail = "detail"
}

interface Source {
  src: string
}

export interface SurveillanceCarouselProps {
  mode: CarouselMode;
  sources: Source["src"][]
}

export interface CarouselProps {
  sources: Source["src"][]
  mainSource: number
  setMainSource: (index: number) => void
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

export interface SelectOptions {
  label: string
  value: number | string
}

export interface SelectProps {
  label?: string
  options: Array<SelectOptions>
  value: string | number
  onChange: (e: EventEmitter) => void
}
