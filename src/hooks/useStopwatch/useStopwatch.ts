import React, { useEffect, useRef, useReducer } from 'react';

enum ActionType {
  Start = 'start',
  StartNew = 'start-new',
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

    case ActionType.StartNew:
      return { ...state, seconds: 0 };

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
    started,
    start: () => dispatch({ type: ActionType.Start }),
    startNew: () => dispatch({ type: ActionType.StartNew }),
    stop: () => dispatch({ type: ActionType.Stop }),
  };
};

export default useStopwatch;
