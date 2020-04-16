import React, { useContext } from 'react';
import Switch from 'antd/es/switch';
import { SettingsContext } from '../../context/SettingsContext';

interface Props {}

const Settings = (props: Props) => {
  const { state, dispatch } = useContext(SettingsContext);

  return (
    <Switch
      checkedChildren=":"
      unCheckedChildren="h"
      onChange={() => dispatch({ type: 'ToggleNotation' })}
      checked={state.clockNotation}
    />
  );
};

export default Settings;
