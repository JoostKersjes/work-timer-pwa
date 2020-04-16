import React, { useContext } from 'react';
import { TasksContext } from '../../context/TasksContext';
import LoggedTask from '../../components/LoggedTask/LoggedTask';

const Log: React.FC = () => {
  const {
    state: { tasks },
  } = useContext(TasksContext);

  return (
    <div>
      {tasks
        .filter(task => true === task.archived)
        .map(task => (
          <LoggedTask key={task.id} task={task} />
        ))}
    </div>
  );
};

export default Log;
