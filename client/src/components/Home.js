import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPeace, faVideo, faSearch, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import getGreeting from '../slogans';

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
              nextCode: result.nextPageToken,
              greeting: getGreeting()
            }) :
            this.setState({
              isLoaded: true,
              items: result.items,
              nextCode: result.nextPageToken,
              greeting: getGreeting()
            });
            console.log(result);
        }, error => {
          this.setState({ isLoaded: true, error });
        })
      .then(getGreeting())
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
          result.hasOwnProperty("prevPageToken") ? 
              this.setState({
                isLoaded: true,
                items: result.items,
                previousCode: result.prevPageToken,
                nextCode: result.nextPageToken,
                greeting: getGreeting()
              }) : this.setState({
                isLoaded: true,
                items: result.items,
                nextCode: result.nextPageToken,
                greeting: getGreeting()
              });
          console.log(result);
        }, error => {
          this.setState({ isLoaded: true, error });
        })
      .then(window.scrollTo(0, 0));
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

    let greeting = getGreeting();

    this.videoList = this.state.items.map((video, index) => (
      <li className="videoCard" key={index}>
        <Link 
          className="cardLink"
          to={{ pathname: `/theater/${video.id.videoId}`, state: { currentVideo: video } }}>
          <span className="watchSpan">Watch</span>
          <FontAwesomeIcon icon={faVideo} />
        </Link>
        <h3 className="cardTitle">{video.snippet.title}</h3>
        <img
          className="thumbnail"
          src={video.snippet.thumbnails.medium.url}
          width={video.snippet.thumbnails.medium.width}
          height={video.snippet.thumbnails.medium.height}
          alt={video.snippet.title}
        />
        <p className="cardDescription">{video.snippet.description}</p>
      </li>
    ));

    return (
      <div className="Home">
        <header className="header">
          <h1 className="welcome">Welcome to</h1>
          <h1 className="title">Surf Videos</h1>
          <h3 className="slogan">{this.state.greeting} <span><FontAwesomeIcon icon={faHandPeace}/></span></h3>
        </header>
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <label>Search!</label>
          <div className="formMain">
            <input type="text" placeholder="Surf ..." value={this.state.query} onChange={this.handleChange} />
            <button><FontAwesomeIcon icon={faSearch} /></button>
          </div>
        </form>
        <ul className="videoList">{this.videoList}</ul>
        <footer>
          <p className={this.state.pageNumber > 1 ? 'show' : 'hide'} onClick={this.handlePreviousClick}><span> <FontAwesomeIcon icon={faChevronLeft} /> </span>Prev</p>
          <h3 className="pageNumber">{this.state.pageNumber}</h3>
          <p className="show" onClick={this.handleNextClick}>Next<span> <FontAwesomeIcon icon={faChevronRight} /></span></p>
        </footer>
      </div>
    ) 
  }
}

export default Home;