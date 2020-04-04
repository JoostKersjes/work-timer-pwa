import React from 'react';

import TimerText from '../TimerText/TimerText';

interface Props {
  seconds: number;
}

const ActiveTimer: React.FC<Props> = props => {
  return (
    <div>
      <TimerText seconds={props.seconds} />
    </div>
  );
};

export default ActiveTimer;
