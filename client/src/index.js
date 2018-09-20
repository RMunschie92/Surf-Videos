import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import SurfVideos from './components/SurfVideos';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <SurfVideos />
  , document.getElementById('root')
);
registerServiceWorker();
