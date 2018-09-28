import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../styles/home.css';
import Home from '../components/Home';
import Theater from '../components/Theater';

class SurfVideos extends Component {
  render() {
    return (
      <div className="SurfVideos">
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/theater/:id" render={(props) => <Theater {...props} currentVideo='' />} />
        </main>
      </div>
    );
  }
}

export default SurfVideos;