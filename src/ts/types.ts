import { Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';
import { Moment } from 'moment/moment';
import { NotificationStatus } from 'enums/notifications';

export enum CarouselMode {
  AllCamerasView = 'allCamerasView',
  AlternativeView = 'alternativeView',
  Detail = 'detail',
  General = 'general',
}

export enum SourceStatus {
  Active = 1,
  Inactive = 0,
}

export interface Source {
  src: string;
  peripheralId: string;
  peripheralName: string;
  device: string;
  status: SourceStatus;
  detections: Array<Detection>;
}

export type CameraId = string;

export interface SurveillanceCarouselProps {
  mode: CarouselMode;
  sources: Map<CameraId, Source>;
}

export interface CarouselProps {
  sources: Map<CameraId, Source>;
  mainSource: CameraId;
  setMainSource: (index: CameraId) => void;
  peripheralIdNotified?: string;
}

export interface SurveillanceCarouselModeParams {
  imagesSrc: Array<string>;
  mainImage: number;
  setMainImage: (idx: number) => number;
}

export interface ImageProps {
  id: string;
  src: string;
  title: string;
  status: SourceStatus;
  detections: Array<Detection>;
}

export interface Detection {
  detection: DetectionDetail;
  lineage: Array<object>;
  location: object;
  nearest_neighbors: object;
  peripheral: object;
  proximity: Array<object>;
  state: object;
  timestamp: string;
  type: string;
}

export interface DetectionDetail {
  label: string;
  x1: number;
  y1: number;
  x_center: number;
  y_center: number;
  width: number;
  height: number;
  id: string;
}

export interface AnnotationsCanvasProps {
  src: string;
  detections: Array<Detection>;
  stylesImage: string;
  labelFontSize?: number;
  showBoundingBoxes: boolean;
  showLabels: boolean;
}

export type RefImage = HTMLImageElement;

export interface ImagePreviewProps {
  id: string;
  src: string;
  title: string;
  status: SourceStatus;
  className?: string;
  classNameContainer?: string;
  onClick?: () => void;
  ref: (ref: HTMLImageElement) => void;
  children?: ReactNode;
  centered?: boolean;
}

export interface VideoProps {
  src: string;
}

export enum LabelSize {
  medium = 'LabelMedium',
  large = 'LabelLarge',
}

export interface SelectOptions {
  label: string;
  value: number | string;
  icon?: ReactNode;
  labelSize?: LabelSize;
}

export type Options = Array<SelectOptions>;

export interface TimelapseParams {
  title: string;
  timeRange: Array<Date | number>;
  format: (d: Date) => string;
}

export type Accessor = (d: object) => number | undefined;

export interface CirclesProps {
  data: Array<object>;
  keyAccessor: Accessor;
  xAccessor: Accessor;
  yAccessor: Accessor;
  radius?: number;
  className?: string;
  // TODO: Use correct type for onCircleClick
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  onCircleClick?: (d) => void;
  onClickAccessor?: Accessor;
  onCircleHover?: (event: MouseEvent<SVGCircleElement>, data: object) => void;
}

export interface HomeContextProps {
  mainImageCarousel: string;
  setMainImageCarousel: Dispatch<SetStateAction<string>>;
  layout: CarouselMode;
  setLayout: Dispatch<SetStateAction<CarouselMode>>;
  numCameras: number;
  setNumCameras: Dispatch<SetStateAction<number>>;
  peripheralIdNotified: string;
  setPeripheralIdNotified: Dispatch<SetStateAction<string>>;
}

export interface PopoverInfoProps {
  detection_id: string;
  duration: number;
  peripheral_id: string;
  peripheral_name: string;
  severity: string;
  start_time: string;
  type: string;
  video_url: string;
  ground_truth?: AlertTypes;
}

export type DetectionId = string;

export interface IAlertEvent {
  detection_id: DetectionId;
  duration: number;
  label: string;
  message: string;
  peripheral_id: string;
  peripheral_name: string;
  peripheral_type: string;
  severity: string;
  start_time: string;
  type: AlertTypes;
  video_snapshot: string;
}

export interface IEventDocument {
  detection_id: DetectionId;
  type: string;
  ground_truth?: AlertTypes;
  start_time: string;
  duration: number;
  severity: string;
  status: EventStatus;
  video_url: string;
  video_snapshot: string;
}

export interface IQuery {
  [key: string]: string | number | boolean | IQuery | IQuery[];
}

export interface IRetrieveEventsRequest {
  fromDate: Date | Moment;
  toDate: Date | Moment;
  types?: AlertTypes[];
  labels?: EventLabels[];
}

export interface IRetrieveEventsRequestById {
  fromDate: Date | Moment;
  toDate: Date | Moment;
  peripheralId: string;
  types?: AlertTypes[];
  labels?: EventLabels[];
}

export type RetrieveEventsResponse = {
  documents: IEventDocument[];
  peripheral_id: string;
  peripheral_name: string;
}[];

export interface IEventDocumentWithPeripheral extends IEventDocument {
  peripheral_id: string;
  peripheral_name: string;
}

export interface IMotionsAggregationRequest {
  fromDate: Date | Moment;
  toDate: Date | Moment;
  peripheralId?: string;
}

export interface IEventsRequestParamsById {
  startDate: Date | Moment;
  peripheralId: string;
}

export interface INotifications {
  detection_id: DetectionId;
  duration: number;
  peripheral_id: string;
  peripheral_name: string;
  severity: string;
  start_time: string;
  type: string;
  video_url: string;
  video_snapshot: string;
}

export interface INotificationsExtended extends INotifications {
  status: NotificationStatus;
}

export interface INotificationsRequest {
  fromDate: Date | Moment;
  toDate: Date | Moment;
  limit?: number;
  status?: NotificationStatus;
}

export enum EventStatus {
  New = 'new',
  Verified = 'verified',
}

export enum IMotionsTypes {
  Cars = 'cars',
  People = 'people',
}

export enum IMotionsActions {
  In = 'in',
  Out = 'out',
}

export interface IMotionsCountsProps {
  type: IMotionsTypes;
  action: IMotionsActions;
  count: number;
  label: string;
}

export interface IMotionsAggregationResponse {
  [key: string]: IMotionsCountsProps;
}

export interface IAlertFormValues {
  ground_truth: AlertTypes;
  comment: string;
}

export enum IconSizes {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
}

export interface ChartDimensions {
  height: number;
  width: number;
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  boundedHeight: number;
  boundedWidth: number;
  boundedScrollWidth: number;
}

export interface IFeedback {
  detection_id: DetectionId;
  creation_time: string;
  ground_truth: AlertTypes;
  comment: string;
}

export enum AlertTypes {
  Loitering = 'loitering',
  NoAlert = 'no_alert',
  OnGround = 'person_down',
  Theft = 'catalytic_theft',
}

export enum EventLabels {
  Person = 'person',
  Car = 'car',
}
