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
      items: [],
      pageNumber: 1,
      currentPageCode: '',
      previousCode: '',
      nextCode: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  API_KEY = "AIzaSyD1cHSIGEpQiTyYr-cuYiWu4cbV7YXIz24";

  fetchData() {
    let q;
    this.state.query === "" ? 
      q = "Surf" : 
      q = "Surf ".concat(this.state.query);
    let url = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&part=snippet,id&order=viewCount&maxResults=10&type=video&q=${q}`; 
    console.log("q: ", q);
    fetch(url)
      .then(res => res.json())
      .then(result => {
          result.hasOwnProperty('prevPageToken') ?
            this.setState({
              isLoaded: true,
              items: result.items,
              previousCode: result.prevPageToken,
              nextCode: result.nextPageToken
            }) :
            this.setState({
              isLoaded: true,
              items: result.items,
              nextCode: result.nextPageToken
            });
            console.log(result);
        }, error => {
          this.setState({ isLoaded: true, error });
        })
      .then(window.scrollTo(0,0));
  }

  fetchPage(direction) {
    let q = "Surf ".concat(this.state.query);
    let tokenCode;
    direction === 'previous' ? tokenCode = this.state.previousCode : tokenCode = this.state.nextCode;
    let url = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&part=snippet,id&order=viewCount&pageToken=${tokenCode}&maxResults=10&type=video&q=${q}`
    fetch(url)
      .then(res => res.json())
      .then(result => {
        result.hasOwnProperty('prevPageToken') ?
          this.setState({
            isLoaded: true,
            items: result.items,
            previousCode: result.prevPageToken,
            nextCode: result.nextPageToken
          }) :
          this.setState({
            isLoaded: true,
            items: result.items,
            nextCode: result.nextPageToken
          })
          console.log(result);
      }, error => {
        this.setState({ isLoaded: true, error });
      })
      .then(window.scrollTo(0,0));
  }

  componentDidMount() {
    this.fetchData();
  }

  handleChange(e) {
    this.setState({ query: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ pageNumber: 1 });
    this.fetchData();
  }

  handlePreviousClick() {
    let currentPage = this.state.pageNumber;
    this.setState({
      pageNumber: currentPage - 1,
      currentPageCode: this.state.previousCode
    });
    this.fetchPage('previous');
  }

  handleNextClick() {
    let currentPage = this.state.pageNumber;
    this.setState({ 
      pageNumber: currentPage + 1,
      currentPageCode: this.state.nextCode
    });
    this.fetchPage('next');
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
        <footer>
          <p className={this.state.pageNumber > 1 ? 'show' : 'hide'} onClick={this.handlePreviousClick}>Previous Page</p>
          <h3>{this.state.pageNumber}</h3>
          <p onClick={this.handleNextClick}>Next Page</p>
        </footer>
      </div>
    ) 
  }
}

export default Home;