import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Log from "./Log";
import Timer from "./Timer";

const App: React.FC = () => (
  <Router>
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
  </Router>
);

export default App;
