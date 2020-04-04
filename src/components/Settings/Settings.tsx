import React, { useContext } from 'react';
import Switch from 'antd/es/switch';
import {
  SettingsActionType,
  SettingsDispatchContext,
  SettingsStateContext,
} from '../../context/SettingsContext';

interface Props {}

const Settings = (props: Props) => {
  const state = useContext(SettingsStateContext);
  const dispatch = useContext(SettingsDispatchContext);

  const toggleNotation = () => {
    if (dispatch) {
      dispatch({ type: SettingsActionType.ToggleNotation });
    }
  };

  return (
    <Switch
      checkedChildren=":"
      unCheckedChildren="h"
      onChange={toggleNotation}
      checked={state.clockNotation}
    />
  );
};

export default Settings;
