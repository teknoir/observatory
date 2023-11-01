import { MouseEvent } from "react";
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
  id: string
  src: string
  title: string
}

export type RefImage = HTMLImageElement;

export interface ImagePreviewProps {
  id: string;
  src: string;
  title: string;
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
  onCircleHover?: (event: MouseEvent<SVGCircleElement>, data: {}) => void
}

export interface PopoverInfoProps {
  detection_id: string,
  duration: number,
  severity: string,
  start_time: string,
  type: string,
  video_url: string,
}

export type DetectionId = string;

export interface IAlertEvent {
  detection_id: DetectionId;
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

export interface IAlertFormValues {
  has_theft: boolean;
  comment: string;
}
