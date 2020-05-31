import React, { createContext, Dispatch, useReducer, useEffect } from 'react';
import { uuid } from 'uuidv4';
import moment from 'moment';
import { Timer } from '../types/timer';
import { Task } from '../types/task';

const TASKS_KEY = 'wtpwa_tasks';
const ARCHIVE_KEY = 'wtpwa_archive';

interface State {
  tasks: Task[];
  archive: Task[];
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
      type: 'Combine';
      payload: {
        sourceTaskId: string;
        targetTaskId: string;
      };
    }
  | {
      type: 'Archive';
      payload: {
        taskId: string;
      };
    }
  | {
      type: 'ChangeOrder';
      payload: {
        taskId: string;
        newIndex: number;
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
  timers: StoredTimer[];
}

function sortArchive(a: Task, b: Task): number {
  const aTimer = a.timers[0]?.startDate.unix() || 0;
  const bTimer = b.timers[0]?.startDate.unix() || 0;

  return aTimer - bTimer;
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
        archive: JSON.parse(localStorage.getItem(ARCHIVE_KEY) || '[]').map((task: StoredTask) => ({
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
            timers: [action.payload.timer],
          },
        ],
      };

    case 'Combine':
      const inheritedTimers = state.tasks.find(task => action.payload.sourceTaskId === task.id)
        ?.timers;

      if (!inheritedTimers) {
        return state;
      }

      return {
        ...state,
        tasks: state.tasks
          .filter(task => action.payload.sourceTaskId !== task.id)
          .map(task => {
            if (action.payload.targetTaskId !== task.id) {
              return task;
            }

            return {
              ...task,
              timers: [...task.timers, ...inheritedTimers].sort(
                (a, b) => a.startDate.unix() - b.startDate.unix(),
              ),
            };
          }),
      };

    case 'Archive':
      const taskToArchive = state.tasks.find(task => action.payload.taskId === task.id);

      if (!taskToArchive) {
        return state;
      }

      return {
        ...state,
        tasks: state.tasks.filter(task => action.payload.taskId !== task.id),
        archive: state.archive.concat([taskToArchive]).sort(sortArchive),
      };

    case 'ChangeOrder':
      const newTasks = state.tasks;
      const oldIndex = newTasks.findIndex(task => action.payload.taskId === task.id);
      const splicedTask = newTasks.splice(oldIndex, 1)[0];
      newTasks.splice(action.payload.newIndex, 0, splicedTask);

      return {
        ...state,
        tasks: newTasks,
      };

    default:
      return state;
  }
};

const initialState: State = {
  tasks: [],
  archive: [],
};

export const TasksContext = createContext<{
  state: State;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const TasksContextProvider: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.tasks.length > 0) {
      console.log('saving');
      localStorage.setItem(TASKS_KEY, JSON.stringify(state.tasks));
      localStorage.setItem(ARCHIVE_KEY, JSON.stringify(state.archive));
    }
  }, [state]);

  useEffect(() => {
    console.log('loading');
    dispatch({ type: 'LoadFromStorage' });
  }, [dispatch]);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>{props.children}</TasksContext.Provider>
  );
};
