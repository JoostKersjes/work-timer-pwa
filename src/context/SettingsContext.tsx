import React, { createContext, useReducer, Dispatch } from 'react';

export enum SettingsActionType {
  ToggleNotation = 'toggleNotation',
}

interface State {
  clockNotation: boolean;
}

interface Action {
  type: SettingsActionType;
}

const initialState: State = { clockNotation: false };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case SettingsActionType.ToggleNotation:
      return { ...state, clockNotation: !state.clockNotation };

    default:
      throw new Error();
  }
};

export const SettingsStateContext = createContext(initialState);
export const SettingsDispatchContext = createContext<Dispatch<Action> | undefined>(undefined);

export const SettingsContextProviders: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SettingsStateContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>
        {props.children}
      </SettingsDispatchContext.Provider>
    </SettingsStateContext.Provider>
  );
};
