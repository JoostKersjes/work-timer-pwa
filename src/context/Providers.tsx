import React from 'react';
import { SettingsContextProviders } from './SettingsContext';

const Providers: React.FC = props => {
  return <SettingsContextProviders>{props.children}</SettingsContextProviders>;
};

export default Providers;
