import React from 'react';
import { SettingsContextProvider } from './SettingsContext';
import { TasksContextProvider } from './TasksContext';

const Providers: React.FC = props => {
  return (
    <SettingsContextProvider>
      <TasksContextProvider>{props.children}</TasksContextProvider>
    </SettingsContextProvider>
  );
};

export default Providers;
