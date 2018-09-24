import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Theater extends Component {
  render() {
    return (
      <div>
        <Link to="/">Go Home</Link>
        <h1>Welcome to SurfVideos Theater</h1>
      </div>
    );
  }
}

export default Theater;