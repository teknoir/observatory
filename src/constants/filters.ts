import { AlertTypes, EventLabels } from 'ts/types';

export const defaultTypes = [
  AlertTypes.Theft,
  AlertTypes.Loitering,
  AlertTypes.OnGround,
];

export const defaultLabels: EventLabels[] = [
  EventLabels.Person,
  EventLabels.Car,
];
