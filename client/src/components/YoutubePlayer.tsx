import React from "react";
import ReactPlayer from "react-player";
import { YouTubePlayerProps } from "../types";

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  return <ReactPlayer url={videoId} width="100%" playing />;
};

export default YouTubePlayer;
