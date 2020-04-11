import React, { useContext } from 'react';
import { TasksStateContext } from '../../context/TasksContext';
import LoggedTask from '../../components/LoggedTask/LoggedTask';

const Log: React.FC = () => {
  const { tasks } = useContext(TasksStateContext);

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
