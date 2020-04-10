import { Moment } from 'moment';

export interface Timer {
  id: string;
  seconds: number;
  startDate: Moment;
  endDate: Moment;
}
