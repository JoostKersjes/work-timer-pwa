import React from 'react';
import ActiveTimer from '../../components/ActiveTimer/ActiveTimer';

import useStopwatch from '../../hooks/useStopwatch/useStopwatch';
import TimerControls from '../../components/TimerControls/TimerControls';

const Timer: React.FC = () => {
  const { seconds, started, start, startNew, stop } = useStopwatch();

  return (
    <div>
      timer
      <ActiveTimer seconds={seconds} />
      <TimerControls
        started={started}
        onClickStart={start}
        onClickStartNew={startNew}
        onClickStop={stop}
      />
    </div>
  );
};

export default Timer;
