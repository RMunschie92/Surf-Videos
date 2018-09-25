import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

class Home extends Component {
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
        <Link to={{ pathname: `/theater/${video.id.videoId}`, state: { currentVideo: video }}}>Watch</Link>
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

    return(
      <div className="Home">
        <header className="header">
          <h1 className="title">Welcome to Surf Videos!</h1>
          <h3 className="slogan">Hang ten, hombre</h3>
        </header>
        <ul className="videoList">{this.videoList}</ul>
      </div>
    ) 
  }
}

export default Home;