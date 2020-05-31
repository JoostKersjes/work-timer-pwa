import { Timer } from './timer';

export interface Task {
  id: string;
  description: string;
  color: string;
  timers: Timer[];
}
