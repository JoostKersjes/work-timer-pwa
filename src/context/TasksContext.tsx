import React, { createContext, Dispatch, useReducer, useEffect } from 'react';
import { uuid } from 'uuidv4';
import moment from 'moment';
import { Timer } from '../types/timer';
import { Task } from '../types/task';

const TASKS_KEY = 'wtpwa_tasks';

export enum ActionType {
  LoadFromStorage,
  CreateNew,
  AddTimers,
  Archive,
}

interface State {
  tasks: Task[];
}

type Action =
  | {
      type: ActionType.LoadFromStorage;
    }
  | {
      type: ActionType.CreateNew;
      payload: CreateNewPayload;
    }
  | {
      type: ActionType.AddTimers;
      payload: AddTimersPayload;
    }
  | {
      type: ActionType.Archive;
      payload: ArchivePayload;
    };

interface CreateNewPayload {
  timer: Timer;
  description: string | null;
  color: string | null;
}

interface AddTimersPayload {
  taskId: string;
  timers: Timer[];
}

interface ArchivePayload {
  taskId: string;
}

interface StoredTimer {
  id: string;
  seconds: number;
  startDate: string;
  endDate: string;
}

interface StoredTask {
  id: string;
  description: string;
  color: string;
  archived: boolean;
  timers: StoredTimer[];
}

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.LoadFromStorage:
      return {
        ...state,
        tasks: JSON.parse(localStorage.getItem(TASKS_KEY) || '[]').map((task: StoredTask) => ({
          ...task,
          timers: task.timers.map(timer => ({
            ...timer,
            startDate: moment(timer.startDate),
            endDate: moment(timer.endDate),
          })),
        })),
      };

    case ActionType.CreateNew:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: uuid(),
            description: action.payload.description ?? 'New task',
            color: action.payload.color ?? '#fff',
            archived: false,
            timers: [action.payload.timer],
          },
        ],
      };

    case ActionType.AddTimers:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (action.payload.taskId !== task.id) {
            return task;
          }

          return {
            ...task,
            timers: [...task.timers, ...action.payload.timers].sort(
              (a, b) => a.startDate.unix() - b.startDate.unix(),
            ),
          };
        }),
      };

    case ActionType.Archive:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (action.payload.taskId !== task.id) {
            return task;
          }

          return {
            ...task,
            archived: true,
          };
        }),
      };

    default:
      return state;
  }
};

const initialState: State = {
  tasks: [],
};

export const TasksStateContext = createContext(initialState);
export const TasksDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

export const TasksContextProviders: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.tasks.length > 0) {
      console.log('saving');
      localStorage.setItem(TASKS_KEY, JSON.stringify(state.tasks));
    }
  }, [state.tasks]);

  useEffect(() => {
    console.log('loading');
    dispatch({ type: ActionType.LoadFromStorage });
  }, [dispatch]);

  return (
    <TasksStateContext.Provider value={state}>
      <TasksDispatchContext.Provider value={dispatch}>
        {props.children}
      </TasksDispatchContext.Provider>
    </TasksStateContext.Provider>
  );
};
