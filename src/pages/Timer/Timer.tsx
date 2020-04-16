import React, { useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import moment from 'moment';
import ActiveTimer from '../../components/ActiveTimer/ActiveTimer';
import useStopwatch from '../../hooks/useStopwatch/useStopwatch';
import TimerControls from '../../components/TimerControls/TimerControls';
import LoggedTask from '../../components/LoggedTask/LoggedTask';
import { TasksContext } from '../../context/TasksContext';

const Timer: React.FC = () => {
  const { seconds, started, start, startNew, stop } = useStopwatch();
  const {
    state: { tasks },
    dispatch,
  } = useContext(TasksContext);

  const [startDate, setStartDate] = useState(moment());

  return (
    <div>
      {tasks
        .filter(task => false === task.archived)
        .map(task => (
          <LoggedTask key={task.id} task={task} />
        ))}
      <ActiveTimer seconds={seconds} />
      <TimerControls
        started={started}
        onClickStart={() => {
          setStartDate(moment());

          start();
        }}
        onClickStartNew={() => {
          dispatch({
            type: 'CreateNew',
            payload: {
              timer: { id: uuid(), seconds: seconds, startDate: startDate, endDate: moment() },
              description: null,
              color: null,
            },
          });

          setStartDate(moment());

          startNew();
        }}
        onClickStop={() => {
          dispatch({
            type: 'CreateNew',
            payload: {
              timer: { id: uuid(), seconds: seconds, startDate: startDate, endDate: moment() },
              description: null,
              color: null,
            },
          });

          stop();
        }}
      />
    </div>
  );
};

export default Timer;
