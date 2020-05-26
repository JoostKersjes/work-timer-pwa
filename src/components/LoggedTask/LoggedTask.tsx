import React, { useContext } from 'react';
import TimerText from '../TimerText/TimerText';
import { Task } from '../../types/task';
import Button from 'antd/es/button';
import { TasksContext } from '../../context/TasksContext';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

interface Props {
  task: Task;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

const LoggedTask: React.FC<Props> = props => {
  const { dispatch } = useContext(TasksContext);

  return (
    <div>
      <span {...props?.dragHandleProps}>{props.task.description}</span>

      <div>
        <TimerText seconds={props.task.timers.reduce((acc, cur) => acc + cur.seconds, 0)} />
      </div>

      {props.task.timers.map(timer => (
        <div key={timer.id}>
          <span title={timer.startDate.toLocaleString()}>{timer.startDate.format('HH:mm')}</span>
          {' - '}
          <span title={timer.endDate.toLocaleString()}>{timer.endDate.format('HH:mm')}</span>
        </div>
      ))}

      {!props.task.archived && (
        <Button
          onClick={() => {
            dispatch({ type: 'Archive', payload: { taskId: props.task.id } });
          }}
        >
          Log
        </Button>
      )}
    </div>
  );
};

export default LoggedTask;
