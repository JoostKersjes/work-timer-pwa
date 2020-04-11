import React, { useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import moment from 'moment';
import ActiveTimer from '../../components/ActiveTimer/ActiveTimer';
import useStopwatch from '../../hooks/useStopwatch/useStopwatch';
import TimerControls from '../../components/TimerControls/TimerControls';
import LoggedTask from '../../components/LoggedTask/LoggedTask';
import { ActionType, TasksStateContext, TasksDispatchContext } from '../../context/TasksContext';

const Timer: React.FC = () => {
  const { seconds, started, start, startNew, stop } = useStopwatch();
  const { tasks } = useContext(TasksStateContext);
  const tasksDispatch = useContext(TasksDispatchContext);

  const [startDate, setStartDate] = useState(moment());

  if (undefined === tasksDispatch) {
    return <></>;
  }

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
          tasksDispatch({
            type: ActionType.CreateNew,
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
          tasksDispatch({
            type: ActionType.CreateNew,
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
