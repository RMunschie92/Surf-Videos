import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../styles/surfVideos.css';
import Home from '../components/Home';
import Theater from '../components/Theater';

class SurfVideos extends Component {
  render() {
    return (
      <div className="SurfVideos">
        <header className="header">
          <h1 className="title">Welcome to Surf Videos!</h1>
          <h3 className="slogan">Hang ten, hombre</h3>
        </header>
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/theater/:id" render={(props) => <Theater {...props} currentVideo='' />} />
        </main>
      </div>
    );
  }
}

export default SurfVideos;