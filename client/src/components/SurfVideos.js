import React, { Component } from 'react';
import '../styles/surfVideos.css';

class SurfVideos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      query: "surf team",
      items: []
    };
  }

  API_KEY = "AIzaSyD1cHSIGEpQiTyYr-cuYiWu4cbV7YXIz24";

  componentDidMount() {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&part=snippet,id&type=video&q=${this.state.query}&maxResults=50`)
      .then(res => res.json())
      .then(result => {
          this.setState({ 
            isLoaded: true, 
            items: result.items 
          });
        }, error => {
          this.setState({ 
            isLoaded: true,
            error 
          });
        });
  }

  render() {

    this.videoList = this.state.items.map((video, index) => (
      <li className="videoCard" key={index}>
        <h3 className="videoTitle">{video.snippet.title}</h3>
        <img
          src={video.snippet.thumbnails.medium.url}
          width={video.snippet.thumbnails.medium.width}
          height={video.snippet.thumbnails.medium.height}
          alt={video.snippet.title}
        />
        <p className="description">{video.snippet.description}</p>
      </li>
    ));

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="title">Welcome to Surf Videos!</h1>
          <h3 className="slogan">Hang ten, hombre</h3>
        </header>
        <ul className="videoList">
          {this.videoList}
        </ul>
      </div>
    );
  }
}

export default SurfVideos;