import React from 'react';
import { SettingsContextProviders } from './SettingsContext';
import { TasksContextProviders } from './TasksContext';

const Providers: React.FC = props => {
  return (
    <SettingsContextProviders>
      <TasksContextProviders>{props.children}</TasksContextProviders>
    </SettingsContextProviders>
  );
};

export default Providers;
