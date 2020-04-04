import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';

const Log = lazy(() => import('../pages/Log/Log'));
const Timer = lazy(() => import('../pages/Timer/Timer'));

const App: React.FC = () => (
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
);

export default App;
