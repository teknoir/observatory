import { Moment } from "moment/moment";

export enum CarouselMode {
  General = "general",
  Detail = "detail"
}

export interface Source {
  src: string;
  peripheralId: string;
  peripheralName: string;
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

export interface SelectOptions {
  label: string
  value: number | string
}

export type Options = Array<SelectOptions>;

export interface MovementsTimeLineParams {
  dataMotions: Array<object>
  dataAlerts: Array<object>
  xAccessor: (d: object) => Date | number
  yAccessor: (d: object) => string
}

export interface TimelapseParams {
  title: string
  timeRange: Array<Date | number>
  format: (d: Date) => string
}

export type Accessor = Function

export interface CirclesProps {
  data: Array<object>
  keyAccessor: Accessor
  xAccessor: Accessor
  yAccessor: Accessor
  radius?: number
  className?: string
}

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

export interface IQuery {
  [key: string]: string | number | boolean | IQuery | IQuery[];
}

export interface IEventsRequestParams {
  startDate: Date | Moment;
}

export interface IEventsRequestParamsById {
  startDate: Date | Moment;
  peripheralId: string;
}

export interface IMotionsCounts {
  [key: string]: number;
}
