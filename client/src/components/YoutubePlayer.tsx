import React, { useCallback } from "react";
import YouTube from "react-youtube";

interface YouTubePlayerProps {
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onReady = useCallback((event: any) => {
    event.target.playVideo();
  }, []);

  const opts = {
    height: "390",
    width: "640",
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onReady} />;
};

export default YouTubePlayer;
