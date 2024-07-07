/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import './videoPlayer.scss';

const VideoPlayer = ({ src }) => {
  return (
    <div className="video-player-wrapper">
      <video className="video-player-consultant" width={'10%'} controls>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
