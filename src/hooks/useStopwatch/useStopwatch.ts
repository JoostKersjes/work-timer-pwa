import React, { useEffect, useRef, useReducer } from 'react';

enum ActionType {
  Start = 'start',
  Pause = 'pause',
  Stop = 'stop',
  Increment = 'increment',
}

interface IState {
  seconds: number;
  started: boolean;
}

interface IAction {
  type: ActionType;
}

const initialState: IState = {
  seconds: 0,
  started: false,
};

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.Start:
      return { ...state, started: true };

    case ActionType.Pause:
      return { ...state, started: false };

    case ActionType.Stop:
      return { ...state, started: false, seconds: 0 };

    case ActionType.Increment:
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
        dispatch({ type: ActionType.Increment });
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
    start: () => dispatch({ type: ActionType.Start }),
    pause: () => dispatch({ type: ActionType.Pause }),
    stop: () => dispatch({ type: ActionType.Stop }),
  };
};

export default useStopwatch;
