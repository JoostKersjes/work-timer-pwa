import React, { lazy, Suspense, useCallback, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TasksContext } from '../context/TasksContext';

const Log = lazy(() => import('../pages/Log/Log'));
const Timer = lazy(() => import('../pages/Timer/Timer'));

const App: React.FC = () => {
  const { dispatch } = useContext(TasksContext);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (result.combine) {
        dispatch({
          type: 'Combine',
          payload: {
            sourceTaskId: result.draggableId,
            targetTaskId: result.combine.draggableId,
          },
        });

        return;
      }

      if (undefined === result.destination?.index) {
        return;
      }

      dispatch({
        type: 'ChangeOrder',
        payload: {
          taskId: result.draggableId,
          newIndex: result.destination.index,
        },
      });
    },
    [dispatch],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Navigation>
        <Suspense fallback={<></>}>
          <Switch>
            <Route exact path="/">
              <Timer />
            </Route>
            <Route path="/log">
              <Log />
            </Route>
          </Switch>
        </Suspense>
      </Navigation>
    </DragDropContext>
  );
};

export default App;
