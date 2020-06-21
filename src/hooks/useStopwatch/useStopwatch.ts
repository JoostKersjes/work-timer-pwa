import React, { useEffect, useRef, useReducer } from 'react';
import { createContainer } from 'unstated-next';

interface State {
  seconds: number;
  started: boolean;
}

type Actions =
  | {
      type: 'Start';
    }
  | {
      type: 'Stop';
    }
  | {
      type: 'Increment';
    };

const initialState: State = {
  seconds: 0,
  started: false,
};

const reducer: React.Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case 'Start':
      return { ...state, started: true, seconds: 0 };

    case 'Stop':
      return { ...state, started: false, seconds: 0 };

    case 'Increment':
      return {
        ...state,
        seconds: state.seconds + 1,
      };

    default:
      return state;
  }
};

const useStopwatch = () => {
  const [{ seconds, started }, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (started) {
      const id = setInterval(() => {
        dispatch({ type: 'Increment' });
      }, 1000);

      intervalRef.current = id;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [started]);

  return {
    seconds,
    started,
    start: () => dispatch({ type: 'Start' }),
    stop: () => dispatch({ type: 'Stop' }),
  };
};

export default createContainer(useStopwatch);
