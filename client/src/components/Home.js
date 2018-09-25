import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      query: '',
      items: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  API_KEY = "AIzaSyD1cHSIGEpQiTyYr-cuYiWu4cbV7YXIz24";

  fetchData() {
    let q;
    this.state.query === "" ? (q = "Surf") : (q = "Surf ".concat(this.state.query));
    console.log("q: ", q);
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&part=snippet,id&type=video&q=${q}&maxResults=50`)
      .then(res => res.json())
      .then(result => {
          this.setState({ isLoaded: true, items: result.items });
        }, error => {
          this.setState({ isLoaded: true, error });
        });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleChange(e) {
    this.setState({ query: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.fetchData();
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

    return (
      <div className="Home">
        <header className="header">
          <h1 className="title">Welcome to Surf Videos!</h1>
          <h3 className="slogan">Hang ten, hombre</h3>
        </header>
        <form onSubmit={this.handleSubmit}>
          <label>Surf's up, Search up!</label>
          <input type="text" placeholder="Surf ..." value={this.state.query} onChange={this.handleChange}/>
          <button>Search</button>
        </form>
        <ul className="videoList">{this.videoList}</ul>
      </div>
    ) 
  }
}

export default Home;