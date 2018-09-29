import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css';
import SurfVideos from './containers/SurfVideos';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <SurfVideos />
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
