import React, { createContext, useReducer, Dispatch } from 'react';

interface State {
  clockNotation: boolean;
}

type Actions = { type: 'ToggleNotation' };

const initialState: State = { clockNotation: false };

const reducer: React.Reducer<State, Actions> = (state, action) => {
  switch (action.type) {
    case 'ToggleNotation':
      return { ...state, clockNotation: !state.clockNotation };

    default:
      throw new Error();
  }
};

export const SettingsContext = createContext<{ state: State; dispatch: Dispatch<Actions> }>({
  state: initialState,
  dispatch: () => null,
});

export const SettingsContextProviders: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
};
