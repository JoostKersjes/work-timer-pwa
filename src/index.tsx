import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Providers from './context/Providers';

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <Router>
        <App />
      </Router>
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
);

// https://bit.ly/CRA-PWA
serviceWorker.register();
