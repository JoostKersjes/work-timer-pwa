import { Timer } from './timer';

export interface Task {
  id: string;
  description: string;
  color: string;
  archived: boolean;
  timers: Timer[];
}
