import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/theater.css';

class Theater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      videoTitle: "",
      videoHtml: []
    };

    this.handleBackClick = this.handleBackClick.bind(this);
  }

  API_KEY = "AIzaSyD1cHSIGEpQiTyYr-cuYiWu4cbV7YXIz24";

  videoId = this.props.location.state.currentVideo.id.videoId;

  componentDidMount() {
    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${this.videoId}&key=${this.API_KEY}&part=player,snippet&type=video`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            videoTitle: result.items[0].snippet.title
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  handleBackClick() {
    window.history.back();
  }

  render() {
    
    let url = `//www.youtube.com/embed/${this.videoId}`; 

    return (
      <div className="Theater">
        <header className="theaterHeader">
          <Link className="logoLink" to="/">Surf Videos</Link>
        </header>
        <Link className="homeLink" to="/">Go Home</Link>
        <p onClick={this.handleBackClick}>Back to List</p>
        <div className="playerContainer">
          <iframe title={this.state.videoTitle} width="720" height="480" src={url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
        </div>
      </div>
    )
  }
}

export default Theater;