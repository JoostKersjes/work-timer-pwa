import React from 'react';
import { SettingsContextProvider } from './SettingsContext';
import { TasksContextProvider } from './TasksContext';
import Stopwatch from '../hooks/useStopwatch/useStopwatch';

const Providers: React.FC = props => {
  return (
    <Stopwatch.Provider>
      <SettingsContextProvider>
        <TasksContextProvider>{props.children}</TasksContextProvider>
      </SettingsContextProvider>
    </Stopwatch.Provider>
  );
};

export default Providers;
