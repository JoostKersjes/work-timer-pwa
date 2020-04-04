import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Log = lazy(() => import("./Log"));
const Timer = lazy(() => import("./Timer"));

const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <nav>
        <ul>
          <li>
            <Link to="/">Timer</Link>
          </li>
          <li>
            <Link to="/log">Log</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <Timer />
        </Route>
        <Route path="/log">
          <Log />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
