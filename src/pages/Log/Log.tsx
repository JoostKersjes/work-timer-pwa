import React, { useContext } from 'react';
import { TasksContext } from '../../context/TasksContext';
import LoggedTask from '../../components/LoggedTask/LoggedTask';

const Log: React.FC = () => {
  const {
    state: { archive },
  } = useContext(TasksContext);

  return (
    <div>
      {archive.map(task => (
        <LoggedTask key={task.id} task={task} archived={true} />
      ))}
    </div>
  );
};

export default Log;
