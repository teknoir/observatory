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

export type Options = Array<SelectOptions>;

export interface IAlertEvent {
  detection_id: string;
  annotations: [],
  branch: string;
  count: number;
  country: string;
  duration: number;
  end_time: string;
  facility: string;
  from_device: string;
  group: string;
  label: string;
  last_modification: string;
  message: string;
  peripheral_id: string;
  peripheral_name: string;
  peripheral_type: string;
  proof: {
    id: string;
  },
  region: string;
  sent: string;
  severity: string;
  site: string;
  start_time: string;
  type: string;
  zone: string;
}
