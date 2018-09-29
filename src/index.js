import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import SurfVideos from './containers/SurfVideos';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <SurfVideos />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();