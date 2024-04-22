import React from "react";

export default function GetTime({ sentTime }) {
  const getTimeElapsed = (timestamp) => {
    const currentTimestamp = Date.now();
    const postTimestamp = new Date(timestamp).getTime();
    const difference = currentTimestamp - postTimestamp;
    const seconds = Math.floor(difference / 1000);
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  return <>{`Posted ${getTimeElapsed(sentTime)}`}</>;
}
