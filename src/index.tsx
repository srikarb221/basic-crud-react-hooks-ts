import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { AppStateProvider } from './store/appStateProvider';
import App from './components/app';


ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <Router>
        <App />
      </Router>
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

