import React from 'react';

import styles from './ActiveTimer.module.css';

interface Props {
  seconds: number;
  clockNotation?: boolean;
}

const ActiveTimer: React.FC<Props> = props => {
  const hours = Math.floor(props.seconds / 3600);
  const minutes = Math.floor((props.seconds % 3600) / 60);
  const seconds = props.seconds % 60;

  return (
    <div>
      {props.clockNotation ? (
        <span className={styles.clock}>
          {hours}:{minutes}
        </span>
      ) : (
        <span className={styles.clock}>
          {hours}h {minutes}m
        </span>
      )}
      <span className={styles.seconds}>{seconds}</span>
    </div>
  );
};

export default ActiveTimer;
