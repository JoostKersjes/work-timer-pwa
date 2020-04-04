import React from 'react';
import ActiveTimer from '../../components/ActiveTimer/ActiveTimer';

import useStopwatch from '../../hooks/useStopwatch/useStopwatch';

const Timer: React.FC = () => {
  const { seconds, start } = useStopwatch();

  return (
    <div>
      timer
      <ActiveTimer seconds={seconds} />
      <button onClick={start}>start</button>
    </div>
  );
};

export default Timer;
