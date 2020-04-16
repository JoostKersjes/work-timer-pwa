import React, { createContext, Dispatch, useReducer, useEffect } from 'react';
import { uuid } from 'uuidv4';
import moment from 'moment';
import { Timer } from '../types/timer';
import { Task } from '../types/task';

const TASKS_KEY = 'wtpwa_tasks';

interface State {
  tasks: Task[];
}

type Actions =
  | {
      type: 'LoadFromStorage';
    }
  | {
      type: 'CreateNew';
      payload: {
        timer: Timer;
        description: string | null;
        color: string | null;
      };
    }
  | {
      type: 'AddTimers';
      payload: {
        taskId: string;
        timers: Timer[];
      };
    }
  | {
      type: 'Archive';
      payload: {
        taskId: string;
      };
    };

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

const reducer: React.Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case 'LoadFromStorage':
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

    case 'CreateNew':
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

    case 'AddTimers':
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

    case 'Archive':
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

export const TasksContext = createContext<{
  state: State;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

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
    dispatch({ type: 'LoadFromStorage' });
  }, [dispatch]);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>{props.children}</TasksContext.Provider>
  );
};
