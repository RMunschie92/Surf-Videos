import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/theater.css';
import timeago from "timeago.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

class Theater extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      video: "",
      videoTitle: "",
      videoPublishedAt: "",
      comments: []
    };

    this.handleBackClick = this.handleBackClick.bind(this);

    if (this.props.location.state) {
      this.videoId = this.props.location.state.currentVideo.id.videoId;
    } else {
      this.videoId = this.props.history.location.pathname.slice(9);
      console.log(this.videoId);
    }
  }

  API_KEY = "AIzaSyD1cHSIGEpQiTyYr-cuYiWu4cbV7YXIz24";

  fetchVideo() {
    fetch(`https://www.googleapis.com/youtube/v3/videos?key=${this.API_KEY}&id=${this.videoId}&part=player,snippet&type=video`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            video: result.items[0].snippet,
            videoTitle: result.items[0].snippet.title,
            videoPublishedAt: result.items[0].snippet.publishedAt
          });
        },
        error => {
          this.setState({ isLoaded: true, error });
        }
      );
  }

  fetchComments() {
    fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${this.API_KEY}&textFormat=plainText&part=snippet&videoId=${this.videoId}&maxResults=25`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            comments: result.items
          });
        },
        error => {
          this.setState({ isLoaded: true, error });
        }
      );
  }

  componentDidMount() {
    this.fetchVideo();
    this.fetchComments();
  }

  handleBackClick() {
    window.history.back();
  }

  render() {
    let url = `//www.youtube.com/embed/${this.videoId}`;
    let timeagoInstance = timeago();

    function formatCommentTime(timeStamp) {
      timeStamp = timeStamp.slice(0, 10);
      timeStamp = timeagoInstance.format(timeStamp);
      return timeStamp;
    }

    this.commentList = this.state.comments.map((comment, index) => (
      <li className="comment" key={index}>
        <img
          className="profilePicture"
          src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
          alt={`${comment.snippet.topLevelComment.snippet.authorDisplayName}'s profile`}
        />
        <div className="commentMain">
          <div className="nameAndTimeAgo">
            <p className="name">{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
            <p className="timeAgo">{formatCommentTime(comment.snippet.topLevelComment.snippet.publishedAt)}</p>
          </div>
          <p className="commentText">{comment.snippet.topLevelComment.snippet.textDisplay}</p>
        </div>
      </li>
    ));

    function formatVideoTime(timeStamp) {
      if (timeStamp !== '') {
        timeStamp = timeStamp.slice(0, 10);
      }
      return timeStamp;
    }

    return (
      <div className="Theater">
        <header className="theaterHeader">
          <Link className="logoLink" to="/">
            Surf Videos
          </Link>
        </header>
        <Link className="homeLink" to="/">
          <FontAwesomeIcon icon={faChevronLeft} /> Back to the Beach
        </Link>
        <div className="playerContainer">
          <iframe title={this.state.videoTitle} src={url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen />
        </div>
        <div className="videoInfo">
          <h3 className="videoTitle">{this.state.videoTitle}</h3>
          <p className="videoChannel">{this.state.video.channelTitle}</p>
          <p className="videoDate">Published on {formatVideoTime(this.state.videoPublishedAt)}</p>
          <p className="videoDescription">{this.state.video.description}</p>
        </div>
        <ul className="commentList">{this.commentList}</ul>
      </div>
    );
  }
}

export default Theater;