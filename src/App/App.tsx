import React, { lazy, Suspense } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Tabs from 'antd/es/tabs';

const Log = lazy(() => import('../pages/Log/Log'));
const Timer = lazy(() => import('../pages/Timer/Timer'));

const App: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Tabs
        size="large"
        activeKey={history.location.pathname}
        onChange={key => history.replace(key)}
      >
        <Tabs.TabPane tab="Timer" key="/" />
        <Tabs.TabPane tab="Log" key="/log" />
      </Tabs>

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
    </>
  );
};

export default App;
