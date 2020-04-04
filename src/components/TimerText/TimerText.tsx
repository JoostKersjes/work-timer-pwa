import React, { useContext } from 'react';

import styles from './TimerText.module.css';
import { SettingsStateContext } from '../../context/SettingsContext';

interface Props {
  seconds: number;
}

const TimerText: React.FC<Props> = props => {
  const state = useContext(SettingsStateContext);

  const hours = Math.floor(props.seconds / 3600);
  const minutes = Math.floor((props.seconds % 3600) / 60);
  const seconds = props.seconds % 60;

  return (
    <>
      {state.clockNotation ? (
        <span className={styles.clock}>
          {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}
        </span>
      ) : (
        <span className={styles.clock}>
          {hours}h {minutes}m
        </span>
      )}
      <span className={styles.seconds}>{seconds}</span>
    </>
  );
};

export default TimerText;
