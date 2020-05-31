import React, { useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import LoggedTask from '../LoggedTask/LoggedTask';
import { TasksContext } from '../../context/TasksContext';

interface Props {}

const TimerList: React.FC<Props> = props => {
  const {
    state: { tasks },
  } = useContext(TasksContext);
  return (
    <Droppable droppableId="TimerList" isCombineEnabled={true}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {tasks.map((task, index) => (
            <Draggable key={task.id} index={index} draggableId={task.id}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                  <LoggedTask
                    task={task}
                    archived={false}
                    dragHandleProps={provided.dragHandleProps}
                  />
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TimerList;
