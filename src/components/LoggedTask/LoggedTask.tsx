import React, { useContext } from 'react';
import TimerText from '../TimerText/TimerText';
import { Task } from '../../types/task';
import Button from 'antd/es/button';
import { TasksDispatchContext, ActionType } from '../../context/TasksContext';

interface Props {
  task: Task;
}

const LoggedTask: React.FC<Props> = props => {
  const dispatch = useContext(TasksDispatchContext);

  if (undefined === dispatch) {
    return <></>;
  }

  return (
    <div>
      <span>{props.task.description}</span>
      {props.task.timers.map(timer => (
        <div key={timer.id}>
          <TimerText seconds={timer.seconds} />
          <div>
            <span title={timer.startDate.toLocaleString()}>{timer.startDate.format('HH:mm')}</span>
            {' - '}
            <span title={timer.endDate.toLocaleString()}>{timer.endDate.format('HH:mm')}</span>
          </div>
          {!props.task.archived && (
            <Button
              onClick={() => {
                dispatch({ type: ActionType.Archive, payload: { taskId: props.task.id } });
              }}
            >
              Log
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default LoggedTask;
